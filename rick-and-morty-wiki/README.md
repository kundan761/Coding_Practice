# 🧪 Rick and Morty Wiki

A dynamic and responsive React app that fetches and displays character data from the Rick and Morty API.

## Features:

- 🔍 Character gallery with image, name, species, and status
- ⏱️ Live-updating footer clock (HH:MM:SS Day Date)
- 🔄 Pagination with exactly 6 characters per page (3×2 grid)
- 🎭 Clickable character cards with detailed view in new tab
- 🌓 Light/Dark theme toggle
- 🎲 Random character button

## 📁 Folder Structure

```
/src
 ├─ components/
 │   ├─ CharacterCard.jsx
 │   ├─ ClockFooter.jsx
 │   └─ ThemeToggle.jsx
 ├─ pages/
 │   ├─ HomePage.jsx
 │   └─ CharacterDetailPage.jsx
 ├─ styles/
 │   └─ HomePage.css
 |   └─ CharacterCard.css
 |   └─ Clock.css
 |   └─ theme.css
 |   └─ CharacterDetailPage.css
 ├─ App.jsx
 ├─ index.css
 ├─ App.css
 └─ main.jsx
```

## 🔗 Deployed Link

Live App: [App Deployed Link](https://rick-and-morty-wiki-vert.vercel.app/)


## 🚀 Getting Started

### Clone the project:
```bash
git clone https://github.com/kundan761/Coding_Practice/tree/main/rick-and-morty-wiki
cd rick-and-morty-wiki
```
### Install dependencies:
```bash
npm install
```
### Run locally
```bash
npm run dev
```

## 📦 Tech Stack
- React

- Vite

- JavaScript

- CSS

- Rick and Morty REST API

## 🖼️ Home Page Image

![Home Page](./public/Screenshot%202025-05-03%20150420.png)
![Home Page Bottom](./public/Screenshot%202025-05-03%20150451.png)

## 🧠 Design Notes

* **Pagination**: All characters are fetched once and sliced into pages of 6. This allows full control over UI layout and simplifies pagination logic.

* **Responsive Design**: CSS Grid and media queries maintain a 3×2 layout on desktop, adjusting gracefully on smaller screens.

* **Routing**: Character detail pages open in new tabs using dynamic routes with `react-router-dom`.

* **Clock Component**: Reusable footer clock that updates every second and displays formatted local time and date.


## 🪪 License
```
Happy coding!

```
