import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserCollection, removeFromCollection } from '../utils/api';
import RecipeCard from '../components/RecipeCard';

function CollectionPage() {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCollection = () => {
    setLoading(true);
    fetchUserCollection()
      .then(data => setCollection((data && data.collections) || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCollection();
  }, []);

  const handleRemove = async (recipeId, e) => {
    e.stopPropagation();
    await removeFromCollection(recipeId);
    loadCollection();
  };

  return (
    <div>
      <h2>My Collection</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="recipe-grid">
          {collection.length === 0 && <div>Your collection is empty.</div>}
          {collection.map(recipe =>
            <div key={recipe.id} style={{position: 'relative'}}>
              <RecipeCard
                recipe={recipe}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                isFavorite={true}
              />
              <button
                className="favorite-btn saved"
                style={{
                  position:'absolute',top:'14px',right:'12px',
                  fontSize:'1.3em',background:'none',border:'none'
                }}
                title="Remove from My Collection"
                onClick={e => handleRemove(recipe.id, e)}
              >×</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CollectionPage;
