import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ search, setSearch }) => {
  const location = useLocation();

  const showSearch = location.pathname === "/";

  // Debounce locale per la barra di ricerca
  const [localSearch, setLocalSearch] = useState(search || "");
  useEffect(() => {
    setLocalSearch(search || "");
  }, [search]);
  useEffect(() => {
    if (typeof setSearch === "function") {
      const handler = setTimeout(() => {
        setSearch(localSearch);
      }, 400);
      return () => clearTimeout(handler);
    }
  }, [localSearch, setSearch]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            <h2 className="navbar-logo-title">IndieGogo</h2>
          </Link>
        </div>

        {showSearch && (
          <div className="navbar-search-wrapper">
            <div className="navbar-search-container">
              <FaSearch className="navbar-search-icon" />
              <input
                type="text"
                className="navbar-search-input"
                placeholder="Cerca un gioco..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="navbar-favorites">
          <Link to="/favorites" className="navbar-favorites-link">
            <span className="navbar-favorites-icon" aria-label="Preferiti">
              ★
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
