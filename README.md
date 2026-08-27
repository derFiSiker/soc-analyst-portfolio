# IONOS Deploy Now · CV-Asset-Reparatur

Dieser kleine Nachtrag behebt ausschließlich den fehlenden Build-Input. Der Workflow aus dem ersten Paket bleibt unverändert.

## Enthaltene Dateien

Nach dem Entpacken enthält das Archiv zwei PDF-Dateien unter diesem **exakten** Pfad:

```text
source/deployment-assets/Marco_Luetkemuller_Portfolio_CV.pdf
source/deployment-assets/Marco_Luetkemuller_ATS_CV.pdf
```

Die Namen entsprechen `source/scripts/build-ionos-static.mjs`. Beide Dateien müssen in deinem GitHub-Repository unter `main` liegen.

## GitHub-Schritte

1. Entpacke dieses Archiv.
2. Kopiere den Ordner `source` in den **Repository-Root** und erlaube dabei das Zusammenführen mit dem vorhandenen `source`-Ordner.
3. Kontrolliere, dass die zwei PDFs danach in `source/deployment-assets/` liegen. Die bereits vorhandene Datei `Marco_Luetkemuller_CV.pdf` muss nicht gelöscht werden.
4. Committe und pushe nur diese zwei neuen PDF-Dateien, zum Beispiel mit der Commit-Nachricht `Add missing portable CV assets for IONOS build`.
5. Der bestehende Workflow startet automatisch erneut. Ein erfolgreicher Durchlauf erstellt zuerst `source/ionos-static` und übergibt anschließend ausschließlich diesen Ordner an IONOS.

> Dies ist eine technische Build-Reparatur. Weder Texte noch Gestaltung der Website werden verändert.
