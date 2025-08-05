/**
 * API utility for calling backend REST endpoints.
 */
const API_BASE =
  import.meta.env.PUBLIC_BACKEND_URL?.replace(/\/$/, '') || '/api';

// Returns json, throws if !ok
async function apiFetch(path, opts = {}) {
  const resp = await fetch(API_BASE + path, opts);
  if (!resp.ok) throw new Error((await resp.text()) || 'API error');
  return resp.json();
}

// Recipes
export async function fetchRecipes({ q = '', category = '' } = {}) {
  const query = [];
  if (q) query.push(`q=${encodeURIComponent(q)}`);
  if (category) query.push(`category=${encodeURIComponent(category)}`);
  const qs = query.length ? '?' + query.join('&') : '';
  return apiFetch('/recipes' + qs);
}

export async function fetchRecipeDetail(recipeId) {
  return apiFetch(`/recipes/${recipeId}`);
}

export async function fetchCategories() {
  return apiFetch('/categories');
}
export async function fetchRecipesByCategory(category) {
  return apiFetch(`/categories/${encodeURIComponent(category)}`);
}

// Ingredients & instructions
export async function fetchIngredients(recipeId) {
  return apiFetch(`/recipes/${recipeId}/ingredients`);
}
export async function fetchInstructions(recipeId) {
  return apiFetch(`/recipes/${recipeId}/instructions`);
}

// User collection
// For demo, uses localStorage for user_id; in production, use proper auth system
function getUserId() {
  let uid = localStorage.getItem('re_userid');
  if (!uid) {
    uid = 'user-' + Math.floor(Math.random() * 1e10);
    localStorage.setItem('re_userid', uid);
  }
  return uid;
}
export function getCurrentUserId() {
  return getUserId();
}

export async function fetchUserCollection() {
  const userId = getUserId();
  return apiFetch(`/users/${userId}/collections`);
}

export async function addToCollection(recipeId) {
  const userId = getUserId();
  return apiFetch(`/users/${userId}/collections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipe_id: recipeId }),
  });
}
export async function removeFromCollection(recipeId) {
  const userId = getUserId();
  return apiFetch(`/users/${userId}/collections/${recipeId}`, {
    method: 'DELETE'
  });
}
