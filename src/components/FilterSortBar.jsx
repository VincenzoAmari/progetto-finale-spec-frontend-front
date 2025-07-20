import React from "react";
import "./FilterSortBar.css";
import { FaBalanceScale } from "react-icons/fa";
import GameList from "./GameList";

const FilterSortBar = ({
  category,
  setCategory,
  categories,
  tripleCompare,
  setTripleCompare,
  isFavorite,
  addFavorite,
  removeFavorite,
  compareGames,
  handleCompareToggle,
  navigate,
}) => {
  const [sortPriceAsc, setSortPriceAsc] = React.useState(true);
  const [sortAlphaAsc, setSortAlphaAsc] = React.useState(false);
  const [fetchedGames, setFetchedGames] = React.useState([]);

  // Funzione per ordinare i giochi
  const getSortedGames = () => {
    if (!fetchedGames || fetchedGames.length === 0) return [];
    let arr = [...fetchedGames];
    if (sortAlphaAsc) {
      arr.sort((a, b) => {
        if (!a.title || !b.title) return 0;
        return a.title.localeCompare(b.title);
      });
    } else {
      arr.sort((a, b) => {
        const priceA =
          typeof a.price === "number" ? a.price : parseFloat(a.price);
        const priceB =
          typeof b.price === "number" ? b.price : parseFloat(b.price);
        return sortPriceAsc ? priceA - priceB : priceB - priceA;
      });
    }
    return arr;
  };

  // Gestione click sort
  const handleSortPriceClick = () => {
    setSortPriceAsc((prev) => !prev);
    setSortAlphaAsc(false);
  };
  const handleSortAlphaClick = () => {
    setSortAlphaAsc((prev) => !prev);
    setSortPriceAsc(false);
  };

  React.useEffect(() => {
    // Chiamata al backend per ottenere solo il campo price di ogni gioco
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then(async (data) => {
        // Per ogni gioco, prendi il dettaglio e salva tutti i campi utili
        const gamesWithDetails = await Promise.all(
          data.map(async (g) => {
            try {
              const res = await fetch(`http://localhost:3001/games/${g.id}`);
              if (!res.ok) return g;
              const detail = await res.json();
              // Unisci tutti i campi della lista e del dettaglio
              return { ...g, ...detail.game };
            } catch {
              return g;
            }
          })
        );
        setFetchedGames(gamesWithDetails);
        console.log("LOG giochi dal backend:", gamesWithDetails);
      })
      .catch(() => console.log("Errore nel recupero dei prezzi"));
  }, []);
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
            {/* Bottone toggle prezzo */}
            <button
              className={`sort-btn${sortPriceAsc ? "" : " active"}`}
              onClick={handleSortPriceClick}
              title={sortPriceAsc ? "Prezzo crescente" : "Prezzo decrescente"}
            >
              {sortPriceAsc ? "Prezzo ↑" : "Prezzo ↓"}
            </button>
            {/* Bottone sort alfabetico */}
            <button
              className={`sort-btn${sortAlphaAsc ? " active" : ""}`}
              onClick={handleSortAlphaClick}
              title={sortAlphaAsc ? "Ordina A-Z" : "Ordina Z-A"}
            >
              {sortAlphaAsc ? "A → Z" : "Z → A"}
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
        games={getSortedGames()}
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
