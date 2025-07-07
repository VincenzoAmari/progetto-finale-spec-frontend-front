import React from "react";

const GameCard = ({ game }) => {
  return (
    <div className="game-card" style={styles.card}>
      <img src={game.image} alt={game.title} style={styles.image} />
      <h3>{game.title}</h3>
      <p>
        <strong>Genere:</strong> {game.category}
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
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "8px",
    width: "250px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "1rem",
    borderRadius: "4px",
  },
};

export default GameCard;
