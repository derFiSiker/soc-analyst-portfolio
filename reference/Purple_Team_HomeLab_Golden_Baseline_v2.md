# Purple Team Home Lab – Golden Baseline

> **Dokumentationsstand:** 10.09.2026  
> **Status:** Konsolidierter technischer Stand vor dem Neuaufbau der WLAN-/RADIUS-Umgebung

## Dokumentationszweck

Diese Dokumentation beschreibt den aktuell bestätigten Aufbau des persönlichen Purple-Team-Home-Labs. Sie dient als:

1. technische Referenz für den späteren Wiederaufbau,
2. reproduzierbare Dokumentation für technisch versierte Dritte,
3. Grundlage für spätere öffentliche Darstellungen auf Website, GitHub und LinkedIn.

Die Dokumentation beschreibt nicht nur, **was** installiert wurde, sondern stellt – soweit die vorhandenen Informationen dies zulassen – den Zusammenhang zwischen **Technik → Angriff → Telemetrie → Detection → Analyse → Bewertung → Erkenntnis** her.

---

# 01 · Zielbild und Architektur

Das Labor ist eine isolierte Security-Laborumgebung für Purple-Team-Szenarien. Die ursprüngliche Konzeption orientierte sich an *The Ultimate Kali Linux Hacking Book* von Glen D. Singh. Die heutige Umgebung ist daraus weiterentwickelt worden; historische Netzwerksegmente und alte Adressierungen sind deshalb nicht automatisch Bestandteil des aktuellen Zustands.

Die Umgebung verbindet eine Active-Directory-Zielumgebung, einen Linux-Multifunktionsserver, eine Kali-Angriffsplattform und eine zentrale Wazuh-Monitoringumgebung. Die spätere WLAN-/RADIUS-Umgebung wird separat neu aufgebaut und anschließend in die Baseline integriert.

## Aktueller Kernbestand

| Komponente | Aktueller Stand |
|---|---|
| Domain | `redteamlab.local` |
| RedTeamLab-Netz | `192.168.42.0/24` |
| DC01 | `192.168.42.40` |
| Wazuh | `192.168.42.20` |
| Bob-PC | `192.168.42.30` |
| Alice-PC | `192.168.42.31` |
| Kali | `192.168.42.100` |
| Server1 | `192.168.42.213` |

Die aktuelle Infrastruktur wurde gegenüber der historischen Dokumentation bewusst verändert. Die dort beschriebenen Netze `172.30.1.0/24` und `10.11.12.0/24` sowie die dort beschriebenen DHCP-Server werden **nicht** als aktueller Baseline-Zustand übernommen.

---

# 02 · VMware-Netzwerk und physische Verbindung

## 2.1 Aktuell bestätigte Konfiguration

Die Verbindung zwischen der Kali-VM auf dem Laptop und der Active-Directory-Umgebung auf dem Desktop erfolgt aktuell über **VMware VMnet0 im Bridged-Modus**.

Damit ergibt sich für den zentralen Kommunikationspfad:

```text
Laptop
└── VMware Workstation Pro
    └── Kali Linux
        └── VMnet0 (Bridged)
             │
             │ physisches LAN / Switch
             │
Desktop
└── VMware Workstation
    ├── DC01
    ├── Alice-PC
    └── Bob-PC
```

Die ältere Markdown-Dokumentation bestätigt ebenfalls die Nutzung von VMnet0/Bridged für die physisch gekoppelte Dual-Host-Architektur. Die dort enthaltenen alten IP-Adressen und zusätzlichen Subnetze sind jedoch historisch. fileciteturn1file4

## 2.2 Dokumentationsregel

Vor dem Golden-Baseline-Snapshot werden für jede VM die tatsächlichen virtuellen Netzwerkadapter geprüft. Dabei werden insbesondere festgehalten:

- verwendetes VMnet,
- Adapteranzahl,
- Bridged/NAT/Host-only/Custom-Zuordnung,
- MAC-Adresse,
- unbeabsichtigte zusätzliche Netzwerkpfade,
- Snapshot-Zustand.

