# Active Directory Lateral Movement Detection

Eine Blue-Team-Case-Study zur Korrelation von Authentifizierungs-, Prozess- und Kerberos-Telemetrie in einer kontrollierten Active-Directory-Lab-Umgebung.

## Ziel

Die Dokumentation beschreibt, wie Event ID 4624, 4688 und 4769 gemeinsam in einen nachvollziehbaren Triage-Kontext gebracht werden. Der Fokus liegt auf Detection-Qualität, Baselines und dokumentierbaren Untersuchungswegen — nicht auf Angriffsausführung.

## Lab-Umgebung

| Komponente | Rolle |
|---|---|
| Windows Server 2019 | Domain Controller |
| Windows 10 Clients | Endpoint-Telemetrie |
| Wazuh | Zentrale Sammlung und Analyse |
| Splunk Forwarder | Zusätzlicher Log-Transport |
| Wireshark | Netzwerk-Kontextanalyse |

## Repository-Struktur

```text
docs/       # Szenario, Triage-Notizen, Lessons Learned
detections/ # Eigene Regeln oder Pseudoregeln ohne sensible Daten
evidence/   # Bereinigte Screenshots und Beispielartefakte
```

## Nächste Ergänzungen

- [ ] Bereinigte Timeline aus einem kontrollierten Testlauf ergänzen.
- [ ] Eigene Detection-Regel mit Testkriterien dokumentieren.
- [ ] Baseline und bekannte Fehlalarme beschreiben.
