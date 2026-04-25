import React, { useState } from "react";
import allIngredients from "../data/ingredients";

/**
 * IngredientSelector
 * Left-panel component for browsing and selecting ingredients.
 * Props:
 *   selected   – Set of currently selected ingredient strings
 *   onToggle   – fn(ingredient: string) called when a tag is clicked
 *   onClear    – fn() resets all selections
 */
function IngredientSelector({ selected, onToggle, onClear }) {
  const [search, setSearch] = useState("");

  const filtered = allIngredients.filter((ing) =>
    ing.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="ingredient-panel">
      <div className="panel-header">
        <h2 className="panel-title">Ingredients</h2>
        {selected.size > 0 && (
          <button className="btn-ghost" onClick={onClear}>
            Clear all ({selected.size})
          </button>
        )}
      </div>

      {/* Ingredient search */}
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search ingredients…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            className="search-clear"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Tag grid */}
      <div className="tag-grid">
        {filtered.length === 0 ? (
          <p className="empty-msg">No ingredients found.</p>
        ) : (
          filtered.map((ing) => {
            const active = selected.has(ing);
            return (
              <button
                key={ing}
                className={`tag ${active ? "tag--active" : ""}`}
                onClick={() => onToggle(ing)}
                aria-pressed={active}
              >
                {active && <span className="tag-check">✓</span>}
                {ing}
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}

export default IngredientSelector;
