# Room 00 · Grenzen und offene Punkte

Diese Datei wird während der Durchführung aktualisiert. Ein offener Punkt ist kein Fehler, solange er sichtbar dokumentiert und nicht als abgeschlossen behauptet wird.

| Punkt | Status | Nächste Prüfung |
|---|---|---|
| ALICE-01 reale IP | offen | `Get-NetIPConfiguration` |
| ALICE-01 Agent | offen | Dashboard: `Active` |
| Bob-PC | außerhalb Room-00-Minimum | späterer Endpoint-Room |
| Server1/DNS-Rollenverteilung | offen | separate Golden-Baseline-Prüfung |
| Kali-Agent/Sensorik | offen | nur im späteren Discovery-Profil |
| VMnet0/Bridged Dual-Host-Pfad | nicht Room-00-Scope | separate Architekturprüfung |
| PentestNet/HiddenNet | später | erst nach eigenem Snapshot |
| RADIUS/WLAN | nicht freigegeben | separater Neuaufbau |

## Beobachtungsgrenzen

Room 00 beweist die Wazuh-Agentenkommunikation der eingeschlossenen Windows-Systeme. Es beweist nicht automatisch vollständige Netzwerk- oder Domain-Telemetrie für VMs ohne Agenten, für historische Netze oder für das später geplante WLAN/RADIUS-Segment.
