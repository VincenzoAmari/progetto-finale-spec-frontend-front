import React, { useCallback } from "react";
import { FaBalanceScale } from "react-icons/fa";
import "./GameCard.css";
import FavoriteStar from "./FavoriteStar";

const GameCard = React.memo(
  ({
    game,
    isFavorite,
    onFavoriteToggle,
    onClick,
    compareSelected,
    onCompareToggle,
  }) => {
    const [gameData, setGameData] = React.useState(game);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // Fetch dati gioco se serve
    React.useEffect(() => {
      if (game && game.id && (!game.title || !game.price)) {
        setLoading(true);
        fetch(`http://localhost:3001/games/${game.id}`)
          .then((res) => {
            if (!res.ok) throw new Error("Gioco non trovato");
            return res.json();
          })
          .then((data) => {
            setGameData(data.game);
            setError(null);
          })
          .catch((err) => {
            setError(err.message);
          })
          .finally(() => setLoading(false));
      } else {
        setGameData(game);
      }
    }, [game]);

    // Memoizza il toggle preferiti
    const handleFavorite = useCallback(
      (e) => {
        if (onFavoriteToggle) onFavoriteToggle(e);
      },
      [onFavoriteToggle]
    );

    // Memoizza il click
    const handleClick = useCallback(() => {
      if (onClick) onClick();
    }, [onClick]);

    if (loading) {
      return (
        <div
          className="game-card"
          style={{
            minHeight: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>Caricamento...</span>
        </div>
      );
    }
    if (error) {
      return (
        <div
          className="game-card"
          style={{
            minHeight: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "red",
          }}
        >
          <span>Errore: {error}</span>
        </div>
      );
    }

    return (
      <div
        className="game-card"
        onClick={handleClick}
        style={{
          cursor: "pointer",
          position: "relative",
          width: "100%",
          maxWidth: "540px",
          aspectRatio: "16/11.26",
          boxSizing: "border-box",
          overflow: "hidden",
          borderRadius: "12px",
          background: "#181a20",
          boxShadow: "0 2px 16px #000a",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "80%",
            overflow: "hidden",
            borderRadius: "12px 12px 0 0",
            position: "relative",
          }}
        >
          <img
            className="game-image"
            src={gameData.image}
            alt={gameData.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              aspectRatio: "16/9",
            }}
            onError={(e) => {
              if (!e.target.src.includes("via.placeholder.com")) {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/540x304?text=No+Image";
              }
            }}
          />
        </div>
        <div
          className="game-info"
          style={{
            position: "relative",
            height: "20%",
            minHeight: 0,
            padding: "12px 16px 8px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
              width: "100%",
            }}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (onCompareToggle) onCompareToggle();
              }}
              style={{
                fontSize: 28,
                color: compareSelected ? "#00ffe7" : "#fff",
                cursor: "pointer",
                userSelect: "none",
                textShadow: compareSelected
                  ? "0 0 8px #00ffe7, 0 0 16px #00ffe7"
                  : "0 0 8px #fff, 0 0 16px #fff",
                marginRight: 12,
              }}
              title={
                compareSelected
                  ? "Rimuovi dalla comparazione"
                  : "Confronta questo gioco"
              }
            >
              <FaBalanceScale />
            </span>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#fff",
                }}
              >
                {gameData.title}
              </h2>
            </div>
            <FavoriteStar
              active={isFavorite}
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite(e);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: 4,
            }}
          >
            <p style={{ margin: 0, fontSize: "1.15rem", color: "#bbb" }}>
              {gameData.category}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "1.15rem",
                color: "#fff",
                fontWeight: 600,
                textAlign: "right",
              }}
            >
              Prezzo: €
              {typeof gameData.price === "number"
                ? gameData.price.toFixed(2)
                : gameData.price}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
export default GameCard;
