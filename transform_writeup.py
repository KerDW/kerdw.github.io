#!/usr/bin/env python3
"""
Generic script to transform any writeup using Claude API
"""
import argparse
import os
import re
import shutil
from anthropic import Anthropic

# Configuration - EDIT THESE VARIABLES FOR YOUR WRITEUP
SOURCE_HTML = "converted_writeups/eureka - htb hard (spring boot heapdump analysis, netflix-eureka SSRF, Shell arithmetic abuse)/index.html"
REFERENCE_HTML = "machines/broker/index.html"


def extract_machine_info(source_path):
    """
    Extract machine information from the source path.
    Expected format: "converted_writeups/name - platform difficulty (techniques)/index.html"
    Returns: dict with name, platform, difficulty, techniques
    """
    # Get the directory name
    dir_name = os.path.basename(os.path.dirname(source_path))
    
    # Try to parse the directory name
    # Format: "name - platform difficulty (techniques)"
    match = re.match(r'(.+?)\s*-\s*(\w+)\s+(\w+)\s*\((.+)\)', dir_name)
    
    if match:
        name = match.group(1).strip()
        platform = match.group(2).strip().upper()
        difficulty = match.group(3).strip()
        techniques = match.group(4).strip()
        
        return {
            'name': name,
            'platform': platform,
            'difficulty': difficulty,
            'techniques': techniques
        }
    else:
        # Fallback: try to extract at least the name
        print(f"⚠ Could not fully parse machine info from path: {dir_name}")
        return {
            'name': dir_name,
            'platform': 'Unknown',
            'difficulty': 'Unknown',
            'techniques': 'Various techniques'
        }


def get_transformation_prompt(machine_info):
    """Generate transformation prompt with machine-specific information"""
    return f"""I have a HackTheBox machine writeup in basic HTML format along with its images, which I want to convert into a properly formatted, professional, and easy-to-read writeup.

MACHINE INFORMATION:
- Platform: {machine_info['platform']}
- Name: {machine_info['name']}
- Difficulty: {machine_info['difficulty']}
- Main Techniques: {machine_info['techniques']}

CRITICAL REQUIREMENTS:

1. **Images**: 
   - ALL images are located in the "media/" directory (NOT "images/"). Use paths like "./media/imageX.png".
   - Include EVERY single image from the original writeup - do not skip any.
   - DO NOT invent or reference images that don't exist in the source HTML.
   - Place each image in the appropriate context within the writeup where it makes sense.
   - Add descriptive alt text for each image explaining what it shows.
   - Images should flow naturally with the text - place them near the relevant explanation.
   - Count the images in the source HTML and use EXACTLY that many images, no more, no less.

2. **Language & Style**:
   - Spanish version: Use CASTELLANO DE ESPAÑA (European Spanish), NOT Latin American Spanish. Use "vosotros" forms, Spain-specific vocabulary.
   - English version: Clear, professional technical English.
   - Default language: Spanish (Castellano)
   - Default theme: Light mode

3. **Code Snippets**:
   - MUST have syntax highlighting with colors appropriate to each programming language. For snippets add letter coloring in any case (not background coloring), just for reading clarity sake.
   - MUST show the language name in the TOP-LEFT corner of each code block
   - Code blocks MUST NOT have horizontal scroll - use word wrap or multi-line display if needed
   - Support all and any programming/markup languages used
   - Use inline `<code>` tags to highlight: commands, file paths, variable names, function names, and any technical terms or pseudocode in paragraphs (like in the reference example)

4. **Content Enhancement**:
   - Interpret and expand the writeup slightly. My original writing is very concise and to-the-point; add a bit more context and explanation where needed.
   - Reorganize content for better flow - if something is mentioned early but only becomes relevant later, move it or add forward references.
   - DO NOT over-explain or write essays. Keep it technical and practical, just add clarity.
   - DO NOT omit content, only enhance it if needed, but never omit content from the original writeup.
   - Maintain the hacking/technical tone.

5. **Exploitation Summary**:
   - Write a NARRATIVE summary (like telling a story), NOT a bullet-point list
   - Explain the attack chain in a flowing, connected way
   - Should be engaging to read, not just a dry list of steps
   - Do not make it too long or detailed, it is a summary so it has to cover everything in a summarized way

6. **Formatting**:
   - Remove ALL timestamps from command outputs
   - Remove any user/root flag contents
   - Keep ALL original links intact
   - Maintain light/dark mode toggle functionality
   - Maintain Spanish/English language toggle

7. **Reference Structure**:
   - Use the provided reference HTML as a template for structure, styling, and functionality
   - Match the professional look and feel

8. **Educational Content Policy**:
   - This is educational/CTF content. DO NOT censor or redact hacking techniques, exploit code, webshells, reverse shells, or similar technical content.
   - These writeups are for learning cybersecurity - all content must be preserved for educational value.
   - If you must indicate something is sensitive, at minimum explain WHAT is being done (e.g., "reverse shell payload" rather than "[redacted]" or outright removing it)
   - The writeup must make technical sense and be useful for learning.

OUTPUT FORMAT:
Return ONLY valid, complete HTML code. No markdown code blocks, no explanations, no preamble, no mitigation steps, no final section with images - just the raw HTML that can be directly saved as index.html.

IMPORTANT: Do NOT mention these instructions or requirements in your response. Do NOT say things like "Here's the HTML as requested" or "I've followed the instructions". Simply return the HTML code and nothing else. Comply silently with all requirements."""


