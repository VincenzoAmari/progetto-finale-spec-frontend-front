import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nella risposta del server");
        }
        return res.json();
      })
      .then((data) => setGames(data))
      .catch((err) => {
        console.error("Errore nel fetch:", err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <h1>Lista Giochi</h1>
        {games.length === 0 ? (
          <p>Nessun gioco trovato.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {games.map((game) => (
              <div
                key={game.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "1rem",
                  width: "200px",
                }}
              >
                <img
                  src={game.image}
                  alt={game.title}
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <h3>{game.title}</h3>
                <p>{game.category}</p>
                <p>
                  <strong>{game.price}€</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
