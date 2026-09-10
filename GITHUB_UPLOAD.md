# VS Code · GitHub Upload und Commit

## Variante A: Neues Repository

1. ZIP entpacken.
2. Den entpackten Ordner in VS Code öffnen.
3. `reference/Purple_Team_HomeLab_Golden_Baseline_v2.md` prüfen und die Ergebnisvorlagen ergänzen.
4. Im integrierten Terminal ausführen:

```bash
git init
git branch -M main
git add .
git status
git commit -m "Document Room 00 SIEM foundation"
git remote add origin https://github.com/<ACCOUNT>/<REPOSITORY>.git
git push -u origin main
```

## Variante B: Bestehendes Repository

Repository zuerst klonen und den Inhalt des entpackten Pakets in die geklonte Arbeitskopie kopieren. Danach:

```bash
git pull --rebase origin main
git add .
git status
git diff --cached
git commit -m "Add modular Room 00 SIEM guide"
git push origin main
```

## Vor dem Push

| Prüfung | Erledigt |
|---|---|
| `.gitignore` ist vorhanden | [ ] |
| `git status` enthält keine Secrets oder Rohlogs | [ ] |
| Screenshots sind bereinigt | [ ] |
| Nur eigene Lab-Systeme sind beschrieben | [ ] |
| Golden Baseline ist als Referenz enthalten | [ ] |
| Room-00-Ergebnis wird nicht als globale Baseline überhöht | [ ] |

## Commit-Struktur

Für nachvollziehbare Änderungen sind kleine Commits besser als ein unkommentierter Sammelcommit:

```bash
git add docs/ templates/
git commit -m "Add Room 00 runbook and evidence templates"

git add README.md SECURITY.md .gitignore reference/
git commit -m "Add Golden Baseline reference and repository safeguards"
```

Wenn das Repository bereits eine Branch- oder Workflow-Struktur besitzt, wird nicht mit `git push --force` gearbeitet. Bei Konflikten zuerst `git pull --rebase origin main` ausführen und die Konfliktdateien bewusst prüfen.
