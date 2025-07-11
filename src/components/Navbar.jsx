import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ search, setSearch }) => {
  const { favorites } = useFavorites();
  const location = useLocation();

  const showSearch =
    location.pathname === "/" || location.pathname === "/favorites";

  // Debounce locale per la barra di ricerca
  const [localSearch, setLocalSearch] = useState(search);
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(localSearch);
    }, 500);
    return () => clearTimeout(handler);
  }, [localSearch, setSearch]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark px-3"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
    >
      <div
        className="container-fluid d-flex align-items-center justify-content-between"
        style={{ gap: 0 }}
      >
        <div className="d-flex align-items-center" style={{ minWidth: 120 }}>
          <Link
            to="/"
            className="btn btn-link text-info fw-bold me-2 p-0"
            style={{
              fontSize: 22,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2
              className="mb-0"
              style={{
                fontFamily: "Orbitron, Arial, sans-serif",
                color: "#00ffe7",
                fontSize: 22,
                letterSpacing: 1,
                margin: 0,
                padding: 0,
              }}
            >
              IndieGogo
            </h2>
          </Link>
        </div>

        {showSearch && (
          <div
            className="mx-auto w-50 d-flex justify-content-center align-items-center"
            style={{ gap: 16 }}
          >
            <div style={{ position: "relative", width: 320 }}>
              <FaSearch
                style={{
                  position: "absolute",
                  left: 10,
                  top: 12,
                  color: "#00ffe7",
                  fontSize: 18,
                }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Cerca un gioco..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                style={{
                  minWidth: 120,
                  maxWidth: 400,
                  fontSize: 17,
                  background: "#23272f",
                  color: "#fff",
                  border: "1px solid #00ffe7",
                  paddingLeft: 34,
                }}
              />
            </div>
          </div>
        )}

        <div
          className="d-flex align-items-center justify-content-end"
          style={{ minWidth: 60 }}
        >
          <Link
            to="/favorites"
            className="d-flex align-items-center"
            style={{ textDecoration: "none" }}
          >
            <span
              style={{
                fontSize: 28,
                color: "#FFD600",
                marginLeft: 8,
                marginRight: 0,
                display: "inline-block",
                transition: "color 0.2s",
              }}
              aria-label="Preferiti"
            >
              ★
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
