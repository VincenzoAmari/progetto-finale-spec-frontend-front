import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Navbar from "../components/Navbar";

const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
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
      <Navbar search={search} setSearch={setSearch} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 90,
          marginBottom: 20,
        }}
      >
        <select
          className="form-select"
          style={{ maxWidth: 300, minWidth: 120 }}
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
      <div className="game-list">
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <div
              className="game-card"
              key={game.id}
              onClick={() => navigate(`/games/${game.id}`)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <img
                className="game-image"
                src={
                  game.image && !game.image.startsWith("/")
                    ? `/immagini/${game.image}`
                    : game.image
                }
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
              <div
                className="game-info"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <h2 style={{ margin: 0 }}>{game.title}</h2>
                  <p style={{ margin: 0 }}>{game.category}</p>
                </div>
                <div style={{ flex: 1 }} />
                <div
                  style={{
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#FFD600",
                    fontSize: 18,
                  }}
                >
                  €{game.price}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nessun gioco trovato.</p>
        )}
      </div>
    </>
  );
};

export default Home;
