# IONOS Deploy Now · Workflow-Wiederherstellung

Dieses Paket stellt die drei fehlenden IONOS Deploy Now Workflow-Dateien wieder her und passt den Build an die aktuelle Repository-Struktur an.

## Was die Anpassung macht

Die neue Build-Datei arbeitet im Unterordner `source/`. Sie führt dort `pnpm build` aus und ruft anschließend `scripts/build-ionos-static.mjs` auf. Dieser Schritt erzeugt `source/ionos-static/` und ersetzt die internen Manus-Asset-Pfade durch lokale Dateien aus `source/deployment-assets/`. IONOS erhält ausschließlich diese portable Ausgabe.

> `source/dist/public` ist **nicht** der richtige Upload-Ordner, weil er noch die internen Asset-Pfade enthält. Der richtige IONOS-Ordner lautet `source/ionos-static`.

## Sichere Wiederherstellung in GitHub

1. Öffne [derFiSiker/soc-analyst-portfolio](https://github.com/derFiSiker/soc-analyst-portfolio) und prüfe, dass oben der Branch `main` ausgewählt ist.
2. Lade das zugehörige ZIP herunter und entpacke es auf deinem Rechner. Darin befindet sich die Struktur `.github/workflows/`.
3. Ziehe den **Ordner `.github`** in den Repository-Root. Er darf nicht in `source/` oder `static-site/` liegen.
4. GitHub Desktop: Wähle die drei neuen Dateien aus, schreibe beispielsweise `Restore source-aware IONOS Deploy Now workflow` als Commit-Nachricht und committe auf `main`.
5. Pushe den Commit. Dadurch wird ein neuer IONOS-Workflow angestoßen. Dies ist die einzige Aktion, die eine spätere Veröffentlichung anstoßen kann.
6. Öffne GitHub → **Actions**. Der neue Orchestration-Run muss den gerade erzeugten Commit-Hash und die drei Schritte `check readiness`, `build`, `trigger deployment` zeigen.
7. Öffne erst nach grünem Build `https://derfisiker.de/` in einem privaten Browserfenster. Danach prüfe eine direkte Case Study unter `https://derfisiker.de/case-studies/ad-lateral-movement/`.

## Falls der Build rot wird

Öffne den fehlgeschlagenen Run und kopiere ausschließlich die letzten 30–50 Logzeilen des fehlgeschlagenen Schritts hier hinein. Keine IONOS Secrets oder privaten Schlüssel kopieren. Der wahrscheinlich relevante Schritt heißt `Build portable static portfolio from source` oder `Store deployment content`.

## Sicherheitsnote

Die Dateien enthalten nur die bereits im historischen IONOS-Workflow hinterlegte **Project ID**, aber keine Geheimnisse. `IONOS_API_KEY` und `IONOS_SSH_KEY` bleiben als GitHub Secrets im IONOS-Projekt hinterlegt und dürfen nie in eine YAML-Datei geschrieben werden.

## References

[1] [IONOS Deploy Now: GitHub Actions customization](https://docs.ionos.space/docs/github-actions-customization/)
