import React, { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, isFavorite, addFavorite, removeFavorite } = useGlobal();
  const [favoriteGames, setFavoriteGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all favorite games from backend
    if (favorites.length === 0) {
      setFavoriteGames([]);
      return;
    }
    Promise.all(
      favorites.map((id) =>
        fetch(`http://localhost:3001/games/${id}`)
          .then((res) => {
            if (!res.ok) throw new Error("Gioco non trovato");
            return res.json();
          })
          .then((data) => data.game)
          .catch(() => null)
      )
    ).then((games) => {
      setFavoriteGames(games.filter((g) => g));
    });
  }, [favorites]);

  const handleFavorite = (e, id) => {
    e.stopPropagation();
    const numId = Number(id);
    if (isFavorite(numId)) {
      removeFavorite(numId);
    } else {
      addFavorite(numId);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: 80, textAlign: "center" }}>
        <h1
          style={{
            color: "#00ffe7",
            fontFamily: "Orbitron, Arial, sans-serif",
            fontWeight: 700,
            fontSize: 32,
            marginBottom: 32,
          }}
        >
          Preferiti
        </h1>
        {favoriteGames.length === 0 ? (
          <div style={{ color: "#fff", fontSize: 22, marginTop: 60 }}>
            Nessun gioco preferito.
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            {favoriteGames.map((game) => (
              <div
                key={game.id}
                className="game-detail"
                style={{
                  width: "100%",
                  maxWidth: 700,
                  background: "#181a20",
                  borderRadius: 16,
                  boxShadow: "0 2px 16px #000a",
                  padding: 0,
                  display: "flex",
                  flexDirection: "row",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/games/${game.id}`)}
              >
                <img
                  className="game-detail-image"
                  src={game.image}
                  alt={game.title}
                  style={{
                    width: 320,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: "16px 0 0 16px",
                    background: "#23272f",
                  }}
                  onError={(e) => {
                    if (!e.target.src.includes("via.placeholder.com")) {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/320x200?text=No+Image";
                    }
                  }}
                />
                <div
                  className="game-detail-info"
                  style={{ flex: 1, padding: "24px 32px", textAlign: "left" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 8,
                    }}
                  >
                    <h2
                      style={{ marginBottom: 0, color: "#fff", fontSize: 28 }}
                    >
                      {game.title}
                    </h2>
                    <span
                      onClick={(e) => handleFavorite(e, game.id)}
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
                      onClickCapture={(e) => handleFavorite(e, game.id)}
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
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
