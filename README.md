# Room 00 · SIEM Foundation

> **Purple-Team-Home-Lab-Leitfaden für `redteamlab.local`**  
> Dokumentationsstand: 10. September 2026  
> Scope: ausschließlich eigenes, isoliertes VMware-Labor

Dieser Leitfaden übernimmt die Informationsstruktur aus `Purple_Team_HomeLab_Golden_Baseline_v2.md` und übersetzt sie in einen **praktisch ausführbaren, modularen Room-00-Ablauf**. Er beginnt bei der sicheren Vorbereitung und endet bei einem reproduzierbaren Release Gate mit Evidenz, Lessons Learned und einem Snapshot.

Der Leitfaden behauptet nicht, dass die gesamte Golden Baseline bereits fertig ist. Er trennt konsequent zwischen **aktuell bestätigt**, **für Room 00 erforderlich**, **später geplant** und **noch zu verifizieren**. Dadurch bleibt die Dokumentation technisch belastbar.

## Ergebnisdefinition

Room 00 ist abgeschlossen, wenn `WAZUH-01` als zentrale SIEM-Instanz läuft, die für Room 00 vorgesehenen Windows-Agents aktiv sind, RedTeamLab-Netz und DNS nachvollziehbar funktionieren, ein Baseline-Snapshot existiert und jede relevante Beobachtung in einer kurzen Zeitlinie dokumentiert wurde.

| Abschlusskriterium | Muss erfüllt sein |
|---|---|
| WAZUH-01 | Dashboard erreichbar; Manager, Indexer und Dashboard aktiv |
| Netzwerk | RedTeamLab `192.168.42.0/24`; kein unbeabsichtigter NAT- oder Bridged-Pfad während der Übung |
| DC-01 | `192.168.42.40/24`; Wazuh-Agent `Active` |
| ALICE-01 | IP und Agentenstatus geprüft; Agent `Active`, bevor der Room als vollständig markiert wird |
| Baseline | Snapshots und Zeitpunkt dokumentiert |
| Evidenz | Topologie, Agentenstatus, Baseline und mindestens eine harmlose Telemetrieprüfung gesichert |
| Dokumentation | Scope, Zeitlinie, Ergebnis, Grenzen und Lessons Learned ausgefüllt |

## Sicherheitsrahmen

Das Labor ist für defensive Purple-Team-Lernziele bestimmt. Es werden nur eigene VMs verwendet. Es gibt keine Scans oder Anmeldeversuche gegen fremde Systeme, keine echten Zugangsdaten, keine Produktivdaten, keine Passwortlisten und keine Schadsoftware. Jede Änderung beginnt mit einem Snapshot. NAT wird ausschließlich für ein ausdrücklich dokumentiertes Wartungsfenster aktiviert und danach wieder getrennt.

> **Abkürzung:** Wiederkehrende, fehleranfällige Datenerhebung wird mit einem kleinen, transparenten, read-only Hilfsmittel erledigt. Eine Abkürzung darf manuelle Arbeit reduzieren, aber niemals Scope, Nachweis oder Sicherheitskontrolle überspringen.

## 1. Informationsquelle und Abgleich

Die beigefügte Referenz `reference/Purple_Team_HomeLab_Golden_Baseline_v2.md` ist die Informationsvorlage. Sie enthält die aktuelle Kernarchitektur, historische Herkunft, offene Punkte und das Golden-Baseline-Prüfprotokoll. Der Room-00-Leitfaden übernimmt daraus die belastbaren aktuellen Werte und kennzeichnet widersprüchliche oder spätere Elemente ausdrücklich.

| Bereich | Für Room 00 verwendeter Stand | Umgang mit Abweichungen |
|---|---|---|
| Domäne | `redteamlab.local` | Als aktueller Zielstand dokumentiert; mit `Get-ADDomain` verifizieren. |
| RedTeamLab | `192.168.42.0/24` | Aktuelles Room-00-Netz. |
| DC-01 | `192.168.42.40` | Praktisch bestätigt und für den Wazuh-Agenten aktiv. |
| WAZUH-01 | `192.168.42.20` | Praktisch bestätigt; Dashboard erreichbar. |
| Alice-PC | Golden Baseline nennt `192.168.42.31` | Vor Agentenrollment tatsächlich auslesen; nicht blind überschreiben. |
| Bob-PC | `192.168.42.30` | Für Room 00 optional; späterer Endpoint. |
| Kali | `192.168.42.100` | Für Room 00 ausgeschaltet; späterer Detection-/Discovery-Client. |
| Server1 | `192.168.42.213` | Nicht Bestandteil der minimalen Room-00-Aktivierung; später verifizieren. |
| Historische Netze | `172.30.1.0/24`, `10.11.12.0/24` | Nicht als aktueller Room-00-Zustand annehmen. |
| VMware-Pfad | Golden Baseline beschreibt VMnet0/Bridged für die Dual-Host-Kommunikation | Der bereits validierte Room-00-Pfad verwendet VMnet4/Host-only. Vor einer globalen Baseline muss die reale Adaptermatrix neu geprüft werden. |
| WLAN/RADIUS | Noch nicht freigegeben | Nicht in Room 00 konfigurieren. |

