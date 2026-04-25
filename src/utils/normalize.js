// Strips quantity info and lowercases for consistent matching
// e.g. "Butter (softened)  -  ½ cup"  →  "butter"
//      "Fresh strawberries  -  400g"   →  "fresh strawberries"

export function normalizeIngredient(str) {
  return str
    .split("-")[0]        // remove everything after " - "
    .replace(/\(.*?\)/g, "") // remove parenthetical notes like (softened)
    .trim()
    .toLowerCase();
}