# WorldStat Explorer: Global Data & Statistics

[![Live Demo](https://img.shields.io/badge/Live_Demo-Anschauen-success?style=for-the-badge)](https://thriving-mermaid-f3f6cd.netlify.app/)

Eine interaktive, performante React-Single-Page-Application zur Erkundung globaler Länderdaten, Statistiken und Flaggen. Der Fokus lag auf sauberem State-Management, asynchronem Data-Fetching und einer responsiven UI.

<p align="center"> 
  <img src="./assets/startseite.png" width="48%" alt="Dashboard" /> 
  <img src="./assets/filterfunktionen.png" width="48%" alt="Filter" />
  <img src="./assets/stats_page.png" width="48%" alt="Stats" />
  <img src="./assets/quiz_page.png" width="48%" alt="Quiz" />
  <img src="./assets/light_mode.png" width="48%" alt="Light Mode" />
  <img src="./assets/map_mobile.jpg" width="48%" alt="Mobile vers Map" />
  <img src="./assets/mobile.jpg" width="48%" alt="Mobile Version" />
</p>

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


