import React, { useMemo, useCallback, useRef } from "react";

const GameCard = React.memo(
  ({ game, isFavorite, onFavoriteToggle, onClick }) => {
    // Memoizza il prezzo
    const priceRef = useRef("N/A");
    priceRef.current = useMemo(() => {
      if (
        typeof game.price === "number" &&
        !isNaN(game.price) &&
        game.price > 0
      ) {
        return game.price.toFixed(2);
      }
      if (
        typeof game.price === "string" &&
        !isNaN(Number(game.price)) &&
        Number(game.price) > 0
      ) {
        return Number(game.price).toFixed(2);
      }
      return "N/A";
    }, [game.price]);

    // Memoizza l'immagine
    const imageSrc = useMemo(() => {
      return game.image && typeof game.image === "string" && game.image.trim()
        ? game.image
        : "https://via.placeholder.com/220x140?text=No+Image";
    }, [game.image]);

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
          src={imageSrc}
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
        <div className="game-info">
          <h2>{game.title}</h2>
          <p>
            {game.category} - {game.platform}
          </p>
          <p>Prezzo: €{priceRef.current}</p>
        </div>
      </div>
    );
  }
);

export default GameCard;