Es wird nicht aus der historischen Dokumentation abgeleitet, dass heute noch die alten `PenTestNet`- und `HiddenNet`-Segmente vorhanden sind.

---

# 03 · Domain Controller und Active Directory

## 3.1 System

**Hostname:** `dc01.redteamlab.local`  
**IP:** `192.168.42.40`  
**Rolle:** Windows Server / Domain Controller / Active Directory / DNS

Die ältere Dokumentation beschreibt die ursprüngliche Einrichtung eines Windows Server 2019 Domain Controllers einschließlich AD DS und DNS. Die heutige Domäne wurde anschließend auf `redteamlab.local` angepasst. fileciteturn1file3

## 3.2 AD DS

```powershell
Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools
```

**Erklärung:** Installiert die Active-Directory-Domänendienste einschließlich der Verwaltungskomponenten.

```powershell
$SafePassword = ConvertTo-SecureString "<DSRM-PASSWORD>" -AsPlainText -Force
Install-ADDSForest `
  -DomainName "redteamlab.local" `
  -DomainNetbiosName "<NETBIOS-NAME>" `
  -SafeModeAdministratorPassword $SafePassword `
  -InstallDns:$true `
  -Force:$true
```

**Erklärung:** Erstellt die Active-Directory-Gesamtstruktur für `redteamlab.local` und installiert DNS. Das tatsächliche DSRM-Passwort wird aus Sicherheitsgründen nicht in der Dokumentation gespeichert.

## 3.3 Benutzer- und OU-Struktur

Die historische Dokumentation bestätigt eine eigene Benutzer-OU sowie mindestens die Testbenutzer Alice und Bob. fileciteturn1file3

```powershell
New-ADOrganizationalUnit -Name "<USER-OU>" -Path "DC=redteamlab,DC=local"
```

**Erklärung:** Legt eine getrennte organisatorische Einheit für die Lab-Benutzer an.

```powershell
New-ADUser -Name "<USER-NAME>" `
  -SamAccountName "<USERNAME>" `
  -UserPrincipalName "<USERNAME>@redteamlab.local" `
  -Path "OU=<USER-OU>,DC=redteamlab,DC=local" `
  -AccountPassword (Read-Host -AsSecureString "Passwort") `
  -Enabled $true
```

**Erklärung:** Legt einen aktivierten Testbenutzer innerhalb der Benutzer-OU an. Konkrete Kennwörter werden nicht in dieser Dokumentation gespeichert.

### Zugangsdaten

Alle tatsächlichen Login-Daten werden ausschließlich als Platzhalter dokumentiert, z. B.:

- `<DOMAIN-ADMIN-USER>`
- `<DOMAIN-ADMIN-PASSWORD>`
- `<TEST-USER-PASSWORD>`
- `<WAZUH-ADMIN-PASSWORD>`
- `<SERVER-ADMIN-PASSWORD>`

Die im historischen Dokument enthaltenen Klartext-Passwörter werden nicht übernommen. fileciteturn2file0

## 3.4 AD-Prüfung

```powershell
Get-ADDomain
Get-ADForest
Get-DnsServerZone
dcdiag
```

**Erklärung:** Prüft Domäne, Gesamtstruktur, DNS-Zonen und die grundlegende Funktionsfähigkeit des Domain Controllers.

---

# 04 · Windows Clients

## 4.1 Alice-PC

**IP:** `192.168.42.31`  
**Rolle:** Windows Client / Domänenmitglied

## 4.2 Bob-PC

**IP:** `192.168.42.30`  
**Rolle:** Windows Client / Domänenmitglied

Die historische Dokumentation beschreibt beide Clients als Windows-10-Systeme und bestätigt ihren Beitritt zur Active-Directory-Umgebung. Die damaligen Adressen und die alte Domäne `lab.local` werden nicht übernommen. fileciteturn1file0

## 4.3 Domänenbeitritt

```powershell
Add-Computer -DomainName "redteamlab.local" -Credential (Get-Credential) -Restart
```

