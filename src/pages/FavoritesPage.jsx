import "./FavoritesPage.css";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useGlobal } from "../context/GlobalContext";
import CardFavourites from "../components/CardFavourites";

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
      <div className="favorites-page-list">
        {favoriteGames.length === 0 ? (
          <div className="favorites-page-empty">
            Nessun gioco tra i preferiti.
          </div>
        ) : (
          favoriteGames.map((game) => (
            <CardFavourites
              key={game.id}
              game={game}
              onRemove={removeFavorite}
            />
          ))
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
