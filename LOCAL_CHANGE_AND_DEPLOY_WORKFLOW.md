# Änderungen lokal prüfen und über GitHub zu IONOS veröffentlichen

## Grundprinzip

Ändern Sie Dateien immer zuerst im VS-Code-Projekt, testen Sie die Website lokal und pushen Sie erst danach den geprüften Commit zu GitHub. IONOS verwendet anschließend den neuen Stand des GitHub-Branches und führt seine Build-Schritte erneut aus.

> Nicht `dist/public` manuell bearbeiten. Dieser Ordner wird bei jedem Build neu erzeugt.

## 1. Projekt in VS Code öffnen

Öffnen Sie den Ordner, der direkt `package.json`, `pnpm-lock.yaml`, `client/` und `vite.config.ts` enthält. Öffnen Sie in VS Code über **Terminal → Neues Terminal** ein PowerShell-Terminal.

Prüfen Sie einmalig:

```powershell
git --version
node --version
pnpm --version
```

## 2. Vor Änderungen den aktuellen Git-Stand prüfen

```powershell
git status
git pull origin main
```

Wenn `git pull` lokale Änderungen überschreiben würde, stoppen Sie und sichern Sie die Änderungen zuerst. Arbeiten Sie nicht weiter, bis der Branch eindeutig synchron ist.

## 3. Änderungen lokal durchführen

Bearbeiten Sie beispielsweise diese Dateien:

| Aufgabe | Datei |
|---|---|
| Navigation | `client/src/components/Navbar.tsx` |
| Footer-Links | `client/src/components/Footer.tsx` |
| Startseite, Sections und Karten | `client/src/pages/Home.tsx` |
| Projekt-Detailseiten | `client/src/pages/ProjectDetail.tsx` |
| globale Styles und responsive Regeln | `client/src/index.css` |

Speichern Sie die Dateien mit `Ctrl + S`.

## 4. Entwicklungsserver starten

```powershell
pnpm dev
```

Öffnen Sie die von Vite angezeigte Adresse, normalerweise:

```text
http://localhost:3000/
```

Testen Sie alle Navigationselemente, insbesondere `About`, `Portfolio`, `Homelab`, `Learning` und `Contact`. Testen Sie die Seite außerdem in einer schmalen Browserbreite und öffnen Sie mindestens eine Portfolio-Detailseite.

Beenden Sie den Server mit `Ctrl + C`, sobald die lokale Prüfung abgeschlossen ist.

## 5. TypeScript und Produktions-Build prüfen

```powershell
pnpm check
pnpm build
```

Der Build muss mit `Done` beziehungsweise `✓ built` enden. Die veröffentlichbaren Dateien liegen anschließend unter:

```text
dist\public\
```

Für IONOS sind insbesondere `dist\public\index.html`, `dist\public\assets\`, `robots.txt` und `sitemap.xml` relevant.

## 6. Änderungen ansehen, bevor sie committed werden

```powershell
git diff
```

Prüfen Sie, ob nur die von Ihnen erwarteten Dateien geändert wurden:

```powershell
git status
```

## 7. Commit erstellen und zu GitHub pushen

Wenn die lokale Prüfung erfolgreich war:

```powershell
git add .
git commit -m "Fix navigation and responsive portfolio cards"
git push origin main
```

Prüfen Sie danach:

```powershell
git status
```

Erwartet wird ein sauberer Arbeitsstand. Wenn Git meldet, dass Ihr Branch mit `origin/main` aktuell ist, wurde der Commit erfolgreich zu GitHub übertragen.

## 8. IONOS aktualisieren

Starten Sie in IONOS einen neuen Build beziehungsweise eine neue Bereitstellung des verbundenen GitHub-Branches. Verwenden Sie für dieses Projekt:

```text
NodeJS: 22.x
Command 1: npm install --global pnpm
Command 2: pnpm install
Command 3: pnpm build
Output path: dist/public
```

Fügen Sie keine Produktions-Commands wie `pnpm dev`, `pnpm preview` oder `pnpm format` hinzu. Nach dem erfolgreichen IONOS-Build öffnen Sie die echte Domain über `https://` und testen Sie die Seite in einem privaten Browserfenster, um alte Cache-Dateien auszuschließen.

## 9. Bei einem Fehler sicher zurückgehen

Wenn eine Änderung lokal nicht funktioniert, verwerfen Sie uncommitted Änderungen nur dann, wenn Sie sie nicht behalten möchten:

```powershell
git restore .
```

Wenn der Commit bereits zu GitHub gepusht wurde, ändern Sie die Dateien lokal, führen Sie erneut `pnpm check` und `pnpm build` aus und pushen Sie einen Korrektur-Commit. Verwenden Sie nicht `git reset --hard`, wenn Sie unsicher sind.

## Aktuelle Korrekturen in dieser Version

Die Navbar verwendet robuste Hash-Anker und bringt Besucher von Projektdetailseiten zurück auf die entsprechende Home-Section. Der Sticky-Header wird durch `scroll-margin-top` berücksichtigt. Die Portfolio-Karten verwenden ein stabiles responsives Grid, `min-w-0`, `h-full`, ein vertikales Flex-Layout und gleichmäßige Textbereiche. Dadurch bleiben Rahmen und Fußzeilen der Karten ausgerichtet, auch wenn Titel und Beschreibungen unterschiedlich lang sind.

Autor: DerFisiker / Erstellt mit Unterstützung von Manus AI