**Erklärung:** Fügt den jeweiligen Client der aktuellen Domäne hinzu. Die Zugangsdaten werden interaktiv eingegeben.

## 4.4 Validierung

```powershell
(Get-CimInstance Win32_ComputerSystem).Domain
nltest /dsgetdc:redteamlab.local
nslookup dc01.redteamlab.local
gpresult /r
```

**Erklärung:** Prüft Domänenzugehörigkeit, DC-Ermittlung, DNS-Auflösung und angewendete Gruppenrichtlinien.

---

# 05 · Debian 13 Multifunktionsserver

## 5.1 System

**Hostname:** `server1.redteamlab.local`  
**IP:** `192.168.42.213`  
**Betriebssystem:** Debian 13  
**Rolle:** Multifunktionsserver / Shared File Storage / mehrere bewusst exponierte Dienste

Der Server erweitert die Angriffsfläche des Labs und erzeugt gleichzeitig zusätzliche Linux-Telemetrie. Die bereitgestellten Dienste werden deshalb als Teil der Golden Baseline dokumentiert.

## 5.2 Dienste

| Dienst | Port | Zweck |
|---|---|---|
| OpenSSH | 22/tcp | Remote Administration |
| BIND9 | 53/tcp + udp | DNS Forward/Reverse |
| Postfix | 25/tcp | Mail |
| ProFTPD | 21/tcp | FTP |
| Apache 2.4 | 80/tcp | Web |
| ntpsec | 123/udp | Zeitdienst |
| Samba | 445/tcp | SMB / Shared File Storage |
| SNMPd | 161/udp | Monitoring |

## 5.3 OpenSSH

```bash
sudo apt install openssh-server -y
sudo systemctl status ssh
```

**Erklärung:** Installiert den SSH-Server und überprüft anschließend seinen Dienststatus.

## 5.4 BIND9

```bash
sudo apt install bind9 bind9utils -y
```

**Erklärung:** Installiert den DNS-Server und die zugehörigen Werkzeuge.

Die aktuelle Konfiguration enthält eine Forward-Zone `redteamlab.local` und eine Reverse-Zone für `192.168.42.0/24`.

```bash
sudo named-checkconf
sudo named-checkzone redteamlab.local /etc/bind/db.redteamlab.local
sudo named-checkzone 42.168.192.in-addr.arpa /etc/bind/db.192.168.42
sudo systemctl restart named
```

**Erklärung:** Prüft Syntax und Zonendateien und startet BIND9 nach erfolgreicher Prüfung neu.

```bash
nslookup server1.redteamlab.local 192.168.42.213
nslookup 192.168.42.213 192.168.42.213
```

**Erklärung:** Prüft Forward- und Reverse-Auflösung des Servers.

> **Architekturhinweis:** Die aktuelle Server-Dokumentation beschreibt Server1 als BIND9-Server für `redteamlab.local`, während DC01 ebenfalls die DNS-Rolle besitzt. Die genaue Rollenverteilung bzw. Weiterleitung wird vor der endgültigen Freigabe als Konsistenzpunkt geprüft und nicht stillschweigend verändert.

## 5.5 Postfix

```bash
sudo apt install postfix -y
postconf mailname
sudo systemctl status postfix
```

**Erklärung:** Installiert den Maildienst, prüft den konfigurierten Mailnamen und kontrolliert den Dienststatus.

## 5.6 ProFTPD

```bash
sudo apt install proftpd -y
```

**Erklärung:** Installiert den FTP-Server. Der Dienst wird im Labor als kontrollierte zusätzliche Angriffsfläche verwendet.

Konfiguration:

```text
ServerName server1.redteamlab.local
DefaultRoot ~
```

**Erklärung:** Setzt den Servernamen und begrenzt Benutzer auf ihr Home-Verzeichnis.

## 5.7 Apache

```bash
sudo apt install apache2 -y
```

**Erklärung:** Installiert den Webserver für lokale Webtests.

Bei Verwendung des dokumentierten Virtual Hosts:

```bash
sudo a2dissite 000-default.conf
sudo a2ensite server1.conf
sudo apache2ctl configtest
sudo systemctl restart apache2
```

