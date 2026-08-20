# Schritt-für-Schritt-Anleitung: Deployment des Portfolios auf IONOS via GitHub

Diese professionelle Anleitung beschreibt, wie Sie Ihr modernes SOC-Analyst-Portfolio (erstellt mit React, TypeScript, Tailwind CSS und Vite) über GitHub in Ihr IONOS Hosting-Paket einbinden und veröffentlichen [1] [2]. 

> **Hinweis zur Architektur:** Obwohl in der initialen Anfrage von Next.js gesprochen wurde, basiert das Projekt technisch auf einer hocheffizienten, blitzschnellen Single-Page-Application (SPA) mit React und Vite. Dies ist ideal für das klassische IONOS Webhosting, da es rein statische Dateien (`dist/`) erzeugt, die ohne teuren Node.js-Server-Dienst sofort auf jedem IONOS-Webspace laufen.

---

## Übersicht der Deployment-Schritte

1. [Vorbereitung des GitHub-Repositorys](#1-vorbereitung-des-github-repositorys)
2. [Lokales Projekt hochladen und pushen](#2-lokales-projekt-hochladen-und-pushen)
3. [Produktions-Build lokal erstellen (optional zur Kontrolle)](#3-produktions-build-lokal-erstellen-optional-zur-kontrolle)
4. [Einrichtung bei IONOS (Hosting oder Git-Deployment)](#4-einrichtung-bei-ionos-hosting-oder-git-deployment)
5. [Domain- und SSL-Konfiguration](#5-domain--und-ssl-konfiguration)

---

## 1. Vorbereitung des GitHub-Repositorys

Bevor Sie das Projekt mit IONOS verknüpfen, muss der Quellcode in Ihrem persönlichen GitHub-Account liegen (unter `https://github.com/derfisiker`) [3].

1. Loggen Sie sich in Ihr [GitHub-Konto](https://github.com) ein.
2. Klicken Sie oben rechts auf das **`+`**-Symbol und wählen Sie **`New repository`**.
3. Vergeben Sie einen Repository-Namen (z. B. `soc-analyst-portfolio`).
4. Wählen Sie die Sichtbarkeit **`Public`** (für kostenloses GitHub Pages / einfaches IONOS Git-Deployment) oder **`Private`**.
5. Setzen Sie **keinen** Haken bei "Add a README file" (da das Projekt lokal bereits alle Dateien enthält).
6. Klicken Sie auf **`Create repository`**.

---

## 2. Lokales Projekt hochladen und pushen

Sie können das von mir bereitgestellte ZIP-Archiv (`soc-analyst-portfolio.zip`) auf zwei Wegen zu GitHub übertragen:

### Weg A: Direkt über die GitHub Web-Oberfläche (Am schnellsten)
1. Entpacken Sie die Datei `soc-analyst-portfolio.zip` auf Ihrem Computer.
2. Gehen Sie auf die Seite Ihres eben erstellten GitHub-Repositorys.
3. Klicken Sie auf den Link **`uploading an existing file`**.
4. Ziehen Sie den gesamten Inhalt des entpackten Ordners (inkl. `client/`, `package.json` etc.) in das Browserfenster.
5. Klicken Sie unten auf **`Commit changes`**.

### Weg B: Über die Kommandozeile / Git (Für Entwickler)
Öffnen Sie das Terminal im Projektordner und führen Sie nacheinander folgende Befehle aus [4]:

```bash
git init
git add .
git commit -m "Initial commit: SOC Analyst Portfolio ready for deployment"
git branch -M main
git remote add origin https://github.com/derfisiker/soc-analyst-portfolio.git
git push -u origin main
```

---

## 3. Produktions-Build lokal erstellen (optional zur Kontrolle)

Da IONOS-Webspace für statische Webseiten optimiert ist, benötigt das Hosting die kompilierten HTML-, CSS- und JS-Dateien.

1. Installieren Sie die Projektabhängigkeiten im Terminal (falls Node.js installiert ist) [4]:
   ```bash
   npm install
   ```
2. Starten Sie den Build-Prozess [4]:
   ```bash
   npm run build
   ```
3. Im Anschluss befindet sich im Ordner ein Verzeichnis `dist/` (bzw. bei manchen Strukturen `dist/public`), welches die fertigen, minifizierten Webdateien enthält.

---

## 4. Einrichtung bei IONOS

IONOS bietet verschiedene Wege, um Webseiten zu veröffentlichen. Je nach Ihrem IONOS-Tarif haben Sie zwei Möglichkeiten:

### Methode 1: IONOS Git-Deployment (Empfohlen für GitHub-Integration)
Wenn Ihr IONOS-Tarif Git-Zugriff unterstützt:
1. Loggen Sie sich in das [IONOS Control Center](https://www.ionos.de) ein [1].
2. Navigieren Sie zu **Hosting** und wählen Sie Ihre Domain aus.
3. Öffnen Sie den Menüpunkt **Git-Deployment** (oder **Developer Tools** / **SSH & Git**).
4. Verbinden Sie Ihr GitHub-Repository `https://github.com/derfisiker/soc-analyst-portfolio`.
5. Tragen Sie als Build-Befehl `npm install && npm run build` ein (falls von IONOS unterstützt) und definieren Sie das Ausgabeverzeichnis als `/dist` oder `/dist/public`.
6. Speichern Sie die Konfiguration. Bei jedem Push auf `main` aktualisiert IONOS die Webseite automatisch.

### Methode 2: Manueller Upload via FTP / IONOS File Manager (Der Standard-Weg)
Falls Ihr Tarif kein direktes Git-Deployment hat, ist der manuelle Upload in wenigen Minuten erledigt:
1. Erstellen Sie den Produktions-Build auf Ihrem PC (`npm run build`).
2. Alternativ können Sie die vorgefertigten statischen Dateien nutzen.
3. Loggen Sie sich in das IONOS Control Center ein und öffnen Sie den **Webspace-Explorer** (FTP-Dateimanager) [1].
4. Navigieren Sie in das Hauptverzeichnis Ihrer Domain (häufig `/` oder `/html` bzw. `/public_html`).
5. Laden Sie **alle Inhalte** aus dem gebauten `dist/` (oder `dist/public/`)-Ordner direkt in dieses Webspace-Verzeichnis hoch [5].
6. Stellen Sie sicher, dass sich die `index.html` direkt im Stammverzeichnis Ihrer Domain befindet.

---

## 5. Domain- und SSL-Konfiguration

1. **Domain-Zuordnung:** Stellen Sie im IONOS Control Center unter **Domains & SSL** sicher, dass Ihre Domain direkt auf das Verzeichnis zeigt, in dem die `index.html` liegt.
2. **SSL-Zertifikat (HTTPS):** Aktivieren Sie in den IONOS Domain-Einstellungen ein kostenloses **Let's Encrypt SSL-Zertifikat**, damit Ihre Portfolio-Besucher (Recruiter) die Seite sicher über `https://` aufrufen können.
3. **Abschließender Test:** Rufen Sie Ihre Domain im Browser auf. Prüfen Sie, ob das Kontaktformular, die Projektseiten und alle Links reibungslos funktionieren.

---

## Referenzen

[1]: https://www.ionos.de "IONOS Control Center & Hosting"
[2]: https://github.com "GitHub Repository Management"
[3]: https://github.com/derfisiker "GitHub Profil DerFisiker"
[4]: https://docs.github.com/en/get-started/git/git-basics "GitHub Git Documentation"
[5]: https://www.ionos.de/hilfe/hosting/ "IONOS Hilfe-Center für Webspace und FTP"

*Autor: DerFisiker / Erstellt mit Unterstützung von Manus AI*
