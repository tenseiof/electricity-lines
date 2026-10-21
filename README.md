# ⚡ Electricity Lines

A modern, responsive dashboard for visualizing and managing apartment electrical lines.

The application provides an interactive apartment map, color-coded electrical circuits, and individual switches for each line.

## ✨ Features

- 🗺️ Interactive apartment electrical map
- ⚡ Independent switches for each electrical line
- 🎨 Color-coded sockets and circuits
- 💡 Visual indication of enabled and disabled lines
- 🔎 Select a circuit to highlight its corresponding map markers
- 📱 Responsive layout for desktop and mobile devices
- ⚛️ Component-based React architecture

## 🛠️ Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Lucide React
- GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/tenseiof/electricity-lines.git
```

Navigate to the project directory:

```bash
cd electricity-lines
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Build

To create a production build:

```bash
npm run build
```

## 🌐 Live Demo

[View the live application](https://tenseiof.github.io/electricity-lines/)

## 📁 Project Structure

```text
src/
├── components/
│   ├── ApartmentMap.jsx
│   ├── BreakerCard.jsx
│   └── Header.jsx
├── constants/
│   └── theme.js
├── data/
│   ├── breakers.js
│   └── electricalPoints.js
├── App.jsx
├── index.css
└── main.jsx

public/
└── images/
    └── apartment-plan-mini.png
```

## 📝 Notes

This project is a front-end visualization and interaction demo. Switches update the application's UI state and do not control real electrical circuits.

---

Built with React and Vite.
