import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchRecipeDetail,
  fetchIngredients,
  fetchInstructions,
  fetchUserCollection,
  addToCollection,
  removeFromCollection
} from '../utils/api';

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let stop = false;
    setLoading(true);
    fetchRecipeDetail(id).then(setRecipe).finally(() => setLoading(false));
    fetchIngredients(id).then(setIngredients).catch(()=>{});
    fetchInstructions(id).then(setInstructions).catch(()=>{});
    fetchUserCollection().then(data => {
      if (data && data.collections) {
        setFavorite(!!data.collections.find(r => r.id === id));
      }
    });
    return () => { stop = true; }
  }, [id]);

  const handleFavorite = async () => {
    setSaving(true);
    if (favorite) {
      await removeFromCollection(id);
      setFavorite(false);
    } else {
      await addToCollection(id);
      setFavorite(true);
    }
    setSaving(false);
  };

  if (loading || !recipe) return <div>Loading...</div>;

  return (
    <div>
      <div className="detail-header">
        <div>
          <span className="detail-title">{recipe.title}</span>
          <div style={{ color: 'var(--secondary)', fontWeight: 500, marginTop: '1px' }}>
            {recipe.category}
          </div>
        </div>
        <button
          className={`favorite-btn${favorite ? ' saved' : ''}`}
          onClick={handleFavorite}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          title={favorite ? "Remove from My Collection" : "Add to My Collection"}
          disabled={saving}
        >{favorite ? '★' : '☆'}</button>
      </div>
      <p style={{ marginTop: '9px', fontSize: '1.11em' }}>
        {recipe.description || <i>No description</i>}
      </p>
      <h4>Ingredients</h4>
      <ul className="ingredients-list">
        {ingredients.length ? ingredients.map((ing, i) =>
          <li key={i}>{ing.amount} {ing.name}</li>
        ) : <li>No ingredients listed.</li>}
      </ul>
      <h4>Instructions</h4>
      <ol className="instructions-list">
        {instructions.length ? instructions.map((step, i) =>
          <li key={i}>{step}</li>
        ) : <li>No instructions listed.</li>}
      </ol>
    </div>
  );
}

export default RecipeDetailPage;
