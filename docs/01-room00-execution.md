# Room 00 · Ausführungsprotokoll

## Startbedingungen

Room 00 wird nur gestartet, wenn die folgenden Punkte erfüllt sind:

| Prüfung | Ergebnis |
|---|---|
| Labor-Scope gelesen | [ ] |
| Nicht benötigte VMs ausgeschaltet | [ ] |
| Ausgangs-Snapshots vorhanden | [ ] |
| VMnet4/RedTeamLab geprüft | [ ] |
| NAT-Adapter getrennt | [ ] |
| Zugangsdaten lokal sicher verfügbar | [ ] |

## Phase A · WAZUH-01

1. Ubuntu 22.04 als dedizierte VM bereitstellen. Die VM erhält einen neuen lokalen Benutzer; das Passwort wird nicht in diesem Repository gespeichert.
2. Wazuh nach dem offiziellen Quickstart installieren. Release, Installationszeitpunkt und Installationsquelle in `docs/02-wazuh-foundation.md` notieren.
3. Vor dem Netzwerkwechsel den Snapshot `WAZUH_01_CLEAN_INSTALL_NAT` erstellen.
4. VMnet4 als einzigen Room-00-Adapter verwenden. Das reale Interface mit `ip -br link` prüfen.
5. Eine statische Adresse `192.168.42.20/24` konfigurieren. Im isolierten Room wird kein Default Gateway eingetragen.
6. Mit `netplan try` testen und die Änderung erst über die Bestätigungsabfrage übernehmen. Bei einer Remoteverbindung niemals unbestätigt dauerhaft anwenden.
7. Dienste prüfen:

```bash
sudo systemctl is-active wazuh-manager
sudo systemctl is-active wazuh-indexer
sudo systemctl is-active wazuh-dashboard
```

8. Dashboard unter `https://192.168.42.20` aufrufen und Snapshot `WAZUH_01_ROOM00_NETWORK_READY` erstellen.

## Phase B · DC-01

1. DC-01 mit RedTeamLab-Adapter starten; den optionalen NAT-Adapter getrennt lassen.
2. IP, Prefix, DNS und Gateway auslesen:

```powershell
Get-NetIPConfiguration
Get-NetAdapter
```

3. Erreichbarkeit testen:

```powershell
ping.exe -n 2 192.168.42.20
curl.exe -k --connect-timeout 5 -I https://192.168.42.20
```

4. Im Dashboard den Windows-Agenten `DC-01` mit Manager `192.168.42.20` registrieren.
5. Falls der Download im isolierten Netz nicht möglich ist, NAT nur für den Download mit `Connected` aktivieren. `Connect at power on` bleibt deaktiviert. Nach der Installation sofort trennen.
6. Dienst prüfen:

```powershell
sc.exe query WazuhSvc
```

7. Im Dashboard so lange aktualisieren, bis der Agent `Active` ist. Danach Snapshot `DC_01_WAZUH_AGENT_ACTIVE` erstellen.

## Phase C · ALICE-01

1. Alice starten und die reale Adresse auslesen. Die Golden-Baseline-Adresse `192.168.42.31` wird nur übernommen, wenn sie bestätigt wurde.
2. RedTeamLab- und Dashboard-Verbindung testen.
3. Agent `ALICE-01` im Dashboard registrieren. Download und NAT-Fenster wie bei DC-01 behandeln.
4. `sc.exe query WazuhSvc` prüfen und im Dashboard `Active` abwarten.
5. Snapshot `ALICE_01_WAZUH_AGENT_ACTIVE` erstellen.

## Phase D · Baseline-Telemetrie

Die Baseline verwendet normale, harmlose Aktionen. Es werden keine absichtlichen Fehlanmeldungsserien, keine Passwortlisten und keine Angriffswerkzeuge benötigt.

| Handlung | Zweck | Ergebnis |
|---|---|---|
| Ein lokaler Lab-Logon auf DC-01 | Erfolgs-Baseline | Zeitstempel notieren |
| Ein lokaler Lab-Logon auf Alice | Endpoint-Baseline | Zeitstempel notieren |
| Wazuh Agents Summary öffnen | Agentenzustand | Screenshot bereinigen |
| `timedatectl` / `w32tm` | Zeitkorrelation | Abweichungen dokumentieren |
| DNS-Abfrage zu DC-01 | Domain-Baseline | Ergebnis in Timeline |

## Phase E · Abschluss

1. Alle Screenshots und Ausgaben bereinigen.
2. `templates/timeline.md`, `templates/evidence-index.md` und `templates/lessons-learned.md` ausfüllen.
3. `docs/04-release-gate.md` vollständig prüfen.
4. Nur wenn alle Muss-Kriterien bestanden sind, Snapshot `SIEM_BASELINE_READY` erstellen.
5. Danach keine globale Golden Baseline behaupten, solange die im Abgleich dokumentierten offenen Punkte nicht geprüft sind.
