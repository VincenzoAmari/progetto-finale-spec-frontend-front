import FavoriteStar from "../components/FavoriteStar";
import React, { useEffect, useState } from "react";
import { useGlobal } from "../context/GlobalContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, isFavorite, addFavorite, removeFavorite } = useGlobal();
  const [favoriteGames, setFavoriteGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all favorite games from backend
    if (favorites.length === 0) {
      setFavoriteGames([]);
      return;
    }
    Promise.all(
      favorites
        .filter((id) => {
          const numId = Number(id);
          return numId && !isNaN(numId);
        })
        .map((id) =>
          fetch(`http://localhost:3001/games/${id}`)
            .then((res) => {
              if (!res.ok) throw new Error("Gioco non trovato");
              return res.json();
            })
            .then((data) => data.game)
            .catch(() => null)
        )
    ).then((games) => {
      setFavoriteGames(games.filter((g) => g));
    });
  }, [favorites]);

  const handleFavorite = (e, id) => {
    e.stopPropagation();
    const numId = Number(id);
    if (isFavorite(numId)) {
      removeFavorite(numId);
    } else {
      addFavorite(numId);
    }
  };

  return (
    <>
      <Navbar />
      <div className="favorites-page">
        <h1 className="favorites-title">Preferiti</h1>
        {favoriteGames.length === 0 ? (
          <div className="favorites-empty">Nessun gioco preferito.</div>
        ) : (
          <div className="favorites-list-wrapper">
            <div className="favorites-list">
              {favoriteGames.map((game) => (
                <div
                  key={game.id}
                  className="game-detail"
                  onClick={() => navigate(`/games/${game.id}`)}
                >
                  <img
                    className="game-detail-image"
                    src={game.image}
                    alt={game.title}
                    onError={(e) => {
                      if (!e.target.src.includes("via.placeholder.com")) {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/320x200?text=No+Image";
                      }
                    }}
                  />
                  <div className="game-detail-info">
                    <div className="game-detail-info-row">
                      <h2 className="game-detail-info-title">{game.title}</h2>
                      <span
                        className={`game-detail-fav${
                          isFavorite(Number(game.id)) ? " active" : ""
                        }`}
                        onClick={(e) => handleFavorite(e, game.id)}
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
                    <p className="game-detail-category">
                      <strong>Categoria:</strong> {game.category}
                    </p>
                    <p className="game-detail-platform">
                      <strong>Piattaforma:</strong> {game.platform}
                    </p>
                    <p className="game-detail-developer">
                      <strong>Developer:</strong> {game.developer}
                    </p>
                    <p className="game-detail-year">
                      <strong>Anno:</strong> {game.releaseYear}
                    </p>
                    <p className="game-detail-rating">
                      <strong>Voto:</strong> {game.rating}
                    </p>
                    <p className="game-detail-price">
                      <strong>Prezzo:</strong> €{game.price}
                    </p>
                    <p className="game-detail-description">
                      <strong>Descrizione:</strong> {game.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
