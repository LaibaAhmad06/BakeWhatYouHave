import React from "react";
import { normalizeIngredient } from "../utils/normalize";

/**
 * RecipeCard
 * Displays a single recipe in the results grid.
 *
 * Props:
 *   recipe         – full recipe object
 *   selected       – Set of selected ingredients (for matching logic)
 *   onClick        – fn() opens the detail view for this recipe
 */
function RecipeCard({ recipe, selected, onClick }) {
  const totalIngredients = recipe.ingredients.length;

  // Which selected ingredients match this recipe?
// NEW

const matched = selected.size > 0
  ? recipe.ingredients.filter((ing) => selected.has(normalizeIngredient(ing)))
  : [];

const missing = selected.size > 0
  ? recipe.ingredients.filter((ing) => !selected.has(normalizeIngredient(ing)))
  : recipe.ingredients;

  const matchCount = matched.length;
  const matchPct = selected.size > 0
    ? Math.round((matchCount / totalIngredients) * 100)
    : null;

  // Badge color based on match percentage
  const badgeClass =
    matchPct === null
      ? "badge--neutral"
      : matchPct === 100
      ? "badge--perfect"
      : matchPct >= 60
      ? "badge--good"
      : matchPct >= 30
      ? "badge--fair"
      : "badge--low";

  return (
    <article className="recipe-card" onClick={onClick} tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      role="button" aria-label={`View ${recipe.name}`}
    >
      {/* Recipe image */}
      <div className="card-image-wrapper">
        <img
          className="card-image"
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
        />
        {matchPct !== null && (
          <span className={`match-badge ${badgeClass}`}>
            {matchPct === 100 ? "✓ Perfect match" : `${matchPct}% match`}
          </span>
        )}
      </div>

      <div className="card-body">
        {/* Tags */}
        <div className="card-tags">
          {recipe.tags.map((tag) => (
            <span key={tag} className="card-tag">{tag}</span>
          ))}
        </div>

        <h3 className="card-title">{recipe.name}</h3>

        {/* Ingredient summary */}
        {selected.size > 0 ? (
          <div className="card-ingredient-summary">
            {/* Matched ingredients highlighted */}
            {matched.length > 0 && (
              <p className="ingredient-line">
                <span className="label have">Have:</span>{" "}
                {matched.map((ing, i) => (
                  <span key={ing} className="ing ing--have">
                    {ing}{i < matched.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
            {/* Missing ingredients */}
            {missing.length > 0 && (
              <p className="ingredient-line">
                <span className="label missing">Need:</span>{" "}
                {missing.map((ing, i) => (
                  <span key={ing} className="ing ing--missing">
                    {ing}{i < missing.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
          </div>
        ) : (
          <p className="card-ingredient-count">
            {totalIngredients} ingredients
          </p>
        )}

        <button className="btn-view">View Recipe →</button>
      </div>
    </article>
  );
}

export default RecipeCard;
