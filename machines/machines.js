// Machine data for writeups
const MACHINES_DATA = [
    {
        "name": "editor",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "RCE",
            "Local Port Forwarding",
            "SUID Privilege Escalation",
            "Exploitation of CVEs"
        ],
        "folder": "editor"
    },
    {
        "name": "pollution",
        "platform": "htb",
        "difficulty": "hard",
        "techniques": [
            "Blind XXE",
            "Redis Cookie Forgery",
            "LFI PHP Filters RCE",
            "PHP-FPM FastCGI RCE",
            "Node.js Prototype Pollution RCE"
        ],
        "folder": "pollution"
    }
    ,
    {
        "name": "meta",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "exiftool command injection CVE",
            "ImageMagick XXE CVE",
            "sudo env_keep abuse + gtfobins"
        ],
        "folder": "meta"
    }
    ,
    {
        "name": "epsilon",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            ".git credentials+code exposure",
            "aws lambda credentials exposure",
            "JWT forging",
            "filtered SSTI",
            "script tar symlink abuse"
        ],
        "folder": "epsilon"
    }
    ,
    {
        "name": "broker",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "ActiveMQ",
            "sudo nginx"
        ],
        "folder": "broker"
    }
    ,
    {
        "name": "eureka",
        "platform": "htb",
        "difficulty": "hard",
        "techniques": [
            "spring boot heapdump analysis",
            "netflix-eureka SSRF",
            "Shell arithmetic abuse"
        ],
        "folder": "eureka"
    }
    ,
    {
        "name": "instant",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "apktool",
            "LFI",
            "SolarPuTTY decrypt"
        ],
        "folder": "instant"
    }
,
    {
        "name": "environment",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "laravel environment swap cve",
            "unisharp image upload RCE",
            "gpg decrypt",
            "privileged envs abuse"
        ],
        "folder": "environment"
    }
,
    {
        "name": "codify",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "node editor limitation bypass",
            "insecure bash comparison abuse"
        ],
        "folder": "codify"
    }
,
    {
        "name": "guardian",
        "platform": "htb",
        "difficulty": "hard",
        "techniques": [
            "php wrappers",
            "XSS",
            "CSRF",
            "apachectl"
        ],
        "folder": "guardian"
    }
,
    {
        "name": "broscience",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "path traversal",
            "custom activation code cracking",
            "PHP deserialization attack RCE",
            "openssl command injection expansion abuse"
        ],
        "folder": "broscience"
    }
,
    {
        "name": "investigation",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "exiftool CVE RCE",
            ".msg_.eml file extraction",
            "MS Event Log file analysis credential leak",
            "binary analysis & sudo privilege abuse"
        ],
        "folder": "investigation"
    }
,
    {
        "name": "previous",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "next.js",
            "LFI",
            "terraform"
        ],
        "folder": "previous"
    }
];
