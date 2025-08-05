import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { fetchCategories } from '../utils/api';

function Navbar() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCategories().then((data) => setCategories(data)).catch(() => setCategories([]));
  }, []);

  // If on /categories/..., blank search field
  useEffect(() => {
    if (location.pathname.startsWith('/categories/')) setSearch('');
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?q=${encodeURIComponent(search.trim())}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <nav className="navbar" role="navigation">
      <span className="nav-logo" onClick={() => navigate(`/`)} style={{cursor: 'pointer'}}>
        <span role="img" aria-label="chef" style={{marginRight: '7px'}}>👩‍🍳</span>
        Recipe Explorer
      </span>
      <div className="nav-links">
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>
        <div style={{position: 'relative'}}>
          <NavLink className="nav-link" to="#" tabIndex={-1} aria-disabled="true" style={{pointerEvents: 'none', color:'#aaa'}}>Categories</NavLink>
          <div style={{
            position:'absolute', left:0, top:'2.0em', zIndex:2,
            background:'#fff', border:'1px solid #eee', borderRadius:'10px',
            boxShadow:'0 1px 8px #cca02111',minWidth:'150px'
          }}>
            {categories && categories.slice(0,12).map(cat =>
              <NavLink key={cat.name} className="nav-link"
                to={`/categories/${encodeURIComponent(cat.name)}`}
                style={{display:'block',padding:'6px 11px',color:'var(--primary)'}}>
                {cat.name}
              </NavLink>
            )}
          </div>
        </div>
        <NavLink className="nav-link" to="/collections">
          My Collection
        </NavLink>
      </div>
      <form className="search-bar" onSubmit={handleSearchSubmit} autoComplete="off">
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit" title="Search">
          <span role="img" aria-label="search">🔍</span>
        </button>
      </form>
    </nav>
  );
}

export default Navbar;
