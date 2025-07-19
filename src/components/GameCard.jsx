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
        <div className="game-card game-card-loading">
          <span>Caricamento...</span>
        </div>
      );
    }
    if (error) {
      return (
        <div className="game-card game-card-error">
          <span>Errore: {error}</span>
        </div>
      );
    }

    return (
      <div className="game-card game-card-custom" onClick={handleClick}>
        <div className="game-card-image-wrapper">
          <img
            className="game-image"
            src={gameData.image}
            alt={gameData.title}
            onError={(e) => {
              if (!e.target.src.includes("via.placeholder.com")) {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/540x304?text=No+Image";
              }
            }}
          />
        </div>
        <div className="game-info game-info-custom">
          <div className="game-info-row">
            <span
              className={`game-card-compare${compareSelected ? " active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                if (onCompareToggle) onCompareToggle();
              }}
              title={
                compareSelected
                  ? "Rimuovi dalla comparazione"
                  : "Confronta questo gioco"
              }
            >
              <FaBalanceScale />
            </span>
            <div className="game-info-title-wrapper">
              <h2 className="game-info-title">{gameData.title}</h2>
            </div>
            <span
              className={`game-card-fav${isFavorite ? " active" : ""}`}
              onClick={handleFavorite}
              title={
                isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
              }
            >
              {isFavorite ? "★" : "☆"}
            </span>
          </div>
          <div className="game-info-row-bottom">
            <p className="game-info-category">{gameData.category}</p>
            <p className="game-info-price">
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
