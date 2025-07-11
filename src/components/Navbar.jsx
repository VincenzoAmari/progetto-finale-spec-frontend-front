import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { FaEuroSign, FaArrowUp, FaArrowDown, FaSearch } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";

const Navbar = ({
  search,
  setSearch,
  category,
  setCategory,
  sortBy,
  setSortBy,
  categories,
}) => {
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
        <div
          className="d-flex align-items-center"
          style={{
            gap: 12,
            flex: 1,
            justifyContent: "center",
            position: "relative",
          }}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          <select
            className="form-select"
            style={{ maxWidth: 180, minWidth: 100 }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Tutti i generi</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div
          className="d-flex align-items-center justify-content-end"
          style={{ minWidth: 60, gap: 10 }}
        >
          <div
            className="sort-buttons"
            style={{ display: "flex", gap: 8, alignItems: "center" }}
          >
            <button
              className={`sort-btn${sortBy === "priceAsc" ? " active" : ""}`}
              onClick={() =>
                setSortBy(sortBy === "priceAsc" ? "priceDesc" : "priceAsc")
              }
              title={
                sortBy === "priceAsc"
                  ? "Prezzo crescente"
                  : "Prezzo decrescente"
              }
              style={{
                background:
                  sortBy === "priceAsc" || sortBy === "priceDesc"
                    ? "#00ffe7"
                    : "#23272f",
                color:
                  sortBy === "priceAsc" || sortBy === "priceDesc"
                    ? "#181c24"
                    : "#00ffe7",
                border: "1.5px solid #00ffe7",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 18,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <FaEuroSign />
              {sortBy === "priceAsc" ? <FaArrowUp /> : <FaArrowDown />}
            </button>
            <button
              className={`sort-btn${
                sortBy === "az" || sortBy === "za" ? " active" : ""
              }`}
              onClick={() => setSortBy(sortBy === "az" ? "za" : "az")}
              title={sortBy === "az" ? "Ordina A-Z" : "Ordina Z-A"}
              style={{
                background:
                  sortBy === "az" || sortBy === "za" ? "#00ffe7" : "#23272f",
                color:
                  sortBy === "az" || sortBy === "za" ? "#181c24" : "#00ffe7",
                border: "1.5px solid #00ffe7",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 18,
                cursor: "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <MdTextFields />
              {sortBy === "az" ? (
                <span style={{ fontWeight: 700 }}>A</span>
              ) : (
                <span style={{ fontWeight: 700 }}>Z</span>
              )}
            </button>
          </div>
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
