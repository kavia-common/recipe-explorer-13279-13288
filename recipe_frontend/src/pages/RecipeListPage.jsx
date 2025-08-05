import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchRecipes, fetchUserCollection, getCurrentUserId } from '../utils/api';
import RecipeCard from '../components/RecipeCard';

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  useEffect(() => {
    let unmounted = false;
    setLoading(true);
    fetchRecipes({ q: query })
      .then((data) => {
        if (!unmounted) setRecipes(data);
      })
      .finally(() => setLoading(false));
    fetchUserCollection()
      .then((c) => setFavorites((c && c.collections) ? c.collections : []))
      .catch(() => setFavorites([]));
    return () => { unmounted = true; };
  }, [query]);

  return (
    <div>
      <h2>Explore Recipes {query && (<span>for <q>{query}</q></span>)}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="recipe-grid">
          {recipes.length === 0 && <div>No recipes found.</div>}
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

export default RecipeListPage;
