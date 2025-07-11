import React, { useCallback } from "react";
import { FaBalanceScale } from "react-icons/fa";

const GameCard = React.memo(
  ({
    game,
    isFavorite,
    onFavoriteToggle,
    onClick,
    compareSelected,
    onCompareToggle,
  }) => {
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

    return (
      <div
        className="game-card"
        onClick={handleClick}
        style={{ cursor: "pointer", position: "relative" }}
      >
        <img
          className="game-image"
          src={game.image}
          alt={game.title}
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
          <h2>{game.title}</h2>
          <p>
            {game.category} - {game.platform}
          </p>
          <p>
            Prezzo: €
            {typeof game.price === "number"
              ? game.price.toFixed(2)
              : game.price}
          </p>
        </div>
      </div>
    );
  }
);

export default GameCard;
