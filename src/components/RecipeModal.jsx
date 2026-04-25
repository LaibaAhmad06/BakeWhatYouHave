import React, { useEffect } from "react";
import { normalizeIngredient } from "../utils/normalize";

/**
 * RecipeModal
 * Full recipe detail view rendered as an accessible modal overlay.
 *
 * Props:
 *   recipe   – the recipe object to display
 *   selected – Set of selected ingredients (for highlighting)
 *   onClose  – fn() dismiss the modal
 */
function RecipeModal({ recipe, selected, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

// NEW

const matched = recipe.ingredients.filter((ing) => selected.has(normalizeIngredient(ing)));
const missing = recipe.ingredients.filter((ing) => !selected.has(normalizeIngredient(ing)));
  const matchPct = selected.size > 0
    ? Math.round((matched.length / recipe.ingredients.length) * 100)
    : null;

  return (
    /* Overlay — click outside to close */
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal">
        {/* Hero image */}
        <div className="modal-hero">
          <img src={recipe.image} alt={recipe.name} className="modal-hero-img" />
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          <div className="modal-hero-overlay">
            <div className="modal-tags">
              {recipe.tags.map((tag) => (
                <span key={tag} className="card-tag card-tag--light">{tag}</span>
              ))}
            </div>
            <h2 id="modal-title" className="modal-title">{recipe.name}</h2>
            {matchPct !== null && (
              <p className="modal-match">
                {matchPct === 100
                  ? "✓ You have all ingredients!"
                  : `You have ${matched.length} of ${recipe.ingredients.length} ingredients (${matchPct}%)`
                }
              </p>
            )}
          </div>
        </div>

        <div className="modal-content">
          <div className="modal-columns">
            {/* Ingredients column */}
            <section className="modal-section">
              <h3 className="section-heading">Ingredients</h3>
              <ul className="ingredient-list">
                {recipe.ingredients.map((ing) => {
                  const have = selected.size > 0 && selected.has(ing);
                  const lack = selected.size > 0 && !selected.has(ing);
                  return (
                    <li
                      key={ing}
                      className={`ingredient-item ${have ? "ingredient-item--have" : lack ? "ingredient-item--missing" : ""}`}
                    >
                      <span className="ingredient-dot" />
                      <span className="ingredient-name">{ing}</span>
                      {have && <span className="ingredient-badge have">✓</span>}
                      {lack && <span className="ingredient-badge missing">need</span>}
                    </li>
                  );
                })}
              </ul>

              {/* Summary chips when ingredients are selected */}
              {selected.size > 0 && (
                <div className="modal-summary">
                  <div className="progress-bar-wrapper">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${matchPct}%` }}
                    />
                  </div>
                  <p className="progress-label">
                    {matched.length} / {recipe.ingredients.length} ingredients on hand
                  </p>
                </div>
              )}
            </section>

            {/* Instructions column */}
            <section className="modal-section">
              <h3 className="section-heading">Instructions</h3>
              <ol className="instruction-list">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="instruction-item">
                    <span className="step-number">{i + 1}</span>
                    <p className="step-text">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;
