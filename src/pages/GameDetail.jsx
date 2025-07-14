import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./GameDetail.css";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedRef = useRef(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/games/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gioco non trovato");
        return res.json();
      })
      .then((data) => {
        setGame(data.game);
        setLoading(false);
        if (!loggedRef.current) {
          console.log("DETTAGLIO GAME:", data.game);
          loggedRef.current = true;
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="game-detail">Caricamento...</div>;
  if (error) return <div className="game-detail">{error}</div>;
  if (!game) return null;

  const handleFavorite = (e) => {
    e.stopPropagation();
    const numId = Number(game.id);
    if (isFavorite(numId)) {
      removeFavorite(numId);
    } else {
      addFavorite(numId);
    }
  };

  return (
    <div className="game-detail">
      <img
        className="game-detail-image"
        src={game.image}
        alt={game.title}
        onError={(e) => {
          if (!e.target.src.includes("via.placeholder.com")) {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/320x200?text=No+Image";
          }
        }}
      />
      <div className="game-detail-info">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <h1 style={{ marginBottom: 0 }}>{game.title}</h1>
          <span
            onClick={handleFavorite}
            style={{
              fontSize: 28,
              color: isFavorite(Number(game.id)) ? "#FFD600" : "#bbb",
              cursor: "pointer",
              userSelect: "none",
              textShadow: "0 2px 8px #222",
              marginLeft: 8,
            }}
            title={
              isFavorite(Number(game.id))
                ? "Rimuovi dai preferiti"
                : "Aggiungi ai preferiti"
            }
          >
            {isFavorite(Number(game.id)) ? "★" : "☆"}
          </span>
        </div>
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
  );
};

export default GameDetail;
