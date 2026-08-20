# Anleitung: IONOS-Deployment mit Node.js 24 und pnpm

## Hintergrund zur Node.js-Meldung

Die Meldung:
> *Node.js 20 is deprecated but are being forced to run on Node.js 24*

entsteht, weil IONOS in seiner automatischen Build-Umgebung standardmäßig ältere Node.js-Versionen (wie v20) erwartet, die serverseitige Infrastruktur dort jedoch bereits auf **Node.js 24** umgestellt wurde. 

Um diesen Konflikt zu lösen und IONOS mitzuteilen, dass das Projekt auf Node.js 24 und `pnpm` laufen soll, müssen Sie das GitHub-Repository entsprechend vorbereiten.

---

## 1. Schritte in GitHub zur Vorbereitung

### Schritt 1: `engines`-Fekt in `package.json` sicherstellen
In der `package.json` Ihres Projekts ist bereits hinterlegt, welche Node- und pnpm-Versionen mindestens benötigt werden:

```json
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
```

Dadurch erkennt die Build-Umgebung von IONOS automatisch, dass moderne Node- und pnpm-Versionen verwendet werden müssen.

### Schritt 2: `.nvmrc` Datei erstellen (Optional, aber empfohlen)
Um IONOS und GitHub Actions (falls verwendet) festzulegen, welche Node-Version exakt genutzt werden soll, legen Sie im Hauptverzeichnis Ihres Projekts eine Datei namens `.nvmrc` an:

```text
24
```

### Schritt 3: Änderungen in GitHub hochladen
Führen Sie im Terminal Ihres Projekts die folgenden Befehle aus, um die Aktualisierungen zu committen und zu pushen [1]:

```bash
git add .
git commit -m "Update package engines for Node.js 24 and pnpm compatibility"
git push origin main
```

---

## 2. Korrekte Konfiguration im IONOS Control Center

Wenn Sie das Projekt in IONOS mit GitHub verknüpfen, tragen Sie im Deployment-Assistenten folgende Werte ein:

| Einstellungsfeld | Korrekter Wert |
|---|---|
| **Project Type / Preset** | React (oder Vite) |
| **Install Command** | `pnpm install` |
| **Build Command** | `pnpm build` |
| **Output Directory** | `dist/public` |
| **Start Command** | *leer lassen* (wird für statisches Hosting nicht benötigt) |

### Wichtig bezüglich pnpm:
Da Ihr Projekt eine `pnpm-lock.yaml` verwendet, erkennt IONOS bei Verwendung von `pnpm install`, dass die Abhängigkeiten exakt aus diesem Lockfile aufgelöst werden müssen. Das verhindert Versionskonflikte, die bei einer gemischten Nutzung von `npm` und `pnpm` entstehen könnten.

---

## 3. Fehlerbehebung beim IONOS-Build

Sollte der Build bei IONOS dennoch fehlschlagen, prüfen Sie folgende Punkte:

1. **Node-Version erzwingen:** Falls IONOS im Dashboard ein Eingabefeld für die Node.js-Version anbietet, wählen Sie dort **Node.js 24.x** (oder die höchste verfügbare LTS-Version) aus.
2. **Output Directory prüfen:** Stellen Sie sicher, dass als Ausgabeverzeichnis exakt `dist/public` eingetragen ist. Wenn hier nur `dist` steht, sucht IONOS im falschen Unterordner nach der `index.html`.
3. **Lockfile synchron halten:** Vergewissern Sie sich, dass die Datei `pnpm-lock.yaml` im Hauptverzeichnis Ihres GitHub-Repositorys liegt und mitgepusht wurde.

---

## Referenzen

[1]: https://docs.github.com/en/get-started/git/git-basics "GitHub Git Documentation" [1]
[2]: https://www.ionos.de/hilfe/hosting/ "IONOS Hilfe-Center Hosting" [2]

Autor: DerFisiker / Erstellt mit Unterstützung von Manus AI