def read_file(filepath):
    """Read file content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()


def write_file(filepath, content):
    """Write content to file"""
    # Create directory if it doesn't exist
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)


def transform_writeup(api_key):
    """Transform the writeup using Claude API"""
    # Initialize Anthropic client with provided API key
    client = Anthropic(api_key=api_key)
    
    # Extract machine information
    print("Extracting machine information...")
    machine_info = extract_machine_info(SOURCE_HTML)
    print(f"  Name: {machine_info['name']}")
    print(f"  Platform: {machine_info['platform']}")
    print(f"  Difficulty: {machine_info['difficulty']}")
    print(f"  Techniques: {machine_info['techniques']}")

    # Setup directories and move media
    machine_name = machine_info['name']
    target_dir = os.path.join("machines", machine_name)
    # Update OUTPUT_HTML to be inside the new directory
    # This shadows the global variable for use within this function
    OUTPUT_HTML = os.path.join(target_dir, "index.html")
    
    print(f"\nSetting up directory: {target_dir}")
    os.makedirs(target_dir, exist_ok=True)
    
    # Create empty index.html
    if not os.path.exists(OUTPUT_HTML):
        open(OUTPUT_HTML, 'w').close()
        print(f"Created empty {OUTPUT_HTML}")
        
    # Move media content
    source_dir = os.path.dirname(SOURCE_HTML)
    source_media = os.path.join(source_dir, "media")
    target_media = os.path.join(target_dir, "media")
    
    if os.path.exists(source_media):
        if not os.path.exists(target_media):
            print(f"Moving media from {source_media} to {target_media}")
            try:
                shutil.move(source_media, target_media)
                print("✓ Media folder moved successfully")
            except Exception as e:
                print(f"⚠ Error moving media folder: {e}")
        else:
            print(f"Target media directory {target_media} already exists, skipping move.")
    else:
        print(f"⚠ Source media directory {source_media} not found.")
    
    print("\nReading source HTML...")
    source_content = read_file(SOURCE_HTML)
    
    print("Reading reference HTML...")
    reference_content = read_file(REFERENCE_HTML)
    
    print("Calling Claude API...")
    
    # Get the transformation prompt with machine-specific info
    transformation_prompt = get_transformation_prompt(machine_info)
    
    # Prepare the full prompt with both reference and source
    full_prompt = f"""{transformation_prompt}

REFERENCE HTML STRUCTURE (use this as a template):
```html
{reference_content}
```

SOURCE HTML TO TRANSFORM:
```html
{source_content}
```

