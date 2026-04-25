import React, { useState, useMemo } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";
import allRecipes from "../data/recipes";
import { normalizeIngredient } from "../utils/normalize";


/**
 * RecipeGrid
 * Main content area: recipe search bar + results grid.
 *
 * Props:
 *   selected – Set of selected ingredient strings
 */
function RecipeGrid({ selected }) {
  const [recipeSearch, setRecipeSearch] = useState("");
  const [activeRecipe, setActiveRecipe] = useState(null);

  /**
   * Scoring & filtering logic:
   * 1. If a recipe-name search is active, filter by name.
   * 2. If ingredients are selected, score each recipe by how many
   *    selected ingredients it uses, then sort by score descending.
   * 3. Recipes with 0 matching ingredients (when some are selected)
   *    are hidden.
   */
  const displayedRecipes = useMemo(() => {
    let results = allRecipes;

    // Filter by recipe name search
    if (recipeSearch.trim()) {
      const q = recipeSearch.toLowerCase();
      results = results.filter((r) => r.name.toLowerCase().includes(q));
    }

    if (selected.size === 0) return results;

    // Score and filter
    return results
      .map((recipe) => {
        const matchCount = recipe.ingredients.filter((ing) =>
          selected.has(normalizeIngredient(ing))
        ).length;
        return { ...recipe, matchCount };
      })
      .filter((r) => r.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);
  }, [selected, recipeSearch]);

  const hasFilters = selected.size > 0 || recipeSearch.trim();

  return (
    <main className="recipe-main">
      {/* Recipe search bar */}
      <div className="recipe-search-wrapper">
        <span className="search-icon">🍽️</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search recipes by name…"
          value={recipeSearch}
          onChange={(e) => setRecipeSearch(e.target.value)}
        />
        {recipeSearch && (
          <button
            className="search-clear"
            onClick={() => setRecipeSearch("")}
            aria-label="Clear recipe search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Results header */}
      <div className="results-header">
        <p className="results-count">
          {displayedRecipes.length === 0
            ? "No recipes found"
            : `${displayedRecipes.length} recipe${displayedRecipes.length !== 1 ? "s" : ""}${
                selected.size > 0 ? ` matching ${selected.size} ingredient${selected.size !== 1 ? "s" : ""}` : ""
              }`}
        </p>
        {selected.size > 0 && (
          <div className="selected-pills">
            {[...selected].map((ing) => (
              <span key={ing} className="selected-pill">{ing}</span>
            ))}
          </div>
        )}
      </div>

      {/* Empty state */}
      {displayedRecipes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🥗</div>
          <h3>No recipes found</h3>
          <p>
            {hasFilters
              ? "Try selecting different ingredients or changing your search."
              : "Start by selecting ingredients on the left."}
          </p>
        </div>
      )}

      {/* Recipe cards grid */}
      <div className="recipe-grid">
        {displayedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            selected={selected}
            onClick={() => setActiveRecipe(recipe)}
          />
        ))}
      </div>

      {/* Detail modal */}
      {activeRecipe && (
        <RecipeModal
          recipe={activeRecipe}
          selected={selected}
          onClose={() => setActiveRecipe(null)}
        />
      )}
    </main>
  );
}

export default RecipeGrid;
