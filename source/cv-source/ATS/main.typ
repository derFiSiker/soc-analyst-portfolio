#import "@preview/basic-resume:0.2.9": *

#let name = "Marco Lütkemüller"
#let location = "Duisburg, NRW"
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
  accent-color: "#4c6a15",
  font: "Liberation Sans",
  paper: "a4",
  author-position: left,
  personal-info-position: left,
)

== Profil
Fachinformatiker für Systemintegration mit praktischer Erfahrung in Netzwerk-, Firewall- und VPN-Betrieb, Windows- und Active-Directory-Administration sowie VMware-Virtualisierung. Aufbauend auf dieser Infrastruktur-Basis entwickle ich nachweisbare Security-Operations-Kompetenzen in SIEM, Log-Analyse, Detection Engineering und Incident-Response-Workflows.

== Technische Kompetenzen
- *Security Operations:* Wazuh SIEM, Log-Analyse, Detection Engineering, Triage, Windows Event Logs, Incident-Response-Workflows
- *Netzwerke & Security:* TCP/IP, Routing/Switching, VLAN-Segmentierung, Subnetting, DNS, DHCP, NAT, Firewall-Regeln, IPsec SSL-VPN, Paket-Analyse
- *Microsoft & Virtualisierung:* Windows Server, Active Directory, Gruppenrichtlinien (GPO), Rechte- und Rollenkonzepte, Microsoft 365, Entra ID, VMware Workstation Pro
- *Homelab & Automation:* Kali Linux, Metasploitable 2/3, Vulnerability Scanning, PowerShell, technische Dokumentation

== Berufserfahrung
#work(
  title: "Netzwerk- & Systemadministrator / IT-Spezialist",
  location: "Moers",
  company: "SOXSIS GmbH / IT-Dienstleister",
  dates: "2024 — 2025",
)
- Konfiguration und Überwachung von Enterprise-Routern, Switches, Firewalls und VPN-Verbindungen zur Sicherstellung von Verfügbarkeit und Datensicherheit
- Administration von Active Directory, Gruppenrichtlinien und virtualisierten Serverlandschaften mit VMware
- Umsetzung rollenbasierter Zugriffsmodelle sowie 1st-/2nd-Level-Support und technische Systemdokumentation

#work(
  title: "Elektroniker / IT-Infrastruktur-Experte",
  location: "Mülheim an der Ruhr",
  company: "Menerga GmbH / Klimatechnik",
  dates: "2018 — 2023",
)
- Aufbau strukturierter Netzwerkverkabelung (Kupfer/LWL), Bestückung und Pflege technischer Netzwerkdokumentation
- Installation, Wartung und Prüfung von USV-Systemen sowie Hardware- und Fehlerdiagnose in Rechenzentren und Büroinfrastrukturen

== Ausgewählte Security-Projekte
#project(name: "SIEM-Implementierung · SOC Homelab", role: "Wazuh, VMware, Windows 10/11, Kali Linux")
- Aufbau einer virtualisierten Lernumgebung für zentrale Telemetrie, kontrollierte Use Cases und strukturierte Triage-Dokumentation

#project(name: "Active Directory Lateral Movement Detection", role: "Wazuh, Windows Event Logs, Active Directory")
- Korrelation der Event-IDs 4624, 4688 und 4769 zur Einordnung auffälliger Anmeldungen, Prozessstarts und Kerberos-TGS-Anfragen

== Ausbildung & Weiterbildung
#edu(institution: "cadata Bildungs GmbH", location: "Duisburg", dates: "2023 — 2026", degree: "Umschulung zum Fachinformatiker für Systemintegration")
- IHK-Abschlussprüfung erfolgreich bestanden (01/2026)

#edu(institution: "IHK", location: "Kaltzey", dates: "2000 — 2003", degree: "Ausbildung zum Elektroinstallateur")
- IHK-Abschlussprüfung (06/2003)

- *TryHackMe Pre-SOC und SOC101:* abgeschlossene Grundlagen- und SOC-Trainings
- *CompTIA Network+:* in Vorbereitung — Netzwerkanalyse, Protokollhierarchien und Troubleshooting
