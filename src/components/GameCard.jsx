import React from "react";

const GameCard = ({ game }) => {
  // Se il percorso non inizia con '/', aggiungi '/immagini/'
  const imageSrc =
    game.image && !game.image.startsWith("/")
      ? `/immagini/${game.image}`
      : game.image;

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
        src={imageSrc}
        alt={game.title}
        style={{
          width: "100%",
          height: "140px",
          objectFit: "cover",
          borderRadius: "6px",
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/220x140?text=No+Image";
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
