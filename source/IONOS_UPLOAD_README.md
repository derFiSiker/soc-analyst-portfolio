# Upload-Anleitung: GitHub und IONOS

Das ZIP enthält zwei wichtige Ordner. **`static-site/`** ist sofort für IONOS geeignet: Lade nur dessen **Inhalt** in das Webroot-Verzeichnis deiner IONOS-Domain hoch. Die Navigation und die Case Studies verwenden Hash-Links und funktionieren ohne zusätzliche Routing-Regeln; Bilder, Logo sowie Portfolio- und ATS-Lebenslauf liegen lokal im Ordner `assets/`.

**`source/`** enthält den editierbaren Quellcode für GitHub Recovery und Visual Studio Code. Nach Änderungen an den Texten in `source/client/src/content/portfolioContent.ts` wird im Ordner `source/` mit `pnpm install` und `pnpm build:ionos` ein neuer IONOS-Upload-Ordner erzeugt. Die detaillierten Case Studies stehen ebenfalls zentral in `portfolioContent.ts`.

Für das Kontaktformular wird einmalig ein Formspree-Formular benötigt. Ersetze in `source/client/src/config/siteConfig.ts` den Platzhalter `https://formspree.io/f/YOUR_FORM_ID` durch die Formspree-Endpunkt-URL. Ohne diese Änderung zeigt die Website eine klare Einrichtungsnachricht statt eine E-Mail-Anwendung zu öffnen.

Der Export enthält keine `node_modules`-Abhängigkeiten. Das ist beabsichtigt und hält das Archiv klein; `pnpm install` lädt diese bei Bedarf aus der `package.json` und `pnpm-lock.yaml` wieder herunter.
