import React, { useState, useMemo } from "react";
import { FaEuroSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import "./FilterSortBar.css";
import { FaBalanceScale } from "react-icons/fa";
import GameList from "./GameList";

const FilterSortBar = ({
  category,
  setCategory,
  categories,
  tripleCompare,
  setTripleCompare,
  games,
  isFavorite,
  addFavorite,
  removeFavorite,
  compareGames,
  handleCompareToggle,
  navigate,
}) => {
  const [sortType, setSortType] = useState("titleAsc");
  const [fetchedGames, setFetchedGames] = useState([]);

  // Fetch giochi dal backend una sola volta
  React.useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then(async (data) => {
        // Fetch dettagli per ogni gioco
        const detailedGames = await Promise.all(
          data.map(async (g) => {
            try {
              const res = await fetch(`http://localhost:3001/games/${g.id}`);
              if (!res.ok) return g;
              const detail = await res.json();
              return { ...g, ...detail.game };
            } catch {
              return g;
            }
          })
        );
        console.log("Giochi dal backend (dettagliati):", detailedGames);
        setFetchedGames(detailedGames);
      })
      .catch(() => setFetchedGames([]));
  }, []);

  // Scegli la fonte dati: se games è vuoto usa quelli fetchati
  const gamesToShow = games && games.length > 0 ? games : fetchedGames;

  const sortedGames = useMemo(() => {
    // Estrattore robusto del prezzo
    const getPrice = (g) => {
      if (!g) return 0;
      // Se il prezzo è un numero
      if (typeof g.price === "number") return g.price;
      // Se il prezzo è una stringa numerica
      if (typeof g.price === "string") {
        const parsed = parseFloat(g.price.replace(",", "."));
        return isNaN(parsed) ? 0 : parsed;
      }
      // Se il prezzo non esiste
      return 0;
    };

    const sortFunctions = {
      titleAsc: (a, b) => (a.title || "").localeCompare(b.title || ""),
      titleDesc: (a, b) => (b.title || "").localeCompare(a.title || ""),
      priceAsc: (a, b) => getPrice(a) - getPrice(b),
      priceDesc: (a, b) => getPrice(b) - getPrice(a),
    };

    const result = [...gamesToShow];
    const sortFn = sortFunctions[sortType] || sortFunctions.titleAsc;
    result.sort(sortFn);
    return result;
  }, [gamesToShow, sortType]);

  return (
    <React.Fragment>
      <div className="filter-sort-bar-sticky">
        <div className="filter-sort-bar-flex">
          <div className="filter-sort-bar-select-wrapper">
            <select
              className="form-select filter-sort-bar-select"
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
          <div className="filter-sort-bar-btn-group">
            {/* Toggle prezzo */}
            <button
              className={`sort-btn${
                sortType === "priceAsc" || sortType === "priceDesc"
                  ? " active"
                  : ""
              }`}
              onClick={() =>
                setSortType(sortType === "priceAsc" ? "priceDesc" : "priceAsc")
              }
              title={
                sortType === "priceAsc"
                  ? "Prezzo crescente"
                  : "Prezzo decrescente"
              }
            >
              <FaEuroSign />
              {sortType === "priceAsc" ? <FaArrowUp /> : <FaArrowDown />}
            </button>
            {/* Toggle titolo */}
            <button
              className={`sort-btn${
                sortType === "titleAsc" || sortType === "titleDesc"
                  ? " active"
                  : ""
              }`}
              onClick={() =>
                setSortType(sortType === "titleAsc" ? "titleDesc" : "titleAsc")
              }
              title={sortType === "titleAsc" ? "Ordina A-Z" : "Ordina Z-A"}
            >
              <MdTextFields />
              {sortType === "titleAsc" ? (
                <span className="sort-btn-label">A</span>
              ) : (
                <span className="sort-btn-label">Z</span>
              )}
            </button>
            {/* Triple compare */}
            <button
              className={`sort-btn triple-btn${tripleCompare ? " active" : ""}`}
              onClick={() => setTripleCompare((prev) => !prev)}
              title={
                tripleCompare
                  ? "Comparazione tripla attiva"
                  : "Comparazione doppia"
              }
            >
              <FaBalanceScale />
              <span className="sort-btn-label-x3">X3</span>
            </button>
          </div>
        </div>
      </div>
      <GameList
        games={sortedGames}
        isFavorite={isFavorite}
        addFavorite={addFavorite}
        removeFavorite={removeFavorite}
        compareGames={compareGames}
        handleCompareToggle={handleCompareToggle}
        navigate={navigate}
        tripleCompare={tripleCompare}
      />
    </React.Fragment>
  );
};

export default FilterSortBar;
