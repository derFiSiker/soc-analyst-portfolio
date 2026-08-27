# Suspicious PowerShell Activity

Eine Endpoint-Detection-Case-Study zur Kontextbewertung von PowerShell-Ausführung in einer kontrollierten Windows-Lab-Umgebung.

## Ziel

Kodierte Argumente, ungewöhnliche Prozessketten und auffällige Modulnutzung nicht isoliert, sondern mit Benutzer-, Parent-Process- und Endpoint-Kontext bewerten.

## Datenquellen

| Quelle | Zweck |
|---|---|
| Windows Event Logs | Prozess- und Ausführungskontext |
| Wazuh | Zentrale Telemetrie und Triage |
| PowerShell Logging | Sichtbarkeit über legitime und auffällige Nutzung |

## Nächste Ergänzungen

- [ ] Erlaubte Administrationsfälle als Baseline dokumentieren.
- [ ] Bereinigte Prozessbaum-Beispiele hinzufügen.
- [ ] Eigene Bewertungskriterien für Encoded Commands festhalten.
