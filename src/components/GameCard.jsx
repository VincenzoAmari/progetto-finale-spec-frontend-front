import React from "react";

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img
        src={game.image}
        alt={game.title}
        className="game-image"
        onError={(e) => {
          if (!e.target.src.includes("via.placeholder.com")) {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/220x140?text=No+Image";
          }
        }}
      />
      <div className="game-info">
        <h2>{game.title}</h2>
        <p>
          {game.category} - {game.platform}
        </p>
        <p>Prezzo: €{game.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default GameCard;
