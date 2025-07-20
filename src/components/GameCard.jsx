import React, { useCallback } from "react";
import { FaBalanceScale } from "react-icons/fa";
import "./GameCard.css";
import FavoriteStar from "./FavoriteStar";
import CompareScale from "./CompareScale";

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
      const fetchGameData = async () => {
        if (game && game.id && (!game.title || !game.price)) {
          setLoading(true);
          try {
            const res = await fetch(`http://localhost:3001/games/${game.id}`);
            if (!res.ok) throw new Error("Gioco non trovato");
            const data = await res.json();
            setGameData(data.game);
            setError(null);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        } else {
          setGameData(game);
        }
      };
      fetchGameData();
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
      <div className="game-card" onClick={handleClick}>
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
        <div className="game-info">
          <div className="game-info-title-row">
            <CompareScale
              active={compareSelected}
              onClick={(e) => {
                e.stopPropagation();
                if (onCompareToggle) onCompareToggle();
              }}
            />
            <div className="game-info-title game-info-title-center">
              <h2>{gameData.title}</h2>
            </div>
            <FavoriteStar
              active={isFavorite}
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite(e);
              }}
            />
          </div>
          <div className="game-info-details">
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
