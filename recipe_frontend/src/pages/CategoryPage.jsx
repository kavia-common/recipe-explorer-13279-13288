import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipesByCategory, fetchUserCollection } from '../utils/api';
import RecipeCard from '../components/RecipeCard';

function CategoryPage() {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let stopped = false;
    setLoading(true);
    fetchRecipesByCategory(category)
      .then(data => { if (!stopped) setRecipes(data); })
      .finally(() => setLoading(false));
    fetchUserCollection()
      .then(c => setFavorites((c && c.collections) ? c.collections : []))
      .catch(() => setFavorites([]));
    return () => { stopped = true; }
  }, [category]);

  return (
    <div>
      <h2>Recipes in <span style={{color:'var(--secondary)'}}>{category}</span></h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="recipe-grid">
          {recipes.length === 0 && <div>No recipes found in this category.</div>}
          {recipes.map(recipe =>
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={!!favorites.find(f => f.id === recipe.id)}
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
