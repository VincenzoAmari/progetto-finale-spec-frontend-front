// src/pages/Home.jsx /// fetch per collegamento al back
import React, { useEffect, useState } from "react";

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("http://localhost:3001/games");
        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Dati ricevuti:", data);
        setGames(data);
      } catch (error) {
        console.error("Errore nel fetch dei giochi:", error);
      }
    }
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Giochi Indie</h1>
      {games.length === 0 ? (
        <p>Caricamento in corso...</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.title}>
              <h2>{game.title}</h2>
              <p>
                {game.category} - {game.platform}
              </p>
              <p>{game.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
