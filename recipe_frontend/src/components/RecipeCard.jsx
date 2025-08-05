import React from 'react';

// PUBLIC_INTERFACE
function RecipeCard({ recipe, onClick, isFavorite }) {
  return (
    <div
      className={`card recipe-card${isFavorite ? ' favorite' : ''}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${recipe.title}`}
      style={{ minHeight: '110px', cursor: 'pointer' }}
    >
      <div className="title">{recipe.title}</div>
      <div className="category">{recipe.category}</div>
      <div className="desc">{recipe.description || <i>No description</i>}</div>
      {isFavorite && (
        <div style={{
          marginTop: '7px',
          fontSize: '1.08em',
          color: 'var(--primary)',
          fontWeight: 'bold'
        }}>
          <span role="img" aria-label="Favorite">★ Saved</span>
        </div>
      )}
    </div>
  );
}

export default RecipeCard;
