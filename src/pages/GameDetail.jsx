import FavoriteStar from "../components/FavoriteStar";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Navbar from "../components/Navbar";
import "./GameDetail.css";

// Pagina dettaglio gioco: mostra tutte le info di un singolo gioco
const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null); // Dati gioco
  const [loading, setLoading] = useState(true); // Stato caricamento
  const [error, setError] = useState(null); // Stato errore
  const loggedRef = useRef(false); // Per evitare log multipli
  const { isFavorite, addFavorite, removeFavorite } = useGlobal();

  // Carica i dati del gioco dal backend
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
          loggedRef.current = true;
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Stato di caricamento
  if (loading)
    return (
      <>
        <Navbar />
        <div className="game-detail">Caricamento...</div>
      </>
    );
  // Stato di errore
  if (error)
    return (
      <>
        <Navbar />
        <div className="game-detail">{error}</div>
      </>
    );
  if (!game) return null;

  // Gestisce il click sulla stella preferito
  const handleFavorite = (e) => {
    e.stopPropagation();
    const numId = Number(game.id);
    if (isFavorite(numId)) {
      removeFavorite(numId);
    } else {
      addFavorite(numId);
    }
  };

  // Render della pagina dettaglio gioco
  return (
    <>
      <Navbar />
      <div className="game-detail-bg">
        <div className="game-detail game-detail-vertical">
          {/* Immagine grande */}
          <div className="game-detail-image-wrapper">
            <img
              className="game-detail-image-large"
              src={game.image}
              alt={game.title}
              onError={(e) => {
                if (!e.target.src.includes("via.placeholder.com")) {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/1000x600?text=No+Image";
                }
              }}
            />
          </div>
          {/* Info dettagliate */}
          <div className="game-detail-info game-detail-info-large">
            <div className="game-detail-title-row">
              <h1 className="game-detail-title">{game.title}</h1>
              {/* Stella preferito */}
              <span
                className={`game-detail-fav${
                  isFavorite(Number(game.id)) ? " active" : ""
                }`}
                onClick={handleFavorite}
                title={
                  isFavorite(Number(game.id))
                    ? "Rimuovi dai preferiti"
                    : "Aggiungi ai preferiti"
                }
              >
                <FavoriteStar
                  active={isFavorite(Number(game.id))}
                  onClick={() => {
                    isFavorite(Number(game.id))
                      ? removeFavorite(Number(game.id))
                      : addFavorite(Number(game.id));
                  }}
                />
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