## 2. Zieltopologie für Room 00

```text
Laptop / VMware Workstation
└── VMnet4 · RedTeamLab · Host-only · 192.168.42.0/24
    ├── WAZUH-01   192.168.42.20   Ubuntu 22.04 · Manager/Indexer/Dashboard
    ├── DC-01      192.168.42.40   Windows Server 2019 · AD DS/DNS
    └── ALICE-01   <prüfen>       Windows Client · Wazuh-Agent

NAT / VMnet8: nur temporär für Agent- oder Paketdownload, danach getrennt.
Bridged/physischer Uplink: während Room 00 nicht aktiv.
```

Die Golden Baseline beschreibt für den späteren Gesamtaufbau eine physische Dual-Host-Verbindung über Bridged/VMnet0. Das ist ein **separater Architekturstand** und darf nicht unbemerkt mit der hier validierten Room-00-Host-only-Topologie vermischt werden. Room 00 bleibt absichtlich klein und reproduzierbar.

## 3. Arbeitsweise und Snapshot-Katalog

| Snapshot | Zweck | Status/Anwendung |
|---|---|---|
| `PRE_SIEM_LAB_BASELINE_2026-08` | Rückkehr vor den ersten Room-00-Änderungen | bereits bestätigt |
| `WAZUH_01_CLEAN_INSTALL_NAT` | Frische Wazuh-Installation vor Lab-IP | verwenden, falls vorhanden |
| `WAZUH_01_ROOM00_NETWORK_READY` | Dashboard unter `192.168.42.20` | bereits bestätigt |
| `DC_01_WAZUH_AGENT_ACTIVE` | DC-01-Agent aktiv, NAT getrennt | bereits bestätigt |
| `ALICE_01_WAZUH_AGENT_ACTIVE` | Alice-Agent aktiv | nach Enrollment erstellen |
| `SIEM_BASELINE_READY` | Room-00-Release-Gate bestanden | erst am Ende erstellen |

Snapshots sind Rückkehrpunkte, keine vollständigen Evidenzkopien. Vor einem Restore werden relevante Screenshots, Statusausgaben und die Zeitlinie exportiert.

## 4. Ausführung in Modulen

Der Room wird nicht als ein großer Block ausgeführt. Nach jedem Modul wird das Ergebnis dokumentiert. Ein Fehler stoppt den Ablauf; es wird nicht durch blindes Weiterklicken „repariert“.

| Modul | Inhalt | Ergebnisdatei |
|---|---|---|
| M00 | Scope, Inventar und Snapshot | `docs/00-scope-and-baseline.md` |
| M01 | VMware- und Netzwerkprüfung | `docs/01-topology-validation.md` |
| M02 | WAZUH-01-Installation und Gesundheitscheck | `docs/02-wazuh-foundation.md` |
| M03 | DC-01-Agent | `docs/03-dc01-agent.md` |
| M04 | ALICE-01-Agent | `docs/04-alice01-agent.md` |
| M05 | Baseline-Telemetrie und Zeit | `docs/05-telemetry-baseline.md` |
| M06 | Evidenz, Release Gate und Lessons Learned | `docs/06-release-and-lessons.md` |

### M00 · Scope und Baseline

1. Öffne VMware und bestätige die drei Room-00-VMs: `WAZUH-01`, `DC-01`, `ALICE-01`.
2. Fahre alle nicht benötigten VMs herunter. Kali, Bob, Server1, Metasploitable und DVWA gehören nicht in die minimale Aktivierung.
3. Prüfe pro VM Adapteranzahl, VMnet, Linkstatus, Snapshot und Host. MAC-Adressen dürfen intern dokumentiert werden, gehören aber nicht in ein öffentliches Repository.
4. Erstelle oder bestätige einen Snapshot vor jeder noch offenen Änderung.
5. Fülle `templates/scope.md` aus. Der Scope-Satz lautet beispielsweise: „Wazuh-Agenten und Basistelemetrie eigener Room-00-VMs im isolierten VMnet4 validieren.“

