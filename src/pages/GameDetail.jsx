import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="game-detail">Caricamento...</div>;
  if (error) return <div className="game-detail">{error}</div>;
  if (!game) return null;

  console.log("DETTAGLIO GAME:", game);

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
        <h1 style={{ marginBottom: 0 }}>{game.title}</h1>
        <p>
          <strong>ID:</strong> {game.id}
        </p>
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
