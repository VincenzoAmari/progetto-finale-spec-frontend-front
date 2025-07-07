import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

const Home = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

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
    <div className="game-list">
      {games.length > 0 ? (
        games.map((game) => (
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
        ))
      ) : (
        <p>Caricamento giochi...</p>
      )}
    </div>
  );
};

export default Home;