### M01 · Topologie validieren

Auf dem VMware-Host wird der Virtual Network Editor nur gelesen. Für VMnet4 müssen Typ `Host-only`, Subnetz `192.168.42.0`, Maske `255.255.255.0` und ein verbundener Hostadapter sichtbar sein. Die beiden VMs müssen denselben virtuellen Switch verwenden.

Auf Ubuntu:

```bash
ip -br address
ip route
hostnamectl --static
```

Erwartung für WAZUH-01:

```text
ens33  UP  192.168.42.20/24
192.168.42.0/24 dev ens33 ... src 192.168.42.20
```

Auf Windows als Administrator:

```powershell
Get-NetIPConfiguration
Get-NetAdapter
```

Erwartung für DC-01 ist `192.168.42.40/24` auf dem RedTeamLab-Adapter, ohne Default Gateway im isolierten Room. Ein deaktivierter NAT-Adapter darf als Wartungsoption vorhanden bleiben, darf aber nicht verbunden sein.

Die wechselseitige Erreichbarkeit wird mit zwei lokalen Prüfungen validiert:

```powershell
ping.exe -n 2 192.168.42.20
curl.exe -k --connect-timeout 5 -I https://192.168.42.20
```

```bash
ping -c 2 192.168.42.40
ip neigh show dev ens33
```

Die erwartete Dashboard-Antwort ist eine HTTP-Weiterleitung zur Loginseite, häufig `302 Found`. Eine Zertifikatswarnung ist bei einem lokalen selbstsignierten Wazuh-Zertifikat erwartbar.

### M02 · WAZUH-01 installieren und prüfen

Für eine neue Wazuh-VM gilt die offizielle Wazuh-Quickstart-Dokumentation als Quelle. Verwende Ubuntu Server 22.04 LTS, eine dedizierte Room-00-VM und lokal verwaltete Zugangsdaten. Die Golden Baseline darf keine echten Passwörter enthalten.

Der sichere Ablauf ist:

1. Ubuntu installieren und einen neuen lokalen Benutzer mit sicher gespeicherten Zugangsdaten anlegen.
2. Während der Installation oder des Paketdownloads NAT nur als temporäres Wartungsfenster verwenden.
3. Vor der festen Lab-IP einen Snapshot erstellen.
4. Nach erfolgreicher Installation den Adapter auf VMnet4 umstellen.
5. Das reale Ubuntu-Interface mit `ip -br link` ermitteln; im validierten Aufbau heißt es `ens33`.
6. Die Netplan-Datei sichern und die Lab-IP `192.168.42.20/24` setzen. Kein Gateway und kein Internetpfad gehören in Room 00.
7. Die drei Dienste prüfen:

```bash
sudo systemctl is-active wazuh-manager
sudo systemctl is-active wazuh-indexer
sudo systemctl is-active wazuh-dashboard
```

8. Das Dashboard von einem RedTeamLab-Host unter `https://192.168.42.20` aufrufen.
9. Snapshot `WAZUH_01_ROOM00_NETWORK_READY` erstellen.

Ein Wazuh-Installationsscript wird absichtlich nicht als unkontrollierter Root-One-Liner in diesem Repository hinterlegt. Verwende den offiziellen, zum gewünschten Wazuh-Release passenden Quickstart, prüfe die heruntergeladene Quelle und dokumentiere Release sowie Zeitpunkt.

### M03 · DC-01-Agent

DC-01 ist im validierten Aufbau `192.168.42.40/24`, und der Agent `DC-01` wurde bereits als Version 4.14.7 registriert und als `Active` bestätigt. Für eine Wiederholung gilt:

1. Dashboard → **Agents → Deploy new agent**.
2. Betriebssystem Windows, Manager `192.168.42.20`, Name `DC-01`, Gruppe `default`.
3. Wenn der Download im isolierten Netz nicht aufgelöst werden kann, NAT auf dem zweiten Adapter nur mit `Connected` aktivieren. `Connect at power on` bleibt aus.
4. Den vom Dashboard erzeugten offiziellen Agentenbefehl lokal als Administrator ausführen.
5. Direkt danach NAT trennen.
6. Lokal prüfen:

```powershell
sc.exe query WazuhSvc
```