**Erklärung:** Aktiviert den Server1-Virtual-Host, prüft die Apache-Konfiguration und lädt Apache neu.

## 5.8 ntpsec

```bash
sudo apt remove openntpd -y
sudo apt install ntpsec -y
sudo systemctl status ntpsec
ntpq -p
```

**Erklärung:** Stellt den Zeitdienst auf ntpsec um und prüft Dienst sowie bekannte Zeitquellen.

## 5.9 Samba / Shared File Storage

```bash
sudo apt install samba smbclient -y
```

**Erklärung:** Installiert Samba und die Client-Werkzeuge für SMB-Tests.

```bash
sudo mkdir -p /projekte
sudo groupadd projekte
sudo chown root:projekte /projekte
sudo chmod 775 /projekte
```

**Erklärung:** Erstellt die gemeinsame Projektfreigabe und ordnet sie einer eigenen Unix-Gruppe zu.

Konfigurationsprinzip:

```ini
[global]
    workgroup = REDTEAMLAB
    server string = Samba %v
    unix password sync = yes
    passwd program = /usr/bin/passwd %u
    security = user
    map to guest = Bad User

[PROJEKTE]
    path = /projekte
    read only = no
    valid users = @projekte
    create mask = 0664
    directory mask = 0775
```

**Erklärung:** Die Freigabe `PROJEKTE` stellt den Shared-File-Bereich bereit. Der Zugriff wird über die Gruppe `projekte` gesteuert.

```bash
sudo smbpasswd -a <USERNAME>
sudo testparm -s
sudo systemctl restart smbd
sudo systemctl status smbd
```

**Erklärung:** Richtet einen Samba-Zugang für den jeweiligen Testbenutzer ein, prüft die Konfiguration und kontrolliert anschließend den SMB-Dienst.

## 5.10 SNMPd

Die dokumentierte SNMP-Konfiguration umfasst einen Read-only-Community-Zugang für das Lab-Netz und zusätzlich einen Read-write-Zugang.

```text
agentAddress udp:161
rocommunity <RO-COMMUNITY> 192.168.42.0/24
rwcommunity <RW-COMMUNITY> 192.168.42.0/24
```

**Erklärung:** Stellt SNMP für Monitoringtests bereit. Der RW-Zugang ist eine bewusst vorhandene Labor-Angriffsfläche und ausdrücklich keine Produktions-Empfehlung.

```bash
sudo systemctl restart snmpd
ss -ulnp | grep 161
```

**Erklärung:** Lädt die Konfiguration neu und prüft, ob SNMP auf UDP/161 lauscht.

---

# 06 · Kali Linux Attack Platform

## 6.1 System

**IP:** `192.168.42.100`  
**Rolle:** Security Testing / Angriffsplattform

Kali dient als zentrale Plattform für Reconnaissance, Security Testing und spätere kontrollierte Angriffsszenarien.

## 6.2 PimpMyKali

Die historische Projektdokumentation bestätigt die Installation des PimpMyKali-Skripts. fileciteturn1file0

**Status:** installiert.

Konkrete Versionsstände oder nachträgliche Anpassungen werden nicht erfunden, sofern sie nicht in den Projektunterlagen bestätigt sind.

## 6.3 WebSploit

Nach aktueller Projektbestätigung ist zusätzlich die **WebSploit-Erweiterung von Omar Santos** auf der Kali-VM installiert.

**Status:** installiert.

Da die vorliegende historische Markdown-Datei die konkrete Installationsprozedur von WebSploit nicht enthält, wird hier bewusst keine erfundene Schrittfolge dokumentiert. Die tatsächliche Installation ist als bestehender Zustand festgehalten.

## 6.4 Docker / OWASP Juice Shop

Die historische Dokumentation beschreibt die Containerisierung des OWASP Juice Shop. fileciteturn1file0

```bash
sudo docker run --rm -p 3000:3000 bkimminich/juice-shop:latest
```

**Erklärung:** Startet den Juice Shop als temporären Docker-Container und veröffentlicht ihn lokal auf Port 3000.

