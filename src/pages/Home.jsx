import React, { useState } from "react";
import IngredientSelector from "../components/IngredientSelector";
import RecipeGrid from "../components/RecipeGrid";

/**
 * Home
 * The single page of the app. Owns `selected` ingredient state and passes
 * it down to both the selector panel and the recipe grid.
 */
function Home() {
  // Set<string> — all currently selected ingredient names
  const [selected, setSelected] = useState(new Set());

  // Toggle a single ingredient on/off
  const handleToggle = (ingredient) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(ingredient)) {
        next.delete(ingredient);
      } else {
        next.add(ingredient);
      }
      return next;
    });
  };

  // Clear all selections
  const handleClear = () => setSelected(new Set());

  return (
    <div className="layout">
      <IngredientSelector
        selected={selected}
        onToggle={handleToggle}
        onClear={handleClear}
      />
      <RecipeGrid selected={selected} />
    </div>
  );
}

export default Home;