Erwartung: `STATE : 4 RUNNING`. Im Dashboard muss der Agent von `Pending` zu `Active` wechseln. Danach Snapshot `DC_01_WAZUH_AGENT_ACTIVE` erstellen.

### M04 · ALICE-01-Agent

ALICE-01 wird nicht blind auf `192.168.42.31` umgestellt. Die Golden Baseline nennt diese Adresse, aber der tatsächliche Gastzustand wird vor dem Enrollment ausgelesen:

```powershell
Get-NetIPConfiguration | Format-List InterfaceAlias,IPv4Address,IPv4DefaultGateway,DNSServer
Get-NetAdapter
ping.exe -n 2 192.168.42.20
```

Liegt Alice im RedTeamLab und erreicht WAZUH-01, wird der Agent mit Name `ALICE-01` und Manager `192.168.42.20` registriert. Der temporäre Downloadweg folgt exakt dem DC-01-Ablauf. Nach `sc.exe query WazuhSvc` und Dashboard-Status `Active` wird `ALICE_01_WAZUH_AGENT_ACTIVE` erstellt.

### M05 · Telemetrie-Baseline

Room 00 erzeugt bewusst keine künstlichen Angriffe. Die Baseline besteht aus normalen, nachvollziehbaren Aktionen und der Prüfung, ob sie sichtbar sind.

| Prüfung | Nachweis |
|---|---|
| Agenten | Dashboard zeigt `DC-01` und `ALICE-01` als `Active` |
| Wazuh-Dienste | Drei `systemctl is-active`-Ausgaben |
| Windows-Dienst | `sc.exe query WazuhSvc` |
| Zeit | Ubuntu `timedatectl`, Windows `w32tm /query /status` |
| Domain/DNS | `Get-ADDomain`, `Get-DnsServerZone`, `nslookup dc01.redteamlab.local` |
| Logon-Baseline | Ein normaler lokaler Lab-Logon, ohne Kennwort oder Rohlog zu veröffentlichen |
| Dashboard | Agentenanzahl, Keepalive, Events, Alerts, Inventory und FIM-Sicht geprüft |

Windows Event 4624 steht für einen erfolgreichen Logon, Event 4625 für einen fehlgeschlagenen Logon. Diese Events werden in Room 00 nur als Baseline-Kontext bewertet, nicht durch Passwortsprays erzeugt. [4] [5]

### M06 · Evidenz, Release Gate und Lessons Learned

Vor dem Abschluss werden alle Ergebnisdateien aus `docs/` ausgefüllt und Screenshots bereinigt. Ein Screenshot darf keine Passwörter, API-Keys, Enrollment-Keys, Cookies, privaten Hostpfade oder nicht benötigten personenbezogenen Daten enthalten.

Das Release Gate steht in `docs/02-evidence-release-lessons.md`. `SIEM_BASELINE_READY` wird nur erstellt, wenn WAZUH-01 gesund ist, die erforderlichen Agents `Active` sind, die Netzpfade dem Scope entsprechen, NAT getrennt ist und mindestens eine überprüfbare Baseline-Telemetrie vorliegt.

## 5. Troubleshooting-Entscheidungsbaum

| Symptom | Erstprüfung | Nicht tun |
|---|---|---|
| Dashboard nicht erreichbar | `ip -br address`, `ip route`, VMnet-Zuordnung | Nicht sofort Wazuh neu installieren |
| `Destination host unreachable` | Beide Richtungen, Präfixlänge, Adapterstatus, Virtual Network Editor | Nicht mehrere Netze gleichzeitig ändern |
| Agent `Pending` | Dienststatus, Manager-IP, NAT nur für Download, danach Refresh | Nicht Enrollment-Keys veröffentlichen |
| Agent `Stopped` | `Start-Service -Name WazuhSvc`, danach `sc.exe query WazuhSvc` | Nicht mehrfach MSI installieren |
| DNS-Auflösung fehlt | Isoliertes Netz ohne Gateway prüfen; DNS-Rolle in DC-01 verifizieren | Kein zufälliges öffentliches DNS in der Baseline eintragen |
| Netplan-Warnung | Dateirechte mit `chmod 600` korrigieren, `netplan try` verwenden | Nicht unbestätigt `netplan apply` über eine Remoteverbindung ausführen |

## 6. Lessons Learned, die Room 00 liefern soll

Die Lessons-Learned-Datei beantwortet nicht nur, ob etwas „funktioniert“ hat. Sie hält fest, welcher technische Nachweis die Aussage belegt und wo die Sichtbarkeitsgrenze liegt.

