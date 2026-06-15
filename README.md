# WorldStat Explorer: Global Data & Statistics

[![Live Demo](https://img.shields.io/badge/Live_Demo-success?style=for-the-badge)](https://thriving-mermaid-f3f6cd.netlify.app/)

Eine interaktive, performante React-Single-Page-Application zur Erkundung globaler Länderdaten, Statistiken und Flaggen. Der Fokus lag auf sauberem State-Management, asynchronem Data-Fetching und einer responsiven UI.

<div align="center">
  <h3>Desktop Ansicht</h3>
  <img src="./assets/startseite.png" width="47%" alt="Dashboard" /> &nbsp;
  <img src="./assets/filterfunktionen.png" width="47%" alt="Filter" />
  <br><br>
  <img src="./assets/stats_page.png" width="47%" alt="Stats" /> &nbsp;
  <img src="./assets/quiz_page.png" width="47%" alt="Quiz" />
  <br><br>
  <img src="./assets/light_mode.png" width="47%" alt="Light Mode" />
</div>

<br>

<div align="center">
  <h3>Mobile Ansicht</h3>
  <img src="./assets/map_mobile.jpg" height="400" alt="Mobile Map" /> &nbsp; &nbsp; &nbsp;
  <img src="./assets/mobile.jpg" height="400" alt="Mobile Version" />
</div>

## Tech Stack

Dieses Projekt wurde komplett als moderne Frontend-App umgesetzt:

* **Frontend:** React.js, Gatsby
* **Styling:** Vanilla CSS
* **APIs:** REST Countries API
* **Libraries:** `recharts` (Datenvisualisierung), `react-simple-maps` (Interaktive Weltkarte)

## Features

* **Echtzeit-Daten:** Anbindung an die *REST Countries API* für immer aktuelle globale Daten.
* **Filter:** Such- und Filterfunktionen (nach Regionen) in Echtzeit sowie Multi-Kriterien-Sortierung (Fläche, Einwohner, Dichte).
* **Performance:** Implementierung von **Infinite Scrolling**, um Ladezeiten bei großen Datenmengen zu minimieren.
* **Datenvisualisierung:** Interaktive Weltkarte (`react-simple-maps`) und anschauliche Torten-/Balkendiagramme (`recharts`).
* **Gamification:** Ein integriertes Flaggen-Quiz mit dynamischem Punkte-System.
* **UX / UI:** Lokaler Dark/Light-Mode Toggle (`localStorage`), vollständig responsives Design (inkl. Hamburger-Menü) und ein interaktives Favoriten-System.

---
## Lokal starten

### 1. Pakete installieren
Node.js installieren
  bash: npm install

### 2. Projekt starten
Entwicklungsserver starten
  bash: npm run develop
