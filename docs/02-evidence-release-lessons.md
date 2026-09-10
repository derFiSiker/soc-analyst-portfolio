# Room 00 · Evidenz, Release Gate und Lessons Learned

## Evidenzprinzip

Die Evidenz soll eine Aussage belegen, nicht möglichst viele Bildschirmfotos sammeln. Jede Datei erhält einen Zeitstempel und einen kurzen Zweck. Rohlogs bleiben lokal; veröffentlicht werden nur bereinigte Auszüge.

| Evidenz | Mindestinhalt | Datei |
|---|---|---|
| Topologie | RedTeamLab, VMnet4, Rollen und IPs | `evidence/topology-sanitized.png` |
| Wazuh-Gesundheit | drei aktive Dienste oder Dashboard-Zustand | `evidence/wazuh-health-sanitized.png` |
| Agenten | DC-01 und ALICE-01 mit Status Active | `evidence/agents-active-sanitized.png` |
| Netzwerk | Ping/HTTP-Nachweis ohne private Hostdetails | `evidence/network-validation.txt` |
| Timeline | Vorbereitung, Enrollment, Baseline, Abschluss | `docs/timeline.md` |
| Grenzen | nicht überwachte Systeme und offene Baseline-Punkte | `docs/limitations.md` |

## Bereinigung vor GitHub

Vor dem Commit müssen Passwörter, Wazuh-Enrollment-Keys, API-Tokens, Session-Cookies, MAC-Adressen, private Hostpfade und unnötige personenbezogene Daten entfernt werden. Auch Screenshots aus VMware sollten keine privaten Desktopbereiche zeigen. Falls ein Secret versehentlich committed wurde, reicht das Löschen der Datei nicht; das Secret muss widerrufen beziehungsweise rotiert werden.

## Release Gate

| Bereich | Prüfschritt | Status |
|---|---|---|
| Scope | Nur eigene VMs und RedTeamLab betroffen | [ ] |
| Snapshots | Start-Snapshots und Zwischen-Snapshots vorhanden | [ ] |
| WAZUH-01 | Manager, Indexer, Dashboard `active` | [ ] |
| WAZUH-01 | Dashboard unter `192.168.42.20` erreichbar | [ ] |
| DC-01 | `192.168.42.40/24` und Wazuh-Agent `Active` | [ ] |
| ALICE-01 | reale IP dokumentiert und Agent `Active` | [ ] |
| NAT | nach Downloads getrennt | [ ] |
| DNS/Zeit | relevante Auflösung und Zeitstatus geprüft | [ ] |
| Evidenz | Screenshots und Ausgaben bereinigt | [ ] |
| Dokumentation | Timeline, Grenzen und Lessons Learned ausgefüllt | [ ] |

**Freigabeentscheidung:** `PASS` / `FAIL`  
**Freigabe durch:** ____________________  
**Zeitpunkt:** ____________________  
**Snapshotname:** `SIEM_BASELINE_READY` / ____________________

## Rollback

Bei einem Fehler wird zunächst der letzte sinnvolle Snapshot identifiziert. Vor dem Restore werden relevante Evidenzdateien kopiert. Danach wird dokumentiert, welcher Snapshot verwendet wurde, welche Änderung damit verworfen wurde und ob der nächste Durchlauf eine andere Reihenfolge benötigt. Ein Restore ist kein Ersatz für eine Lessons-Learned-Notiz.

## Lessons Learned

### Was war die wichtigste Erkenntnis?

____________________________________________________________

### Welche Beobachtung ist tatsächlich belegt?

____________________________________________________________

### Welche Annahme war falsch oder unvollständig?

____________________________________________________________

### Welche Telemetrie fehlte?

____________________________________________________________

### Welche eine Verbesserung wird als Nächstes priorisiert?

____________________________________________________________

### Was wird ausdrücklich nicht behauptet?

____________________________________________________________

## Portfolio-fähige Kurzfassung

> In Room 00 wurde eine isolierte Wazuh-SIEM-Basis auf RedTeamLab aufgebaut. WAZUH-01 wurde über `192.168.42.20` validiert, DC-01 als Windows-Agent registriert und die Agentenkommunikation nach einer kontrollierten Wartungsphase ohne NAT bestätigt. Die Abschlussbewertung trennt nachgewiesene Telemetrie von noch offenen Sensorik- und Baseline-Punkten.

Diese Kurzfassung darf erst veröffentlicht werden, wenn die darin genannten Schritte tatsächlich abgeschlossen und mit bereinigter Evidenz belegt sind.