| Leitfrage | Beispiel für eine gute Antwort |
|---|---|
| Was war die wichtigste Architekturentscheidung? | Room 00 wurde auf ein einziges Host-only-Netz reduziert; NAT blieb Wartungsoption. |
| Welche Abkürzung war hilfreich? | Ein read-only Inventarskript und kurze Statuschecks ersetzten manuelle Erfassung. |
| Was war ein falscher erster Eindruck? | Ein Timeout wurde zunächst als Wazuh-Problem vermutet, tatsächlich war der Gastpfad noch nicht stabil validiert. |
| Welche Telemetrie fehlt? | Ohne Agent oder Netzwerk-Sensor gibt es keine vollständige Sicht auf ein Zielsystem. |
| Was wird im nächsten Room verbessert? | Snapshot-/Evidenzroutine, Agentabdeckung oder DNS-Rollenverteilung – genau eine priorisierte Änderung. |

## 7. GitHub-Veröffentlichung

Die ZIP-Struktur ist so angelegt, dass der entpackte Ordner direkt als Repository-Inhalt verwendet werden kann. In VS Code öffnest du den entpackten Ordner, prüfst zuerst `reference/Purple_Team_HomeLab_Golden_Baseline_v2.md`, ergänzt die Ergebnisdateien und veröffentlichst anschließend nur bereinigte Dokumentation.

```bash
git init
git branch -M main
git add .
git status
git commit -m "Document Room 00 SIEM foundation"
git remote add origin https://github.com/<ACCOUNT>/<REPOSITORY>.git
git push -u origin main
```

Wenn das Repository bereits existiert und du es geklont hast, verwende kein zweites `git init`, sondern:

```bash
git pull --rebase origin main
git add .
git commit -m "Add modular Room 00 SIEM guide"
git push origin main
```

Vor dem Push prüfst du `git status` und `git diff --cached`. Secrets gehören ausschließlich in lokale Passwortverwaltung oder die dafür vorgesehene Secret-Verwaltung, niemals in Markdown, Screenshots oder Git-History.

## 8. Referenzen

[1] [Purple Team Golden Baseline v2](./reference/Purple_Team_HomeLab_Golden_Baseline_v2.md)

[2] [Wazuh Quickstart](https://documentation.wazuh.com/current/quickstart.html)

[3] [Wazuh Windows Agent Package](https://documentation.wazuh.com/current/installation-guide/wazuh-agent/wazuh-agent-package-windows.html)

[4] [Microsoft Event 4624 – Successful Logon](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624)

[5] [Microsoft Event 4625 – Failed Logon](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4625)

[6] [Wazuh File Integrity Monitoring Configuration](https://documentation.wazuh.com/current/user-manual/capabilities/file-integrity/how-to-configure-fim.html)

[7] [Wazuh File Integrity Monitoring Proof of Concept](https://documentation.wazuh.com/current/proof-of-concept-guide/poc-file-integrity-monitoring.html)

[8] [Microsoft PowerShell Logging](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_logging_windows)

[9] [Microsoft Command Line Process Auditing](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/command-line-process-auditing)

## 9. Inhalt der späteren Folge-Rooms

Room 00 ist die Basis, nicht der gesamte Purple-Team-Lifecycle. Die Golden Baseline enthält bereits die späteren Rollen und offenen Punkte. Nach `SIEM_BASELINE_READY` können separate Module für folgende Räume angelegt werden:

| Folge-Room | Voraussetzung | Ziel |
|---|---|---|
| Network Discovery | PentestNet-Topologie verifiziert | Sichtbarkeit und Exposure-Baseline |
| HiddenNet | Zweiter VMware-Host und internes Netz verifiziert | Segmentierung und Beobachtungsgrenzen |
| Authentication Triage | Mindestens zwei Windows-Agents aktiv | Harmloser Logon-Kontext und Event-Korrelation |
| PowerShell Telemetry | Logging bewusst aktiviert | Benigne Prozess- und Script-Telemetrie |
| File Integrity | Lokaler Testordner und Snapshot | FIM-Alert und Response-Readiness ohne Ransomware |
| RADIUS/WLAN | WLAN-/LANCOM-Aufbau neu und separat getestet | AAA-Telemetrie; nicht Teil von Room 00 |

Die historischen Netze und WLAN-/RADIUS-Werte werden nicht stillschweigend in Room 00 aktiviert. Ihre Aufnahme erfolgt erst nach eigener Prüfung und einem neuen Snapshot.
