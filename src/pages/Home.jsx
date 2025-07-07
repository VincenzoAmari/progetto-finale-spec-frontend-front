import React, { useEffect, useState } from "react";
// import GameCard from "../components/GameCard";

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  return (
    <div className="game-list">
      {games.length > 0 ? (
        games.map((game) => (
          <div className="game-card" key={game.id}>
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
