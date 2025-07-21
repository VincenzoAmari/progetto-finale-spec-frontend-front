// Import principali
import React from "react";
import "./CardFavourites.css";
import FavoriteStar from "./FavoriteStar";

// CardFavourites: mostra i dettagli di un gioco preferito
const CardFavourites = ({ game, onRemove }) => {
  // Stato locale per i dati del gioco, caricamento ed errori
  const [gameData, setGameData] = React.useState(game);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Effetto: aggiorna i dati del gioco se mancano alcune info
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

  // Gestione stati: nessun dato, caricamento o errore
  if (!gameData) return null;
  if (loading) return <div className="favourites-card">Caricamento...</div>;
  if (error) return <div className="favourites-card">Errore: {error}</div>;

  // Render della card con immagine, titolo, stella preferiti e dettagli gioco
  return (
    <div className="favourites-card">
      {/* Immagine del gioco */}
      <div className="favourites-card-image-wrapper">
        <img
          src={
            gameData.image ||
            "https://via.placeholder.com/540x304?text=No+Image"
          }
          alt={gameData.title}
          className="favourites-card-image"
        />
      </div>
      <div className="favourites-info">
        <div className="favourites-info-title-row">
          <div className="favourites-info-title">
            <h2>{gameData.title}</h2>
          </div>
          {/* Stella per rimuovere dai preferiti */}
          <FavoriteStar
            active={true}
            onClick={() => onRemove(gameData.id)}
            className="favourites-info-star"
          />
        </div>
        <div
          className="favourites-info-content"
          style={{ position: "relative", width: "100%" }}
        >
          <div className="favourites-info-column">
            {/* Info aggiuntive sul gioco */}
            {gameData.category && (
              <p className="favourites-info-category">
                Categoria: {gameData.category}
              </p>
            )}
            {gameData.genre && (
              <p className="favourites-info-genre">Genere: {gameData.genre}</p>
            )}
            {gameData.tags && (
              <p className="favourites-info-tags">
                Tag:{" "}
                {Array.isArray(gameData.tags)
                  ? gameData.tags.join(", ")
                  : gameData.tags}
              </p>
            )}
            {gameData.platform && (
              <p className="favourites-info-platform">
                Piattaforma: {gameData.platform}
              </p>
            )}
            {gameData.developer && (
              <p className="favourites-info-developer">
                Developer: {gameData.developer}
              </p>
            )}
            {gameData.releaseDate && (
              <p className="favourites-info-release">
                Release: {gameData.releaseDate}
              </p>
            )}
            {gameData.releaseYear && (
              <p className="favourites-info-year">
                Anno: {gameData.releaseYear}
              </p>
            )}
            {gameData.publisher && (
              <p className="favourites-info-publisher">
                Publisher: {gameData.publisher}
              </p>
            )}
            {gameData.players && (
              <p className="favourites-info-players">
                Players: {gameData.players}
              </p>
            )}
            {gameData.rating && (
              <p className="favourites-info-rating">Voto: {gameData.rating}</p>
            )}
            {gameData.description && (
              <div className="favourites-description-row">
                <p className="favourites-info-description" style={{ flex: 1 }}>
                  Descrizione: {gameData.description}
                </p>
                {/* Prezzo del gioco */}
                {gameData.price !== undefined && (
                  <span className="favourites-info-price">
                    €
                    {typeof gameData.price === "number"
                      ? gameData.price.toFixed(2)
                      : gameData.price}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Esporta il componente
export default CardFavourites;
