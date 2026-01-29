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
];
