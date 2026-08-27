#import "@preview/basic-resume:0.2.9": *

#let name = "Marco Lütkemüller"
#let location = "Duisburg · NRW · Ruhrgebiet"
#let email = "derfisiker@proton.me"
#let github = "github.com/derFiSiker"
#let linkedin = "linkedin.com/in/marco-lütkemüller-53b0063ab"
#let personal-site = "derfisiker.de"

#show: resume.with(
  author: name,
  location: location,
  email: email,
  github: github,
  linkedin: linkedin,
  personal-site: personal-site,
  accent-color: "#71931d",
  font: "Noto Sans",
  paper: "a4",
  author-position: left,
  personal-info-position: left,
)

== Aspiring SOC Analyst · Systems Integration Specialist
Ich verbinde Systemintegration mit Security Operations: aus Netzwerk-, Identity- und Endpoint-Telemetrie entstehen nachvollziehbare Detection-Use-Cases, strukturierte Triage und dokumentierbare Erkenntnisse. Grundlage sind praktische Erfahrung in Netzwerkadministration, Windows/Active Directory, VMware und Security-Labs.

== Signal Trace · Kompetenzfelder
- *Detection & Telemetrie:* Wazuh SIEM, Log-Analyse, Windows Event Logs, Detection Engineering, Triage und Incident-Response-Workflows
- *Infrastruktur & Netzwerk:* TCP/IP, Routing/Switching, VLAN, Subnetting, DNS, DHCP, NAT, Firewalls, IPsec SSL-VPN und Paket-Analyse
- *Identity & Plattform:* Active Directory, GPO, Rechte- und Rollenkonzepte, Windows Server, Microsoft 365, Entra ID und VMware Workstation Pro
- *Lab & Dokumentation:* Kali Linux, Metasploitable 2/3, Vulnerability Scanning, PowerShell und technische Systemdokumentation

== Ausgewählte Case Studies
#project(name: "SIEM-Implementierung · SOC Homelab", role: "Wazuh · VMware · Kali Linux · Windows 10/11")
- Virtualisierte Lernplattform für zentrale Telemetrie, kontrollierte Use Cases und wiederholbare Detection- sowie Triage-Abläufe

#project(name: "Active Directory Lateral Movement Detection", role: "Wazuh · Active Directory · Windows Event IDs 4624 / 4688 / 4769")
- Korrelation von Authentifizierungs-, Prozess- und Kerberos-Telemetrie zur Einordnung lateraler Bewegung in einer kontrollierten AD-Umgebung

#project(name: "Detection Use Cases", role: "Network Discovery · Brute Force · PowerShell · Ransomware Behavior")
- Dokumentierte Übungsfälle für beobachtbares Angreiferverhalten, Alert-Kontext, Baseline und strukturierte Incident-Response-Notizen

== Berufliche Erfahrung
#work(title: "Netzwerk- & Systemadministrator / IT-Spezialist", location: "Moers", company: "SOXSIS GmbH / IT-Dienstleister", dates: "2024 — 2025")
- Betrieb und Überwachung von Routern, Switches, Firewalls und VPN-Verbindungen sowie Administration von Active Directory, GPO und VMware-Serverlandschaften
- Rollenbasierte Zugriffsmodelle, technische Systemdokumentation sowie 1st-/2nd-Level-Support

#work(title: "Elektroniker / IT-Infrastruktur-Experte", location: "Mülheim an der Ruhr", company: "Menerga GmbH / Klimatechnik", dates: "2018 — 2023")
- Strukturierte Netzwerkverkabelung (Kupfer/LWL), technische Dokumentation, USV-Prüfungen sowie Hardware- und Fehlerdiagnose

== Ausbildung & Learning Journey
#edu(institution: "cadata Bildungs GmbH", location: "Duisburg", dates: "2023 — 2026", degree: "Fachinformatiker für Systemintegration")
- IHK-Abschlussprüfung erfolgreich bestanden (01/2026); TryHackMe Pre-SOC und SOC101 abgeschlossen

#edu(institution: "IHK", location: "Kaltzey", dates: "2000 — 2003", degree: "Elektroinstallateur")
- IHK-Abschlussprüfung (06/2003)

- *Nächster Schritt:* CompTIA Network+ in Vorbereitung — Netzwerkanalyse, Protokollhierarchien und Troubleshooting
