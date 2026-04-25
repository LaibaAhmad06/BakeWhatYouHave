# BakeWhatYouHave

A clean, responsive React app that helps you find recipes based on ingredients you already have at home.

---

## 📸 Preview

> Add a screenshot or screen recording of your app here.

---

## ✨ Features

- 🧅 **Ingredient Selector** — Browse and select ingredients using a searchable tag-based UI
- 🔍 **Recipe Search** — Filter recipes by name in real time
- 📊 **Smart Matching** — Recipes are scored and sorted by how many of your selected ingredients they use
- ✅ **Match Badges** — Each recipe card shows your match percentage (e.g. "75% match" or "✓ Perfect match")
- 🟢 **Ingredient Highlights** — See exactly which ingredients you have and which ones you're missing
- 📋 **Recipe Detail Modal** — View full ingredients list and step-by-step instructions in an overlay
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

---


## 🗂️ Project Structure

```
BakeWhatYouHave/
├── public/
│   └── index.html
└── src/
    ├── components/
    │   ├── IngredientSelector.jsx   # Searchable tag-based ingredient picker
    │   ├── RecipeCard.jsx           # Recipe card with match score & highlights
    │   ├── RecipeGrid.jsx           # Recipe search bar + results grid
    │   └── RecipeModal.jsx          # Full recipe detail overlay
    ├── pages/
    │   └── Home.jsx                 # Main page — owns selected ingredient state
    ├── data/
    │   ├── recipes.js               # Recipes with ingredients & instructions
    │   └── ingredients.js           # Master ingredient list
    ├── utils/
    │   └── normalize.js             # Ingredient name normalizer
    ├── App.js
    ├── index.js
    └── styles.css
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/LaibaAhmad06/BakeWhatYouHave.git

# 2. Navigate into the project folder
cd BakeWhatYouHave

# 3. Install dependencies
npm install

# 4. Start the development server
npm start
```

The app will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

---

## 🍰 Recipes Included

| # | Recipe |
|---|--------|
| 1 | Vanilla Tea Cake |
| 2 | Choco Fudge Brownies |
| 3 | Buttercream |
| 4 | Churros |
| 5 | Swiss Roll (Baked) |
| 6 | Swiss Roll (No-Bake) |
| 7 | Banana Bread |
| 8 | Chocolate Muffins |
| 9 | Chocolate Coated Strawberries |
| 10 | Cinnamon Rolls |
| 11 | Chocolate Tea Cake |
| 12 | Chocolate Chip Cookies |
| 13 | Strawberry Delight |
| 14 | Mango Delight |

---

## 🛠️ Built With

- [React 18](https://reactjs.org/) — UI library
- React Hooks — `useState`, `useEffect`, `useMemo`

---

## 🧠 How the Matching Works

1. You select ingredients from the left panel
2. Each recipe is scored: `matched ingredients ÷ total ingredients × 100`
3. Recipes with at least 1 match are shown, sorted by score (highest first)
4. Recipes with 0 matching ingredients are hidden
5. Ingredient names are normalized before comparison (e.g. `"Butter (softened) - ½ cup"` → `"butter"`) so matching is always accurate

---


---

## 🙋‍♀️ Author

**Laiba Ahmad**
- GitHub: [LaibaAhmad06]
(https://github.com/LaibaAhmad06)

