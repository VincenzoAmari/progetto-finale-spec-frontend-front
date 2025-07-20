import "./FavoritesPage.css";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useGlobal } from "../context/GlobalContext";
import GameCard from "../components/GameCard";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useGlobal();
  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    if (favorites.length === 0) {
      setFavoriteGames([]);
      return;
    }
    Promise.all(
      favorites
        .filter((id) => Number(id) && !isNaN(Number(id)))
        .map((id) =>
          fetch(`http://localhost:3001/games/${id}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => data && data.game)
            .catch(() => null)
        )
    ).then((games) => {
      setFavoriteGames(games.filter((g) => g));
    });
  }, [favorites]);

  return (
    <>
      <Navbar />
      <div className="favorites-page">
        <h1 className="favorites-title">Preferiti</h1>
        {favoriteGames.length === 0 ? (
          <div className="favorites-empty">Nessun gioco preferito.</div>
        ) : (
          <div className="game-list">
            {favoriteGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                isFavorite={true}
                onFavoriteToggle={() => {
                  if (game.id) removeFavorite(game.id);
                }}
                onClick={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
