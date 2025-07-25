import { useState, memo } from "react";
import "./FilterSortBar.css";
import {
  FaBalanceScale,
  FaEuroSign,
  FaArrowUp,
  FaArrowDown,
  FaChevronDown,
} from "react-icons/fa";
import GameList from "./GameList";

// FilterSortBar: barra per filtrare, ordinare e attivare la modalità confronto giochi
const FilterSortBar = memo(
  ({
    games, // Array di giochi già filtrati da Home
    category, // Categoria selezionata
    setCategory, // Funzione per cambiare categoria
    categories, // Array di tutte le categorie
    tripleCompare, // Booleano: se la modalità confronto triplo è attiva
    setTripleCompare, // Funzione per attivare/disattivare confronto triplo
    isFavorite, // Funzione per sapere se un gioco è nei preferiti
    addFavorite, // Funzione per aggiungere ai preferiti
    removeFavorite, // Funzione per rimuovere dai preferiti
    compareGames, // Array di id giochi selezionati per confronto
    handleCompareToggle, // Funzione per toggle confronto
    navigate, // Funzione di navigazione (router)
  }) => {
    const [sortPriceAsc, setSortPriceAsc] = useState(true);
    const [sortAlphaAsc, setSortAlphaAsc] = useState(true);
    const [selectOpen, setSelectOpen] = useState(false);

    // Ordina i giochi in base a sort selezionato
    const getSortedGames = () => {
      if (!games || games.length === 0) return [];
      let arr = category
        ? games.filter((g) => g.category === category)
        : [...games];
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
          if (isNaN(priceA)) return 1;
          if (isNaN(priceB)) return -1;
          return sortPriceAsc ? priceA - priceB : priceB - priceA;
        });
      }
      return arr;
    };

    // Gestione click sort prezzo
    const handleSortPriceClick = () => {
      setSortPriceAsc((prev) => !prev);
      setSortAlphaAsc(false);
    };
    // Gestione click sort alfabetico
    const handleSortAlphaClick = () => {
      setSortAlphaAsc((prev) => !prev);
      setSortPriceAsc(false);
    };

    // Render della barra filtri e della lista giochi
    return (
      <>
        <div className="filter-sort-bar-sticky">
          <div className="filter-sort-bar-flex">
            {/* Select categoria */}
            <div
              className="filter-sort-bar-select-wrapper"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <select
                className="form-select filter-sort-bar-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                onFocus={() => setSelectOpen(true)}
                onBlur={() => setSelectOpen(false)}
                onClick={() => {
                  setSelectOpen((prev) => !prev);
                }}
              >
                <option value="">Tutti i generi</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <span className={`select-chevron${selectOpen ? " open" : ""}`}>
                <FaChevronDown />
              </span>
            </div>
            {/* Bottoni ordinamento e confronto */}
            <div className="filter-sort-bar-btn-group">
              {/* Bottone toggle prezzo */}
              <button
                className={`sort-btn sort-btn-price${
                  sortPriceAsc ? "" : " active"
                }`}
                onClick={handleSortPriceClick}
                title={sortPriceAsc ? "Prezzo crescente" : "Prezzo decrescente"}
              >
                <FaEuroSign
                  style={{
                    fontSize: 18,
                    marginRight: 4,
                    color: sortPriceAsc ? "#00ffe7" : "#00ffe7",
                  }}
                />
                {sortPriceAsc ? (
                  <FaArrowUp style={{ fontSize: 16, color: "#00ffe7" }} />
                ) : (
                  <FaArrowDown style={{ fontSize: 16, color: "#00ffe7" }} />
                )}
              </button>
              {/* Bottone sort alfabetico */}
              <button
                className={`sort-btn sort-btn-alpha${
                  sortAlphaAsc ? " active" : ""
                }`}
                onClick={handleSortAlphaClick}
                title={sortAlphaAsc ? "Ordina A-Z" : "Ordina Z-A"}
              >
                {sortAlphaAsc ? (
                  <span
                    style={{ color: "#00ffe7", fontWeight: 700, fontSize: 17 }}
                  >
                    A<span style={{ fontSize: 13 }}>z</span>
                  </span>
                ) : (
                  <span
                    style={{ color: "#00ffe7", fontWeight: 700, fontSize: 17 }}
                  >
                    Z<span style={{ fontSize: 13 }}>a</span>
                  </span>
                )}
              </button>
              {/* Triple compare */}
              <button
                className={`sort-btn triple-btn${
                  tripleCompare ? " active" : ""
                }`}
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
        {/* Lista giochi filtrata e ordinata */}
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
      </>
    );
  }
);

export default FilterSortBar;
