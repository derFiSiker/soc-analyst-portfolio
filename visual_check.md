# Visuelle Prüfung – Navigation und SOC-Portfolio

Datum: 2026-08-20

Die lokale Vorschau unter `http://localhost:3000/` lädt erfolgreich. Die Navbar rendert als normale Anchor-Links mit den erwarteten Zielen `#about`, `#portfolio`, `#homelab`, `#learning` und `#contact`.

Der Klick auf `Portfolio` aktualisiert die URL auf `http://localhost:3000/#portfolio` und scrollt zuverlässig zur Portfolio-Sektion. Die fünf Projektkarten werden in der Desktop-Vorschau als stabiles dreispaltiges Raster ohne verschachtelte Anchor-Rahmen dargestellt. Die Karten haben gleichmäßige Höhen, klare Rahmen und einen sauberen Abstand; die beiden letzten Karten bleiben in der nächsten Reihe ausgerichtet.

Die Korrektur basiert auf dem Entfernen ungültiger verschachtelter `<a>`-Elemente, einem flexiblen Kartenaufbau mit `h-full flex flex-col`, einheitlichen Mindesthöhen für Überschrift und Beschreibung sowie `scroll-margin-top` für den Sticky-Header.