Remember: Return ONLY the transformed HTML, nothing else."""
    
    # System message for Claude
    system_message = "You are an expert HTML developer specializing in creating beautiful, accessible blog-style writeups for cybersecurity content."
    
    try:
        response = client.messages.create(
            model="claude-sonnet-4-5-20250929",
            max_tokens=32000,
            stream=True,
            system=system_message,
            messages=[
                {
                    "role": "user",
                    "content": full_prompt
                }
            ]
        )
        
        html_output = ""
        for event in response:
            if event.type == "content_block_delta":
                html_output += event.delta.text
        
        # Clean up if the response includes markdown code blocks
        if html_output.startswith("```html"):
            html_output = html_output.split("```html")[1]
            html_output = html_output.rsplit("```", 1)[0]
        elif html_output.startswith("```"):
            html_output = html_output.split("```")[1]
            html_output = html_output.rsplit("```", 1)[0]
        
        html_output = html_output.strip()
        
        print(f"\nWriting output to {OUTPUT_HTML}...")
        write_file(OUTPUT_HTML, html_output)
        
        print("✓ Transformation complete!")
        print(f"Output written to: {OUTPUT_HTML}")
        
        # Update machines.js with the new machine entry
        update_machines_js(machine_info, OUTPUT_HTML)
        
    except Exception as e:
        print(f"Error during transformation: {e}")
        raise


def update_machines_js(machine_info, output_html):
    """Add the machine to machines.js"""
    machines_js_path = "machines/machines.js"
    
    print("\nUpdating machines.js...")
    
    # Check if machines.js exists
    if not os.path.exists(machines_js_path):
        print(f"⚠ {machines_js_path} not found, skipping...")
        return
    
    # Read current machines.js
    with open(machines_js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract folder name from output path
    folder_name = os.path.basename(os.path.dirname(output_html))
    
    # Check if machine already exists
    if f'"name": "{machine_info["name"]}"' in content or f'"folder": "{folder_name}"' in content:
        print(f"⚠ {machine_info['name']} already exists in machines.js, skipping...")
        return
    
    # Parse techniques into array
    techniques_list = [t.strip() for t in machine_info['techniques'].split(',')]
    techniques_json = ',\n            '.join([f'"{t}"' for t in techniques_list])
    
    # Platform mapping
    platform_map = {
        'HTB': 'htb',
        'HACKTHEBOX': 'htb',
        'THM': 'thm',
        'TRYHACKME': 'thm'
    }
    platform = platform_map.get(machine_info['platform'].upper(), machine_info['platform'].lower())
    
    # New machine entry
    new_entry = f'''    {{
        "name": "{machine_info['name']}",
        "platform": "{platform}",
        "difficulty": "{machine_info['difficulty'].lower()}",
        "techniques": [
            {techniques_json}
        ],
        "folder": "{folder_name}"
    }}'''
    
    # Find the closing of the array and insert before it
    insert_pos = content.rfind('];')
    if insert_pos == -1:
        print("⚠ Could not find array closing in machines.js")
        return
    
    # Check if we need a comma before the new entry
    before_insert = content[:insert_pos].rstrip()
    if before_insert.endswith('}'):
        new_entry = ',\n' + new_entry
    
    # Insert the new entry
    updated_content = content[:insert_pos] + new_entry + '\n' + content[insert_pos:]
    
    # Write back
    with open(machines_js_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    
    print("✓ machines.js updated successfully!")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Transform writeup using Claude API. Edit SOURCE_HTML variable at the top of this file.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Usage:
  1. Edit SOURCE_HTML variable at the top of this file
  2. Run: python transform_writeup.py YOUR_API_KEY
  
The script will automatically:
  - Extract machine info from the source path
  - Setup the output directory and empty index.html
  - Move the media folder
  - Transform the HTML using Claude API
  - Update machines.js with the new machine
  
Example:
  python transform_writeup.py sk-ant-...
        """
    )
    parser.add_argument(
        "api_key",
        help="Anthropic API key"
    )
    
    args = parser.parse_args()
    
    transform_writeup(api_key=args.api_key)
