// src/pages/GameDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    async function fetchGame() {
      try {
        const response = await fetch(`http://localhost:3000/games/${id}`);
        if (!response.ok) throw new Error("Gioco non trovato");
        const data = await response.json();
        setGame(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGame();
  }, [id]);

  if (!game) return <p className="loading">Caricamento...</p>;

  return (
    <main className="game-detail-container">
      <h1 className="game-detail-title">{game.title}</h1>
      <img src={game.image} alt={game.title} className="game-detail-image" />
      <p className="game-detail-category">
        <strong>Categoria:</strong> {game.category}
      </p>
      <p className="game-detail-platform">
        <strong>Piattaforma:</strong> {game.platform}
      </p>
      <p className="game-detail-developer">
        <strong>Sviluppatore:</strong> {game.developer}
      </p>
      <p className="game-detail-year">
        <strong>Anno di uscita:</strong> {game.releaseYear}
      </p>
      <p className="game-detail-rating">
        <strong>Voto:</strong> {game.rating}
      </p>
      <p className="game-detail-price">
        <strong>Prezzo:</strong> €{game.price.toFixed(2)}
      </p>
      <p className="game-detail-description">{game.description}</p>
    </main>
  );
}
