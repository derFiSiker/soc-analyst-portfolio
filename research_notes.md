# Recherche: Fachinformatiker-Systemintegration und IT-Administration

## LinkedIn-Quellen

### Quelle 1: Fachinformatiker*in Systemintegration / IT-Systemadministrator*in
URL: https://www.linkedin.com/jobs/view/fachinformatiker-in-systemintegration-it-systemadministrator-in-m-w-d-at-gig-gesellschaft-f%C3%BCr-integrierte-gesundheitsversorgung-4453133468

Beobachtete Tätigkeitsfelder: Administration von Windows-Arbeitsplätzen und Windows-Servern, Active Directory, Gruppenrichtlinien und Microsoft 365; Betreuung von Netzwerk- und Kommunikationsinfrastruktur mit VLAN, Routing, Firewall und VPN; Datensicherung mit Veeam; Patch- und Update-Management, Endpoint-Security und weitere Hardening-Maßnahmen; Implementierung, Integration und Migration von IT-Systemen; Mitarbeit an Rollouts und Systemeinführungen; Unterstützung externer Dienstleister; technische Betreuung von Standorten sowie Unterstützung und Schulung von Mitarbeitenden.

### Quelle 2: System Administrator Jobs in Bonn
URL: https://www.linkedin.com/jobs/system-administrator-jobs-bonn?trk=guest_job_search_related_jserp_link&position=1&pageNum=0

Beobachtete Tätigkeitsfelder: Betrieb von Windows-Server-Umgebungen; Verwaltung von Active Directory, GPOs, DNS und DHCP; Umsetzung und Dokumentation von Changes; Bearbeitung von Incidents im 2nd-/3rd-Level-Support; Fehleranalyse mit Event Logs, Monitoring- und Diagnosetools; Planung von Windows-Server-Updates und WSUS; Automatisierung von Patch-Prozessen; Umsetzung von Sicherheits- und Hardening-Vorgaben; technische Dokumentation und CMDB-Pflege; Mitarbeit an Standardisierung, Betriebsprozessen und IT-Projekten.

## Abgeleitete Bullet Points für die Website

Die folgenden Punkte werden als allgemeine, auf die Stellenausschreibungen abgestimmte Kompetenzbeschreibung verwendet und stellen keine kopierte Arbeitgeberbeschreibung dar:

- Administration und Betreuung von Windows-Arbeitsplätzen, Windows-Servern und Active Directory.
- Verwaltung von Gruppenrichtlinien, DNS, DHCP und weiteren Windows-Basisdiensten.
- Unterstützung bei Microsoft-365-, Netzwerk-, Firewall- und VPN-Themen.
- Durchführung von Patch- und Update-Management sowie grundlegenden Hardening-Maßnahmen.
- Analyse von Incidents mit Event Logs, Monitoring- und Diagnosetools.
- Unterstützung im 2nd-Level-Support und strukturierte Dokumentation von Changes.
- Betreuung von Backups, technischen Dokumentationen und CMDB-Einträgen.
- Mitarbeit bei IT-Projekten, Migrationen, Rollouts und Systemeinführungen.
- Unterstützung und Schulung von Anwenderinnen und Anwendern im IT-Alltag.

## Kontaktformular-Architektur

Für das statische Frontend und einen späteren IONOS-Deploy sind zwei Wege möglich:

| Ansatz | Vorteil | Nachteil | Aufwand |
|---|---|---|---|
| FormSubmit mit AJAX | Kein eigenes Backend; für statisches Hosting geeignet; sendet an die gewünschte E-Mail-Adresse | Einmalige Aktivierung der Empfängeradresse und externer Dienst nötig | Niedrig |
| Eigenes Backend mit SMTP/API | Maximale Kontrolle über Validierung, Datenschutz und Logging | Hosting, Secrets und Wartung erforderlich | Mittel bis hoch |
| `mailto:`-Fallback | Kein Dienst und keine Serverkonfiguration | Öffnet den Mail-Client des Absenders; kein sicherer serverseitiger Versand | Sehr niedrig |

Die Umsetzung nutzt FormSubmit als praktische statische Lösung und hält die direkte E-Mail-Adresse zusätzlich als Fallback sichtbar. Es werden keine SMTP-Zugangsdaten in den Browser-Code eingebettet.

## Nutzerdaten für die Website

- E-Mail: derfisiker@proton.me
- GitHub: https://github.com/derfisiker
- LinkedIn: https://linkedin.com/in/marco-l%C3%BCtkem%C3%BCller-53b0063ab
- Standort: Germany, NRW, Metropol Ruhr-Region
- IHK: System Integration Specialist (IHK), erfolgreich bestanden am 13.01.2026
- SOC101: Completed
- CompTIA Network+: Prüfungstermin am 11.09.2026

## Quellenverzeichnis

[1]: https://www.linkedin.com/jobs/view/fachinformatiker-in-systemintegration-it-systemadministrator-in-m-w-d-at-gig-gesellschaft-f%C3%BCr-integrierte-gesundheitsversorgung-4453133468 "LinkedIn-Stellenausschreibung Fachinformatiker*in Systemintegration / IT-Systemadministrator*in"
[2]: https://www.linkedin.com/jobs/system-administrator-jobs-bonn?trk=guest_job_search_related_jserp_link&position=1&pageNum=0 "LinkedIn-Stellensuche System Administrator Jobs in Bonn"
[3]: https://formsubmit.co/ "FormSubmit"
[4]: https://formsubmit.co/ajax-documentation "FormSubmit AJAX Documentation"

Hinweis: LinkedIn-Stelleninhalte können sich ändern oder nur als Gastansicht verfügbar sein. Die Website übernimmt daraus nur allgemeine Tätigkeitsbegriffe und formuliert sie eigenständig. Keine nicht bestätigten Berufserfahrungen oder Zertifikate ergänzen.


## Vorschauprüfung am 20.08.2026

Die Vorschau zeigt den Get-in-Touch-Button als Link auf `#contact-form`. Die Hero-Social-Leiste enthält nur GitHub und LinkedIn; das E-Mail-Symbol wurde entfernt. Die Kontaktdaten erscheinen als `derfisiker@proton.me`, GitHub-Profil und LinkedIn-Profil. Die Learning Journey zeigt IHK am 13.01.2026 als abgeschlossen, SOC101 als abgeschlossen und CompTIA Network+ am 11.09.2026 als geplant. Die Administrator-Bullet-Points sind im About-Bereich sichtbar. Das Kontaktformular enthält Name, E-Mail, Nachricht und den Button `Nachricht senden`.

## End preview check