```text
Firefox → http://127.0.0.1:3000
```

**Erklärung:** Öffnet die lokal gestartete Webanwendung im Browser. Der Juice Shop dient als kontrolliertes Ziel für Web-Security-Tests.

---

# 07 · Wazuh, Sysmon und Telemetrie

## 7.1 Wazuh

**IP:** `192.168.42.20`  
**Rolle:** zentrale Monitoring-/SIEM-Plattform

Die ältere Dokumentation enthält außerdem einen VMware-spezifischen Hinweis für die Ubuntu-Server-VM:

```text
mks.enableVulkanPresentation=FALSE
```

**Erklärung:** Der Eintrag wurde in der historischen Umgebung benötigt, damit die Ubuntu-VM unter VMware Workstation korrekt startet. Er wird als historisch dokumentierter VM-Workaround behandelt und nicht als allgemeine Wazuh-Anforderung dargestellt. fileciteturn1file1

## 7.2 Sysmon

Sysmon wird auf den Windows-Systemen eingesetzt, um zusätzliche Prozess-, Netzwerk- und Systemtelemetrie bereitzustellen. Die Daten bilden zusammen mit Windows Event Logs eine Grundlage für spätere Detection Use Cases.

## 7.3 Wazuh Agents

Dokumentiert werden ausschließlich tatsächlich eingerichtete Agents. Die Baseline behauptet daher nicht automatisch, dass Server1 oder Kali über einen Wazuh Agent verfügen.

Windows-Prüfung:

```powershell
Get-Service WazuhSvc
```

**Erklärung:** Prüft, ob der Wazuh-Agent-Dienst auf einem Windows-System vorhanden ist und welchen Zustand er besitzt.

Linux-Prüfung, sofern ein Agent tatsächlich installiert ist:

```bash
systemctl status wazuh-agent
```

**Erklärung:** Prüft den Dienststatus des Linux-Wazuh-Agents.

## 7.4 Funktionstest

Vor dem Snapshot wird ein harmloses Testereignis erzeugt, beispielsweise über eine konfigurierte FIM-Änderung oder einen definierten Login-/Logout-Test.

**Prüfkette:**

```text
Endpunkt
  ↓
Sysmon / Windows Event Log bzw. Linux-Log
  ↓
Wazuh Agent
  ↓
Wazuh Manager
  ↓
Indexer
  ↓
Dashboard
```

**Erklärung:** Damit wird die gesamte Telemetrie-Kette geprüft und nicht lediglich die Installation eines Dienstes.

---

# 08 · Telemetrie- und Detection-Baseline

Die Golden Baseline bildet den Referenzzustand für spätere Purple-Team-Fälle.

| Quelle | Beispiel | Zweck |
|---|---|---|
| Windows Event Logs | Anmeldung / Systemereignisse | Grundlegende Windows-Telemetrie |
| Sysmon | Prozess-/Netzwerkereignisse | Verhaltensanalyse |
| Wazuh Agent | Agent Events | zentrale Sammlung |
| Server1 | Dienst-/Systemlogs | Linux-Telemetrie |
| Nmap | offene Dienste | Exposure-Baseline |

Der spätere Use Case soll nicht bei einem Alert beginnen und dort enden. Ziel ist eine nachvollziehbare Kette von Angriff über Telemetrie und Detection bis zur Analyse und Bewertung.

---

# 09 · WLAN / LANCOM / RADIUS – späterer Ausbau

Dieser Bereich wird **noch nicht als fertiger Bestandteil der aktuellen Golden Baseline freigegeben**.

## Geplanter Aufbau

- LANCOM Router
- LANCOM LW500 Access Point
- eigene RADIUS-VM
- RADIUS-Authentifizierung
- Einbindung des LANCOM Routers
- Einbindung des LANCOM AP
- Enterprise-WLAN / 802.1X, soweit für den tatsächlichen Aufbau vorgesehen
- Authentifizierungstests
- Fehlerszenarien
- Telemetrie und Monitoring

