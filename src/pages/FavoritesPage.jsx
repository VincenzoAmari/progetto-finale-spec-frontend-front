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
    const fetchFavorites = async () => {
      try {
        const games = await Promise.all(
          favorites
            .filter((id) => Number(id) && !isNaN(Number(id)))
            .map(async (id) => {
              try {
                const res = await fetch(`http://localhost:3001/games/${id}`);
                if (!res.ok) return null;
                const data = await res.json();
                return data && data.game;
              } catch {
                return null;
              }
            })
        );
        setFavoriteGames(games.filter((g) => g));
      } catch (err) {
        setFavoriteGames([]);
        console.error("Errore nel fetch dei preferiti:", err);
      }
    };
    fetchFavorites();
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
