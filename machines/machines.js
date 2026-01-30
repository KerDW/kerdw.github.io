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
    ,
    {
        "name": "faculty",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "boolean-based blind SQLi",
            "mpdf path traversal",
            "meta-git CVE RCE",
            "gdb cap_sys_ptrace+ep cap abuse"
        ],
        "folder": "faculty"
    }
    ,
    {
        "name": "formulax",
        "platform": "htb",
        "difficulty": "hard",
        "techniques": [
            "XSS socket.io data exfiltration",
            "simple-git RCE CVE",
            "LibreNMS Stored XSS RCE",
            "libreoffice UNO server RCE"
        ],
        "folder": "formulax"
    }
    ,
    {
        "name": "headless",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "XSS",
            "Command Injection",
            "Relative Path Abuse"
        ],
        "folder": "headless"
    }
    ,
    {
        "name": "updown",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "exposed .git",
            "ZIP+PHAR+LFI RCE",
            "SUID+python library hijack PYTHONPATH",
            "easy_install gtfobin"
        ],
        "folder": "updown"
    }
    ,
    {
        "name": "vessel",
        "platform": "htb",
        "difficulty": "hard",
        "techniques": [
            "exposed .git",
            "mysqljs sqli login bypass",
            "OWA 1.7.3 CVE RCE",
            "python .exe extract+decompile",
            "password generation reverse engineering",
            "CRI-O CVE privesc"
        ],
        "folder": "vessel"
    }
,
    {
        "name": "imagery",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "XSS",
            "LFI",
            "Charcol cron"
        ],
        "folder": "imagery"
    }
,
    {
        "name": "bagel",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "path traversal",
            "ws service unsafe .NET TypeNameHandling serialization file read"
        ],
        "folder": "bagel"
    }
,
    {
        "name": "linkvortex",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "git dumper",
            "ghost cms arbitrary file read cve",
            "sudo env var abuse"
        ],
        "folder": "linkvortex"
    }
,
    {
        "name": "metatwo",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "WP bookingpress plugin SQLi CVE",
            "WP XXE CVE",
            "passpie GPG key cracking"
        ],
        "folder": "metatwo"
    }
,
    {
        "name": "monitored",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "snmp 161 credentials leakage",
            "nagiosxi SQLi CVE",
            "nagiosxi admin RCE",
            "nagiosxi script abuse privesc"
        ],
        "folder": "monitored"
    }
,
    {
        "name": "monitors",
        "platform": "htb",
        "difficulty": "hard",
        "techniques": [
            "wordpress plugin RFI",
            "cacti SQLi RCE exploit",
            "Apache OFBiz deserialization RCE",
            "CAP_SYS_MODULE container breakout"
        ],
        "folder": "monitors"
    }
,
    {
        "name": "monitorstwo",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "cacti RCE CVE",
            "password cracking",
            "capsh SUID",
            "docker bad permissions abuse"
        ],
        "folder": "monitorstwo"
    }
,
    {
        "name": "monitorsthree",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "boolean-based sqli",
            "cacti authenticated RCE exploit",
            "duplicati auth bypass"
        ],
        "folder": "monitorsthree"
    }
,
    {
        "name": "yummy",
        "platform": "htb",
        "difficulty": "hard",
        "techniques": [
            "directory traversal",
            "sqli file write",
            "mercurial hook abuse",
            "rsync privesc"
        ],
        "folder": "yummy"
    }
,
    {
        "name": "runner",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "teamcity admin user creation & RCE",
            "portainer privesc"
        ],
        "folder": "runner"
    }
,
    {
        "name": "gofer",
        "platform": "htb",
        "difficulty": "hard",
        "techniques": [
            "SMB share access",
            "Gopher + SMTP + ODT macro phishing revshell",
            "tcpdump cap_net_admin abuse",
            "binary exploitation",
            "SUID binary PATH hijack"
        ],
        "folder": "gofer"
    }
,
    {
        "name": "shared",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "cookie-induced SQLi",
            "ipython CVE RCE",
            "redis binary password exfiltration",
            "redis admin file write abuse CVE privesc"
        ],
        "folder": "shared"
    }
,
    {
        "name": "planning",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "grafana"
        ],
        "folder": "planning"
    }
,
    {
        "name": "expressway",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "UDP"
        ],
        "folder": "expressway"
    }
,
    {
        "name": "gavel",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "bruteforce credentials",
            "php.ini restrictions bypass"
        ],
        "folder": "gavel"
    }
,
    {
        "name": "boardlight",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "dolibarr",
            "enlightenment"
        ],
        "folder": "boardlight"
    }
,
    {
        "name": "clicker",
        "platform": "htb",
        "difficulty": "medium",
        "techniques": [
            "rpc nfs",
            "LF (%0a) mass assignment injection",
            "ghidra binary analysis",
            "env abuse",
            "XXE"
        ],
        "folder": "clicker"
    }
,
    {
        "name": "devvortex",
        "platform": "htb",
        "difficulty": "easy",
        "techniques": [
            "joomla"
        ],
        "folder": "devvortex"
    }
];