Die historische Datei enthält einen früheren Ubuntu-RADIUS-Server sowie frühere LANCOM-Adressen und Zugangsdaten. Diese Werte werden **nicht** als aktuelle Konfiguration übernommen. fileciteturn2file0

Der RADIUS-Server wird nach dem aktuellen Stand neu aufgebaut. Anschließend wird die WLAN-Umgebung geprüft und als Erweiterung in diese Golden Baseline aufgenommen.

---

# 10 · Vollständiges Golden-Baseline-Prüfprotokoll

> **Das Prüfprotokoll steht bewusst am Ende.** Es prüft den zuvor dokumentierten Gesamtzustand und dient als Release Gate für den Snapshot.

## 10.1 VMware

- [ ] Alle VMs vorhanden und erwartungsgemäß benannt
- [ ] VMnet-Zuordnung geprüft
- [ ] VMnet0 = Bridged für den bestätigten Kommunikationspfad
- [ ] Keine unbeabsichtigten zusätzlichen Adapter
- [ ] MAC-Adressen dokumentiert
- [ ] Snapshot-/Rollback-Zustand geprüft

## 10.2 VM-Status

- [ ] DC01 läuft
- [ ] Alice-PC läuft
- [ ] Bob-PC läuft
- [ ] Server1 läuft
- [ ] Wazuh läuft
- [ ] Kali läuft

## 10.3 Netzwerk

### Windows

```powershell
ipconfig /all
Get-NetIPConfiguration
```

**Erklärung:** Prüft IP-Adresse, Subnetz, DNS, Gateway und aktive Schnittstellen.

### Linux

```bash
ip addr
ip route
resolvectl status
hostnamectl
```

**Erklärung:** Prüft Adressen, Routing, DNS-Auflösung und Systemidentität.

### Erwartete Kernadressen

- [ ] DC01 `192.168.42.40`
- [ ] Wazuh `192.168.42.20`
- [ ] Bob-PC `192.168.42.30`
- [ ] Alice-PC `192.168.42.31`
- [ ] Kali `192.168.42.100`
- [ ] Server1 `192.168.42.213`

## 10.4 Connectivity

Von Kali aus:

```bash
ping 192.168.42.40
ping 192.168.42.213
ping 192.168.42.20
ping 192.168.42.30
ping 192.168.42.31
```

**Erklärung:** Prüft die grundlegende Erreichbarkeit. Falls ICMP bewusst blockiert wird, muss stattdessen die Erreichbarkeit eines tatsächlich angebotenen Dienstes geprüft werden.

## 10.5 DNS

```text
nslookup dc01.redteamlab.local
nslookup server1.redteamlab.local
```

**Erklärung:** Prüft die Forward-Auflösung wichtiger Lab-Systeme.

```bash
dig -x 192.168.42.40
dig -x 192.168.42.213
```

**Erklärung:** Prüft die Reverse-DNS-Auflösung.

## 10.6 Active Directory

```powershell
Get-ADDomain
Get-ADForest
Get-DnsServerZone
dcdiag
Get-SmbShare
```

**Erklärung:** Prüft AD-Domäne, Forest, DNS, Domain-Controller-Funktion und relevante Freigaben.

## 10.7 Clients

```powershell
(Get-CimInstance Win32_ComputerSystem).Domain
nltest /dsgetdc:redteamlab.local
nslookup dc01.redteamlab.local
gpresult /r
```

**Erklärung:** Prüft Domänenmitgliedschaft, DC-Ermittlung, DNS und Gruppenrichtlinien.

## 10.8 Server1

```bash
systemctl --type=service --state=running
```

**Erklärung:** Zeigt aktuell laufende Dienste und dient als erster Abgleich mit der erwarteten Serverrolle.

```bash
sudo systemctl status ssh bind9 postfix proftpd apache2 ntpsec smbd nmbd snmpd
```

**Erklärung:** Prüft die für Server1 dokumentierten Dienste gezielt.

```bash
ss -tulpen
```

**Erklärung:** Zeigt offene TCP-/UDP-Listener. Die tatsächliche Ausgabe wird gegen die dokumentierte Exposure-Baseline abgeglichen.

