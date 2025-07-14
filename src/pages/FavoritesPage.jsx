import React, { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, isFavorite, addFavorite, removeFavorite } = useGlobal();
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  const favoriteGames = games.filter((g) => favorites.includes(Number(g.id)));

  const handleFavorite = (e, id) => {
    e.stopPropagation();
    const numId = Number(id);
    if (isFavorite(numId)) {
      removeFavorite(numId);
    } else {
      addFavorite(numId);
    }
  };

  if (favoriteGames.length === 0) {
    return (
      <div
        className="game-list"
        style={{ marginTop: 100, textAlign: "center", color: "#fff" }}
      >
        Nessun gioco preferito.
      </div>
    );
  }

  return (
    <div className="game-list">
      {favoriteGames.map((game) => (
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
            <p>{game.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesPage;
