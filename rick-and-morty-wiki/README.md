# 🧪 Rick and Morty Wiki

A dynamic and responsive React app that fetches and displays character data from the Rick and Morty API.

Key features include:

- Paginated 3×2 character grid (6 per page)
- Character detail page with rich info
- Light/Dark theme toggle
- Live footer clock
- Random character button

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

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
npm install
npm run dev
````

To build for production:

```bash
npm run build
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


## 🔗 Deployed Link

Live App: [https://rick-and-morty-wiki-vert.vercel.app/](https://rick-and-morty-wiki-vert.vercel.app/)

## 🪪 License
```
Happy coding!

```
