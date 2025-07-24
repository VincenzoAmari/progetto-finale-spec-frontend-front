import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

// Navbar: barra di navigazione principale dell'app
const Navbar = ({ search, setSearch }) => {
  const location = useLocation();

  // Mostra la barra di ricerca solo nella home
  const showSearch = location.pathname === "/";

  // Stato locale per la barra di ricerca (con debounce)
  const [localSearch, setLocalSearch] = useState(search || "");
  useEffect(() => {
    setLocalSearch(search || "");
    console.log("[Navbar] search prop:", search);
  }, [search]);
  useEffect(() => {
    if (typeof setSearch === "function") {
      const handler = setTimeout(() => {
        setSearch(localSearch);
        console.log("[Navbar] setSearch(localSearch):", localSearch);
      }, 400);
      return () => clearTimeout(handler);
    }
  }, [localSearch, setSearch]);
  useEffect(() => {
    console.log("[Navbar] localSearch state:", localSearch);
  }, [localSearch]);

  // Render della navbar
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            <h2 className="navbar-logo-title">IndieGogo</h2>
          </Link>
        </div>

        {/* Barra di ricerca visibile solo in home */}
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

        {/* Link ai preferiti */}
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
