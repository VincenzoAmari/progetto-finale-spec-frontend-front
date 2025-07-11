import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Navbar from "../components/Navbar";
import {
  FaEuroSign,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaBalanceScale,
} from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import GameCard from "../components/GameCard";

const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("az");
  const [compareGames, setCompareGames] = useState([]); // array di id
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  // Ricava le categorie uniche
  const categories = useMemo(() => {
    const cats = games.map((g) => g.category).filter(Boolean);
    return [...new Set(cats)];
  }, [games]);

  // Filtro giochi per ricerca e categoria
  const filteredGames = useMemo(() => {
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || game.category === category)
    );
  }, [games, search, category]);

  // Ordinamento giochi
  const sortedGames = useMemo(() => {
    const arr = [...filteredGames];
    arr.sort((a, b) => {
      // Gestione robusta del campo prezzo
      const priceA =
        a.price ?? a.prezzo ?? (a.game && (a.game.price ?? a.game.prezzo));
      const priceB =
        b.price ?? b.prezzo ?? (b.game && (b.game.price ?? b.game.prezzo));
      if (sortBy === "priceAsc") return Number(priceA) - Number(priceB);
      if (sortBy === "priceDesc") return Number(priceB) - Number(priceA);
      if (sortBy === "za") return b.title.localeCompare(a.title);
      return a.title.localeCompare(b.title);
    });
    return arr;
  }, [filteredGames, sortBy]);

  // Gestione selezione comparazione
  const handleCompareToggle = (id) => {
    setCompareGames((prev) => {
      if (prev.includes(id)) return prev.filter((gid) => gid !== id);
      if (prev.length < 2) return [...prev, id];
      return prev;
    });
  };

  // Chiudi overlay
  const handleCloseCompare = () => setCompareGames([]);

  // Ottieni i dati dei giochi selezionati
  const compared = compareGames.map((id) => games.find((g) => g.id === id));

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />
      <div className="filter-sort-bar-sticky">
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
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
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
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
        </div>
      </div>
      <div className="game-list">
        {sortedGames.length > 0 ? (
          sortedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isFavorite={isFavorite(Number(game.id))}
              onFavoriteToggle={(e) => {
                e.stopPropagation();
                const numId = Number(game.id);
                if (isFavorite(numId)) {
                  removeFavorite(numId);
                } else {
                  addFavorite(numId);
                }
              }}
              onClick={() => navigate(`/games/${game.id}`)}
              compareSelected={compareGames.includes(game.id)}
              onCompareToggle={() => handleCompareToggle(game.id)}
            />
          ))
        ) : (
          <p
            style={{
              color: "#fff",
              textAlign: "center",
              marginTop: 60,
              fontSize: 18,
            }}
          >
            Nessun gioco trovato.
          </p>
        )}
      </div>
      {/* Overlay comparazione */}
      {compareGames.length === 2 && (
        <div className="compare-overlay">
          <div className="compare-content">
            <button className="close-compare" onClick={handleCloseCompare}>
              ×
            </button>
            <div className="compare-cards">
              {compared.map((game) => (
                <div className="compare-card" key={game.id}>
                  <img
                    className="game-detail-image"
                    src={game.image}
                    alt={game.title}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "14px",
                      border: "2px solid #00ffe7",
                      background: "#222",
                      boxShadow: "0 2px 12px #00ffe733",
                    }}
                    onError={(e) => {
                      if (!e.target.src.includes("via.placeholder.com")) {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/320x200?text=No+Image";
                      }
                    }}
                  />
                  <div
                    className="game-detail-info"
                    style={{
                      padding: "18px 12px",
                      fontSize: "1.1rem",
                    }}
                  >
                    <h1
                      style={{
                        marginBottom: 0,
                        fontSize: "2rem",
                        color: "#00ffe7",
                      }}
                    >
                      {game.title}
                    </h1>
                    <p>
                      <strong>Categoria:</strong> {game.category}
                    </p>
                    <p>
                      <strong>Piattaforma:</strong> {game.platform}
                    </p>
                    <p>
                      <strong>Developer:</strong> {game.developer}
                    </p>
                    <p>
                      <strong>Anno:</strong> {game.releaseYear}
                    </p>
                    <p>
                      <strong>Voto:</strong> {game.rating}
                    </p>
                    <p>
                      <strong>Prezzo:</strong> €{game.price}
                    </p>
                    <p>
                      <strong>Descrizione:</strong> {game.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
