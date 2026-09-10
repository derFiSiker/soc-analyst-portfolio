# Golden-Baseline-Abgleich für Room 00

## Zweck

Dieses Dokument verhindert, dass historische Architektur, aktuelle Validierung und zukünftige Planung unbemerkt vermischt werden. Die Informationsquelle ist `reference/Purple_Team_HomeLab_Golden_Baseline_v2.md`; die nachfolgenden Room-00-Festlegungen berücksichtigen zusätzlich die praktisch bestätigten Schritte aus dem aktuellen Projektstand.

## Verbindliche Room-00-Fakten

| Thema | Für Room 00 verwendeter Wert | Nachweis |
|---|---|---|
| Netz | RedTeamLab `192.168.42.0/24` | VMware Virtual Network Editor und Gasttests |
| WAZUH-01 | `192.168.42.20/24`, Interface `ens33` | `ip -br address`, `ip route` |
| DC-01 | `192.168.42.40/24`, `Ethernet1`, Prefix 24 | `Get-NetIPAddress`, `Get-NetAdapter` |
| WAZUH-01-Dienste | Manager, Indexer, Dashboard `active` | `systemctl is-active` |
| Dashboard | HTTPS erreichbar, Weiterleitung zur Loginseite | `curl.exe -k -I` mit `302 Found` |
| DC-01-Agent | Version 4.14.7, Status `Active` | Wazuh Agents Summary |
| NAT | nur temporär für Agent-Download; danach getrennt | VMware-Adapterprüfung |
| WAZUH-Snapshot | `WAZUH_01_ROOM00_NETWORK_READY` | VMware Snapshot Manager |
| DC-Snapshot | `DC_01_WAZUH_AGENT_ACTIVE` | VMware Snapshot Manager |

## Abweichungen und offene Punkte

| Aussage der Golden Baseline | Room-00-Entscheidung | Status |
|---|---|---|
| Alice `192.168.42.31` | Vor Enrollment auslesen; nicht automatisch setzen | offen |
| Bob `192.168.42.30` | Nicht für die minimale Room-00-Aktivierung erforderlich | später |
| Kali `192.168.42.100` | Für Room 00 ausgeschaltet | später |
| Server1 `192.168.42.213` | Nicht für Room 00 erforderlich; Dienste später verifizieren | offen |
| VMnet0/Bridged als Dual-Host-Pfad | Nicht mit dem validierten VMnet4-Room verwechseln | Architekturentscheidung offen |
| PentestNet/HiddenNet | Historische beziehungsweise spätere Segmente | nicht in Room 00 aktivieren |
| RADIUS/WLAN | Noch nicht als Golden Baseline freigegeben | später |
| DNS-Rolle Server1/DC-01 | Konsistenzprüfung erforderlich | offen |
| Sysmon-Abdeckung | Nur dokumentieren, was tatsächlich installiert ist | offen |

## Freigaberegel

Eine globale „Golden Baseline“ wird erst nach Prüfung der offenen Punkte freigegeben. Room 00 darf trotzdem als **SIEM Foundation** abgeschlossen werden, weil sein Scope absichtlich auf WAZUH-01, DC-01, ALICE-01 und RedTeamLab begrenzt ist.

## Nicht veröffentlichen

Die Referenzdatei kann historische Platzhalter, interne Pfade oder technische Details enthalten. Vor einem öffentlichen GitHub-Upload werden alle Passwörter, Schlüssel, MAC-Adressen, privaten Hostpfade, persönlichen Daten und unbestätigten Behauptungen entfernt oder als Platzhalter markiert.
