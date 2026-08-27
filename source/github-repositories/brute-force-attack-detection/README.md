# Brute Force Attack Detection

Eine Case Study zur Erkennung wiederholter Authentifizierungsversuche gegen SSH, RDP und Web-Anwendungen in einer isolierten Testumgebung.

## Ziel

Fehlgeschlagene Logins, mögliche Passwortsprays und nachfolgende erfolgreiche Anmeldungen über Zeitfenster und Quell-Ziel-Beziehungen strukturiert unterscheiden.

## Telemetrie-Fokus

| Quelle | Analysefrage |
|---|---|
| SSH | Welche Fehlversuche häufen sich pro Quelle und Konto? |
| RDP | Gibt es auffällige Logon-Sequenzen oder Folgelogins? |
| Web-Authentifizierung | Welche Muster weichen von der Baseline ab? |
| Wazuh | Wie werden Quellen, Zeitfenster und Erfolgsmeldungen korreliert? |

## Nächste Ergänzungen

- [ ] Bereinigte Testlogs einfügen.
- [ ] Triage-Entscheidungsbaum dokumentieren.
- [ ] Sonderfälle für Service-Accounts und bekannte Admin-Prozesse notieren.
