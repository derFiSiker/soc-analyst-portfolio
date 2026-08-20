# Weiße Seite und Build-Warnungen beheben

## Kurzdiagnose

Der Produktions-Build war erfolgreich. Die weiße Seite entsteht sehr wahrscheinlich dadurch, dass `index.html` direkt per Doppelklick über `file://` geöffnet wird. Dieses Projekt ist eine Vite-React-Anwendung. Der Browser muss die Dateien über einen HTTP-Server laden, damit die JavaScript-Module, CSS-Dateien und clientseitigen Routen korrekt aufgelöst werden.

> **Nicht verwenden:** `C:\...\dist\public\index.html` per Doppelklick öffnen.
>
> **Verwenden:** `npm run dev`, `npm run preview` oder einen echten Webserver wie IONOS.

## 1. Projekt korrekt starten

Öffnen Sie PowerShell im Projektordner:

```powershell
cd "C:\Users\SOCMa\Documents\Cyber -Security-Analyst\Portfolio Webseite\soc-analyst-portfolio"
```

Installieren Sie die Abhängigkeiten, falls das Projekt auf diesem Computer erstmals ausgeführt wird:

```powershell
npm install
```

Starten Sie anschließend den Entwicklungsserver:

```powershell
npm run dev
```

Öffnen Sie die von Vite angezeigte Adresse, normalerweise:

```text
http://localhost:3000/
```

Wenn Port 3000 bereits belegt ist, zeigt Vite einen anderen Port an. Verwenden Sie dann exakt diese Adresse.

## 2. Produktions-Build korrekt testen

Erzeugen Sie zunächst einen neuen Build:

```powershell
npm run build
```

Starten Sie danach den Produktions-Preview-Server:

```powershell
npm run preview -- --host localhost
```

Öffnen Sie anschließend die von Vite ausgegebene URL, meistens:

```text
http://localhost:4173/
```

Beenden Sie den Preview-Server mit `Ctrl + C`.

Die fertige Website befindet sich nach dem Build unter:

```text
dist\public\
```

Für klassisches IONOS-Webhosting wird der **Inhalt** dieses Verzeichnisses hochgeladen, nicht die lokale `index.html` per Doppelklick.

## 3. CSS-Import-Warnung verstehen und beheben

Die Warnung entstand durch diesen Import in `client/src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap');
```

Dieser Import stand nach Tailwind-Regeln und musste deshalb von Vite beanstandet werden. Die Website bindet die Schriftarten bereits über `client/index.html` ein. Deshalb ist die sauberste Lösung, den CSS-Import vollständig zu entfernen und nur den `<link>` in `index.html` zu behalten.

Der Anfang von `client/src/index.css` sollte danach so aussehen:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Design Tokens */
}
```

Der Fonts-Link in `client/index.html` bleibt erhalten:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

Die Reihenfolge ist damit eindeutig: CSS-Imports stehen am Anfang der CSS-Datei; der externe Fonts-Link wird im HTML-Head geladen.

## 4. Analytics-Warnungen bereinigen

Die Warnungen

```text
%VITE_ANALYTICS_ENDPOINT% is not defined
%VITE_ANALYTICS_WEBSITE_ID% is not defined
```

entstehen, wenn in `index.html` ein Umami-Skript mit Platzhaltern eingebunden ist, aber keine passenden Umgebungsvariablen existieren.

Für dieses Portfolio wurde Analytics standardmäßig deaktiviert. In `client/index.html` sollte daher kein aktives Analytics-Skript stehen:

```html
<script type="module" src="/src/main.tsx"></script>
<!-- Analytics bewusst deaktiviert: Es sind keine VITE_ANALYTICS_* Variablen konfiguriert. -->
```

Falls Sie später Umami verwenden möchten, legen Sie im Projektstamm eine lokale Datei `.env.local` an:

```env
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=ihre-website-id
```

Verwenden Sie keine geheimen API-Schlüssel als `VITE_`-Variable. Vite schreibt `VITE_`-Variablen in das Frontend-Bundle; sie sind damit im Browser sichtbar.

## 5. Nach der Änderung prüfen

Führen Sie beide Prüfungen aus:

```powershell
npm run check
npm run build
```

Die erwartete Ausgabe enthält:

```text
✓ built in ...
```

Die ursprünglichen CSS- und Analytics-Warnungen sollten verschwunden sein. Eine mögliche verbleibende Meldung zu großen JavaScript-Chunks ist nur eine Performance-Warnung und verhindert den Build nicht. Die Seite ist dadurch nicht weiß.

## 6. Weiße Seite systematisch untersuchen

Wenn die Seite nach dem Start über `http://localhost:3000` oder `http://localhost:4173` weiterhin weiß bleibt, öffnen Sie im Browser die Entwicklertools mit `F12` und prüfen Sie:

| Bereich | Prüfung |
|---|---|
| Console | Gibt es einen roten JavaScript-Fehler? |
| Network | Laden `index.html`, die JS-Datei und die CSS-Datei mit Status `200`? |
| Elements | Existiert ein Element `<div id="root">`? |
| Address bar | Wird `http://localhost:...` verwendet und nicht `file:///...`? |
| Terminal | Läuft der Vite-Server noch und zeigt er einen Fehler? |

Typische Ursachen sind ein falscher Pfad, ein nicht gestarteter Server oder ein JavaScript-Fehler. Beim direkten Öffnen per `file://` erscheinen häufig Modul- oder CORS-Fehler; deshalb ist dieser Test für Vite-Projekte nicht geeignet.

## 7. Deployment auf IONOS

Nach erfolgreichem Build öffnen Sie den Ordner:

```text
dist\public\
```

Laden Sie alle darin enthaltenen Dateien in das Zielverzeichnis Ihrer IONOS-Domain hoch. Die Datei `index.html` muss direkt im Domain-Stammverzeichnis liegen. Eine mögliche Struktur sieht so aus:

```text
/                       ← IONOS-Zielverzeichnis
├── index.html
├── robots.txt
├── sitemap.xml
└── assets/
    ├── index-....js
    └── index-....css
```

Öffnen Sie danach die echte Domain über `https://`. Prüfen Sie Startseite, Projekt-Detailseiten, Navigation, Kontaktformular und Social Links. Browser-Cache kann alte Dateien anzeigen; testen Sie bei Bedarf in einem privaten Fenster oder führen Sie einen Hard Reload mit `Ctrl + F5` aus.

## 8. Hinweis zu den Projektseiten

Die Anwendung verwendet clientseitiges Routing. Auf einem Webserver muss jede Route auf `index.html` zurückfallen, damit beispielsweise `/project/ad-lateral-movement` auch nach einem direkten Aufruf funktioniert. Falls IONOS beim direkten Aufruf einer Projektseite einen 404-Fehler zeigt, benötigt der Webspace eine passende Rewrite-Regel oder Sie verwenden zunächst die Navigation aus der Startseite.

## Abschluss-Checkliste

- [ ] Nicht mehr per Doppelklick über `file://` öffnen.
- [ ] `npm run dev` oder `npm run preview -- --host localhost` verwenden.
- [ ] Google-Fonts-`@import` aus `index.css` entfernen.
- [ ] Fonts nur über den `<link>` im HTML-Head laden.
- [ ] Nicht benötigtes Analytics-Skript aus `index.html` entfernen.
- [ ] `npm run check` erfolgreich ausführen.
- [ ] `npm run build` erfolgreich ausführen.
- [ ] Inhalt von `dist/public/` auf IONOS hochladen.
- [ ] `index.html` direkt im IONOS-Zielverzeichnis platzieren.
- [ ] Die Domain über HTTPS testen.

## Referenzen

[1]: https://vite.dev/guide/ "Vite Guide"
[2]: https://vite.dev/guide/static-deploy.html "Vite Static Deploy Guide"
[3]: https://developer.mozilla.org/en-US/docs/Web/HTTP "MDN HTTP Overview"
[4]: https://www.ionos.de/hilfe/hosting/ "IONOS Hilfe-Center Hosting"

Autor: DerFisiker / Erstellt mit Unterstützung von Manus AI
