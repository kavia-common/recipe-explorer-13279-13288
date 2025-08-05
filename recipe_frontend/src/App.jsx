import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import CollectionPage from './pages/CollectionPage';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<RecipeListPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/collections" element={<CollectionPage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
