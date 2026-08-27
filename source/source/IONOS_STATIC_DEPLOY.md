# Statisches Deployment für GitHub und IONOS

Die Portfolio-Navigation verwendet Hash-Links wie `#projects`, `#profile`, `#skills`, `#learning`, `#writing` und `#contact`. Jede Case Study besitzt zusätzlich eine physische statische Seite unter `case-studies/<id>/index.html`, zum Beispiel `case-studies/ad-lateral-movement/`. Damit funktionieren direkte Aufrufe über einen lokalen Dateiserver oder IONOS ohne serverseitige Weiterleitung und ohne 404-Fallback.

Für einen eigenständigen Export müssen dagegen die bisherigen `/manus-storage/...`-Dateien ersetzt werden. Das Build-Skript `scripts/build-ionos-static.mjs` kopiert die Bilder, das Logo sowie Portfolio- und ATS-Lebenslauf in einen lokalen Ordner `assets/` und wandelt alle betroffenen Pfade in relative Pfade um. Damit funktioniert die Website auch, wenn sie innerhalb eines Unterordners einer IONOS-Domain liegt.

Nach dem Entpacken des Export-ZIPs wird ausschließlich der Inhalt von `static-site/` in das Webroot-Verzeichnis von IONOS hochgeladen. Für spätere Bearbeitungen öffne `source/` in Visual Studio Code, aktualisiere die Texte in `client/src/content/portfolioContent.ts`, führe `pnpm install`, `pnpm build` und anschließend `node scripts/build-ionos-static.mjs` aus. Der dann erzeugte Ordner `ionos-static/` ist erneut der Upload-Ordner.
