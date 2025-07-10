import React from "react";

const GameCard = ({ game }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "6px",
        padding: "10px",
        width: "220px",
        margin: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={game.image}
        alt={game.title}
        style={{
          width: "100%",
          height: "140px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
        onError={(e) => {
          if (!e.target.src.includes("via.placeholder.com")) {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/220x140?text=No+Image";
          }
        }}
      />
      <h3>{game.title}</h3>
      <p>
        {game.category} - {game.platform}
      </p>
      <p>Prezzo: €{game.price}</p>
    </div>
  );
};

export default GameCard;
