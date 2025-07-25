import { memo, useState, useEffect, useCallback } from "react";
import "./GameCard.css";
import FavoriteStar from "./FavoriteStar";
import CompareScale from "./CompareScale";

// GameCard: mostra le informazioni di un singolo gioco, con funzioni per preferiti e confronto
const GameCard = memo(
  ({
    game, // Oggetto gioco da visualizzare
    isFavorite, // Booleano: se il gioco è nei preferiti
    onFavoriteToggle, // Funzione per toggle preferito
    onClick, // Funzione per click sulla card
    compareSelected, // Booleano: se il gioco è selezionato per il confronto
    onCompareToggle, // Funzione per toggle confronto
  }) => {
    // Stato locale per i dati del gioco (può essere aggiornato da fetch)
    const [gameData, setGameData] = useState(game);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Effettua fetch dei dati completi del gioco se mancano titolo o prezzo
    useEffect(() => {
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

    // Gestisce il click sulla stella preferito (usa useCallback per performance)
    const handleFavorite = useCallback(
      (e) => {
        if (onFavoriteToggle) onFavoriteToggle(e);
      },
      [onFavoriteToggle]
    );

    // Gestisce il click sulla card (usa useCallback per performance)
    const handleClick = useCallback(() => {
      if (onClick) onClick();
    }, [onClick]);

    // Stato di caricamento
    if (loading) {
      return (
        <div className="game-card game-card-loading">
          <span>Caricamento...</span>
        </div>
      );
    }

    // Stato di errore
    if (error) {
      return (
        <div className="game-card game-card-error">
          <span>Errore: {error}</span>
        </div>
      );
    }

    // Render principale della card gioco
    return (
      <div className="game-card" onClick={handleClick}>
        {/* Immagine del gioco */}
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
        {/* Info principali: titolo, confronto, preferito */}
        <div className="game-info">
          <div className="game-info-title-row">
            {/* Icona confronto (bilancia) */}
            <CompareScale
              active={compareSelected}
              onClick={(e) => {
                e.stopPropagation();
                if (onCompareToggle) onCompareToggle();
              }}
            />
            {/* Titolo */}
            <div className="game-info-title game-info-title-center">
              <h2 className="game-title-h2">{gameData.title}</h2>
            </div>
            {/* Icona preferito (stella) */}
            <FavoriteStar
              active={isFavorite}
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite(e);
              }}
            />
          </div>
          {/* Categoria e prezzo */}
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
