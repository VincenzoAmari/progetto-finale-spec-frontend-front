import React, { useCallback } from "react";
import { FaBalanceScale } from "react-icons/fa";
import "./GameCard.css";

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
        style={{ cursor: "pointer", position: "relative" }}
      >
        <img
          className="game-image"
          src={gameData.image}
          alt={gameData.title}
          onError={(e) => {
            if (!e.target.src.includes("via.placeholder.com")) {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/220x140?text=No+Image";
            }
          }}
        />
        <span
          onClick={handleFavorite}
          style={{
            position: "absolute",
            top: 10,
            right: 12,
            fontSize: 26,
            color: isFavorite ? "#FFD600" : "#bbb",
            cursor: "pointer",
            userSelect: "none",
            textShadow: "0 2px 8px #222",
          }}
          title={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          {isFavorite ? "★" : "☆"}
        </span>
        {/* Icona comparazione */}
        <span
          onClick={(e) => {
            e.stopPropagation();
            if (onCompareToggle) onCompareToggle();
          }}
          style={{
            position: "absolute",
            top: 10,
            left: 12,
            fontSize: 24,
            color: compareSelected ? "#00ffe7" : "#bbb",
            cursor: "pointer",
            userSelect: "none",
            textShadow: "0 2px 8px #222",
            background: compareSelected ? "#23272f" : "transparent",
            borderRadius: "50%",
            padding: "2px 6px",
          }}
          title={
            compareSelected
              ? "Rimuovi dalla comparazione"
              : "Confronta questo gioco"
          }
        >
          <FaBalanceScale />
        </span>
        <div className="game-info">
          <h2>{gameData.title}</h2>
          <p>{gameData.category}</p>
          <p>
            Prezzo: €
            {typeof gameData.price === "number"
              ? gameData.price.toFixed(2)
              : gameData.price}
          </p>
        </div>
      </div>
    );
  }
);

export default GameCard;
