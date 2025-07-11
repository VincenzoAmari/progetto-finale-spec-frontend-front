import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Navbar from "../components/Navbar";
import { FaEuroSign, FaArrowUp, FaArrowDown, FaSearch } from "react-icons/fa";
import { MdTextFields } from "react-icons/md";

const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("az"); // az, za, priceAsc, priceDesc
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

  const handleFavorite = (e, id) => {
    e.stopPropagation();
    const numId = Number(id);
    if (isFavorite(numId)) {
      removeFavorite(numId);
    } else {
      addFavorite(numId);
    }
  };

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
            <div
              className="game-card"
              key={game.id}
              onClick={() => navigate(`/games/${game.id}`)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <img
                className="game-image"
                src={game.image}
                alt={game.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/220x140?text=No+Image";
                }}
              />
              <span
                onClick={(e) => handleFavorite(e, game.id)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  fontSize: 26,
                  color: isFavorite(Number(game.id)) ? "#FFD600" : "#bbb",
                  cursor: "pointer",
                  userSelect: "none",
                  textShadow: "0 2px 8px #222",
                }}
                title={
                  isFavorite(Number(game.id))
                    ? "Rimuovi dai preferiti"
                    : "Aggiungi ai preferiti"
                }
              >
                {isFavorite(Number(game.id)) ? "★" : "☆"}
              </span>
              <div className="game-info">
                <h2>{game.title}</h2>
                <p>
                  {game.category} - {game.platform}
                </p>
                <p>
                  Prezzo: €
                  {game.price !== undefined
                    ? Number(game.price).toFixed(2)
                    : "N/A"}
                </p>
              </div>
            </div>
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
    </>
  );
};

export default Home;
