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
        "name": "browsed",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "Chrome Addon Data Exfiltration",
            "Arithmetic Expansion RCE",
            "PyCache Poisoning",
            "SUID Privilege Escalation"
        ],
        "folder": "browsed",
        "status": "active"
    },
    {
        "name": "agile",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "LFI",
            "Werkzeug PIN Exploit",
            "Selenium Hijacking",
            "Sudoedit CVE-2023-22809"
        ],
        "folder": "agile"
    },
    {
        "name": "ambassador",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "Grafana CVE-2021-43798",
            "Git History Leak",
            "Consul RCE"
        ],
        "folder": "ambassador"
    },
    {
        "name": "amor",
        "platform": "dockerlabs",
        "difficulty": "easy",
        "techniques": [
            "SSH Brute Force",
            "Steganography",
            "Ruby Sudo Exploitation"
        ],
        "folder": "amor"
    },
    {
        "name": "artificial",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "TensorFlow H5 RCE",
            "SQLite Credential Leak",
            "Backrest RCE"
        ],
        "folder": "artificial"
    },
    {
        "name": "backend",
        "platform": "dockerlabs",
        "difficulty": "easy",
        "techniques": [
            "Blind SQLi",
            "SQLMap",
            "SUID Grep",
            "MD5 Crack"
        ],
        "folder": "backend"
    }
,
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
];
