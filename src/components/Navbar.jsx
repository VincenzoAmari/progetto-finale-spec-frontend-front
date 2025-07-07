import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const Navbar = () => {
  const { favorites } = useFavorites();
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark px-3"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
    >
      <div
        className="container-fluid d-flex align-items-center justify-content-between"
        style={{ gap: 0 }}
      >
        {/* Sinistra: nome sito e tasto home */}
        <div className="d-flex align-items-center" style={{ minWidth: 120 }}>
          {location.pathname !== "/" && (
            <Link
              to="/"
              className="btn btn-link text-info fw-bold me-2 p-0"
              style={{ fontSize: 18, textDecoration: "none" }}
            >
              ⬅ Home
            </Link>
          )}
          <h2
            className="mb-0"
            style={{
              fontFamily: "Orbitron, Arial, sans-serif",
              color: "#00ffe7",
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            IndieGogo
          </h2>
        </div>
        {/* Centro: barra di ricerca */}
        <div className="mx-auto w-50 d-flex justify-content-center align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Cerca giochi..."
            style={{
              minWidth: 120,
              maxWidth: 400,
              fontSize: 17,
              background: "#23272f",
              color: "#fff",
              border: "1px solid #00ffe7",
            }}
          />
        </div>
        {/* Destra: stella preferiti */}
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
