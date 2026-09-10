# Scope · Room 00

| Feld | Eintrag |
|---|---|
| Ziel | Wazuh-SIEM-Basis und Windows-Agenten im isolierten RedTeamLab validieren |
| Autorisierte Systeme | WAZUH-01, DC-01, ALICE-01 |
| Aktive Zone | VMnet4 / RedTeamLab / 192.168.42.0/24 |
| Startzeit | |
| Endzeit | |
| Start-Snapshot | |
| Geplanter Abschluss-Snapshot | `SIEM_BASELINE_READY` |
| Nicht im Scope | PentestNet, HiddenNet, RADIUS/WLAN, externe Systeme, Schadsoftware |

## Erlaubte Handlungen

Es sind nur Installation, Netzwerkvalidierung, Agentenrollment, normale lokale Test-Logons und die Prüfung vorhandener Wazuh-Telemetrie erlaubt. NAT darf nur für einen dokumentierten Paketdownload verbunden werden.

## Stopbedingungen

Der Ablauf wird beendet, wenn ein unerwarteter Adapter, ein nicht zuordenbarer Alert, ein Snapshotfehler, eine externe Verbindung oder ein Verdacht auf Datenverlust auftritt.