## 10.9 Diensttests

### HTTP

```bash
curl -I http://192.168.42.213
```

**Erklärung:** Prüft, ob der Apache-Webserver erreichbar ist.

### SMB

```bash
smbclient -L 192.168.42.213 -U <USERNAME>
```

**Erklärung:** Prüft die Erreichbarkeit und Sichtbarkeit der Samba-Freigaben mit einem Testkonto.

### SSH

```bash
ssh <TEST-USER>@192.168.42.213
```

**Erklärung:** Prüft die Remote-Anmeldung am Server1 mit einem dafür vorgesehenen Testkonto.

### FTP

```bash
ftp 192.168.42.213
```

**Erklärung:** Prüft die Erreichbarkeit des FTP-Dienstes.

## 10.10 Wazuh

```bash
systemctl status wazuh-manager
systemctl status wazuh-indexer
systemctl status wazuh-dashboard
```

**Erklärung:** Prüft die zentralen Wazuh-Komponenten, sofern sie in der aktuellen Installation vorhanden sind.

Im Dashboard werden mindestens kontrolliert:

- [ ] Agent-Anzahl
- [ ] Agent-Status
- [ ] letzter Keepalive
- [ ] Events
- [ ] Alerts
- [ ] Inventory
- [ ] FIM
- [ ] Rules / Decoders, soweit verwendet

## 10.11 Zeit / Synchronisation

Linux:

```bash
timedatectl
```

**Erklärung:** Prüft Zeitzone, Systemzeit und Synchronisationsstatus.

Windows:

```powershell
w32tm /query /status
```

**Erklärung:** Prüft Zeitquelle und Synchronisationszustand des Windows-Systems.

## 10.12 Netzwerk-Exposure-Baseline

```bash
nmap -sV 192.168.42.0/24 -oN baseline-nmap.txt
```

**Erklärung:** Erstellt einen reproduzierbaren Ausgangsstand der im RedTeamLab-Netz erkannten Hosts und Dienste. Unerwartete Ports werden vor dem Snapshot untersucht und dokumentiert.

## 10.13 Release Gate

| Bereich | Status |
|---|---|
| VMware / Netzwerk | PASS / FAIL |
| VM-Status | PASS / FAIL |
| Active Directory | PASS / FAIL |
| Windows Clients | PASS / FAIL |
| Server1 / Dienste | PASS / FAIL |
| Kali | PASS / FAIL |
| Wazuh / Telemetrie | PASS / FAIL |
| DNS / Zeit | PASS / FAIL |
| Nmap-Baseline | PASS / FAIL |

### Snapshot-Freigabe

**Nur bei vollständig bestandenem Release Gate:**

```text
BASELINE_2026-09-XX
```

Der Snapshot stellt anschließend einen **verifizierten Referenzzustand** dar.

Der spätere Purple-Team-Workflow lautet:

```text
Golden Baseline
      ↓
Snapshot
      ↓
Angriffsszenario
      ↓
Telemetrie
      ↓
Detection
      ↓
Analyse
      ↓
Bewertung / Eskalation
      ↓
Lessons Learned
      ↓
Verbesserung
      ↓
Rollback / nächster Use Case
```

---
# Anhang A · Offene Punkte vor endgültiger Baseline-Freigabe

1. tatsächliche aktuelle VMware-Adapter/MACs je VM dokumentieren,
2. genaue aktuelle AD-Benutzer-/Gruppen-/OU-Struktur gegen die reale Umgebung prüfen,
3. DNS-Rollenverteilung zwischen DC01 und Server1 verifizieren,
4. tatsächliche Wazuh-Agent-Abdeckung prüfen,
5. konkrete WebSploit-Installationsdetails nur ergänzen, wenn sie noch belegbar sind,
6. WLAN-/LANCOM-/RADIUS-Umgebung neu aufbauen,
7. WLAN-/RADIUS-Prüfung anschließend in das Prüfprotokoll integrieren,
8. finalen Baseline-Snapshot erst nach bestandenem Gesamtprüfprotokoll erstellen.
