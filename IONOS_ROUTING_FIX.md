# Fix für nicht funktionierende Projektlinks auf IONOS

## Ursache

Die lokale Vite-Entwicklungsumgebung leitet unbekannte Pfade automatisch auf `index.html` zurück. Der IONOS-Webserver muss für eine React-SPA dagegen ausdrücklich angewiesen werden, alle nicht vorhandenen Dateien an `index.html` zu übergeben. Ohne diesen Fallback funktioniert `/project/...` lokal, kann online aber als nicht vorhandene Datei mit 404 enden.

## Implementierte Lösung

Die Datei `client/public/.htaccess` enthält den von IONOS dokumentierten Apache-SPA-Fallback. Vite kopiert sie beim Produktions-Build nach `dist/public/.htaccess`. Echte Dateien wie JavaScript, CSS, Bilder, `robots.txt` und `sitemap.xml` werden nicht umgeschrieben; nur nicht vorhandene Routen wie `/project/ad-lateral-movement` werden an `index.html` weitergegeben.

## Lokal prüfen

```powershell
pnpm check
pnpm build
```

Prüfen Sie, ob die Datei vorhanden ist:

```powershell
Get-Item dist/public/.htaccess
```

Starten Sie für die lokale Vorschau anschließend:

```powershell
pnpm preview -- --host localhost
```

## Zu GitHub übertragen

```powershell
git status
git add client/public/.htaccess IONOS_ROUTING_FIX.md
git commit -m "Fix SPA routing for IONOS project pages"
git push origin main
```

## IONOS aktualisieren

Starten Sie in IONOS nach dem erfolgreichen Push einen neuen Build/Deploy des verbundenen `main`-Branches. Die Ausgabe bleibt:

```text
NodeJS: 22.x
npm install --global pnpm
pnpm install
pnpm build
Output path: dist/public
```

Der entscheidende Punkt ist, dass `.htaccess` als versteckte Datei mit nach `dist/public` kopiert und mit veröffentlicht wird. Nach dem Deploy testen Sie zuerst die Startseite und danach direkt diese URL:

```text
https://IHRE-DOMAIN/project/ad-lateral-movement
```

Testen Sie anschließend den Projektkarten-Link, den Zurück-Link und die Navbar auf der Detailseite. Nutzen Sie ein privates Browserfenster oder eine harte Aktualisierung (`Ctrl + F5`), damit keine alte Version aus dem Browser-Cache verwendet wird.

## Falls weiterhin 404 erscheint

Prüfen Sie im IONOS Deployment Viewer, ob `.htaccess` tatsächlich im veröffentlichten Verzeichnis liegt. Die Datei muss exakt `.htaccess` heißen und darf nicht `.htaccess.txt` heißen. Bei klassischem IONOS-Webspace muss sie im Document Root liegen; bei Deploy Now muss sie aus dem Build-Output im Veröffentlichungsverzeichnis landen.

> Die `.htaccess`-Lösung gilt für IONOS Apache/Deploy Now. Wenn Ihr konkretes IONOS-Produkt keine Apache-Regeln aus dem Deployment-Output übernimmt, muss alternativ ein SPA-Fallback in den IONOS-Projekteinstellungen aktiviert werden.

## Quellen

[1]: https://docs.ionos.space/docs/apache-configuration-htaccess/ IONOS Deploy Now: Apache configuration – `.htaccess`

[2]: https://www.ionos.com/help/hosting/htaccess/notes-on-creating-rewrite-rules/ IONOS Help: Notes on Creating Rewrite Rules
