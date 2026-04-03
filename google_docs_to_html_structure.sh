#!/bin/bash

# Ensure Pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "Error: pandoc is not installed."
    exit 1
fi

SOURCE_DIR="$(pwd)/docs"
OUTPUT_DIR="$(pwd)/converted_writeups"

mkdir -p "$OUTPUT_DIR"

echo "Starting conversion..."

# Process each docx file
find "$SOURCE_DIR" -maxdepth 1 -name "*.docx" -print0 | while IFS= read -r -d '' file; do
    
    filename=$(basename "$file")
    folder_name="${filename%.*}"
    
    echo "Processing: $folder_name"

    # 1. Create the specific folder for this writeup
    target_dir="$OUTPUT_DIR/$folder_name"
    mkdir -p "$target_dir"
    
    # 2. Enter that folder
    cd "$target_dir" || continue

    # 3. Run Pandoc
    # --extract-media=. tells Pandoc to create a folder named 'media' right here.
    # Because we are inside the folder, Pandoc writes the HTML src as "media/image.png"
    pandoc "$file" -s --extract-media=. -t html -o "index.html"

    # 4. Optional: Responsive image styling (keeps images from overflowing the page)
    sed -i 's/<img /<img style="max-width:100%;height:auto;" /g' "index.html"

    # 5. Return to the root to process the next file
    cd - > /dev/null
done

echo "------------------------------------------------"
echo "Done! Structure is now stable and links should work."