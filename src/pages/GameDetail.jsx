import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Navbar from "../components/Navbar";
import "./GameDetail.css";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loggedRef = useRef(false);
  const { isFavorite, addFavorite, removeFavorite } = useGlobal();

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
        if (!loggedRef.current) {
          console.log("DETTAGLIO GAME:", data.game);
          loggedRef.current = true;
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <>
        <Navbar />
        <div className="game-detail">Caricamento...</div>
      </>
    );
  if (error)
    return (
      <>
        <Navbar />
        <div className="game-detail">{error}</div>
      </>
    );
  if (!game) return null;

  const handleFavorite = (e) => {
    e.stopPropagation();
    const numId = Number(game.id);
    if (isFavorite(numId)) {
      removeFavorite(numId);
    } else {
      addFavorite(numId);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #23272f 60%, #181c24 100%)",
          padding: 0,
        }}
      >
        <div
          className="game-detail"
          style={{
            maxWidth: "1920px",
            width: "90vw",
            minHeight: "80vh",
            background: "linear-gradient(135deg, #23272f 60%, #181c24 100%)",
            borderRadius: "32px",
            boxShadow: "0 12px 48px #00ffe744",
            padding: "96px 80px 80px 80px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#fff",
            justifyContent: "center",
          }}
        >
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <img
              className="game-detail-image"
              src={game.image}
              alt={game.title}
              style={{
                width: "1000px",
                maxWidth: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "24px",
                border: "4px solid #00ffe7",
                background: "#222",
                boxShadow: "0 4px 24px #00ffe733",
              }}
              onError={(e) => {
                if (!e.target.src.includes("via.placeholder.com")) {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/1000x600?text=No+Image";
                }
              }}
            />
          </div>
          <div
            className="game-detail-info"
            style={{
              width: "1000px",
              maxWidth: "100%",
              margin: "40px auto 0 auto",
              padding: "32px 24px",
              fontSize: "1.6rem",
              textAlign: "left",
              background: "rgba(0,0,0,0.2)",
              borderRadius: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <h1
                style={{ marginBottom: 0, fontSize: "3rem", color: "#00ffe7" }}
              >
                {game.title}
              </h1>
              <span
                onClick={handleFavorite}
                style={{
                  fontSize: "2.2rem",
                  color: isFavorite(Number(game.id)) ? "#FFD600" : "#bbb",
                  cursor: "pointer",
                  userSelect: "none",
                  textShadow: "0 2px 8px #222",
                  marginLeft: 16,
                }}
                title={
                  isFavorite(Number(game.id))
                    ? "Rimuovi dai preferiti"
                    : "Aggiungi ai preferiti"
                }
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
      </div>
    </>
  );
};

export default GameDetail;
