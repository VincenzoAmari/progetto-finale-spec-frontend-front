import FavoriteStar from "./FavoriteStar";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { useMemo, useCallback } from "react";
import "./FavoritesSidebar.css";
// Barra laterale che mostra i giochi preferiti

function FavoritesSidebar({ games }) {
  const navigate = useNavigate();
  const { isFavorite, removeFavorite } = useGlobal();

  // Memoizza la lista dei giochi preferiti
  const favoriteGames = useMemo(
    () => games.filter((g) => isFavorite(Number(g.id))),
    [games, isFavorite]
  );

  // Handler memoizzati
  const handleNavigate = useCallback(
    (id) => {
      navigate(`/games/${id}`);
    },
    [navigate]
  );

  const handleRemove = useCallback(
    (e, id) => {
      e.stopPropagation();
      removeFavorite(Number(id));
    },
    [removeFavorite]
  );

  const handleStarClick = useCallback(
    (id) => {
      removeFavorite(id);
    },
    [removeFavorite]
  );

  // Render della sidebar preferiti
  return (
    <aside className="favorites-sidebar">
      <h2 className="favorites-sidebar-title">Preferiti</h2>
      {favoriteGames.length === 0 ? (
        <div className="favorites-sidebar-empty">
          <p className="favorites-sidebar-empty-main">
            Nessun gioco nei preferiti.
          </p>
          <p className="favorites-sidebar-empty-sub">
            Seleziona i tuoi preferiti!
          </p>
        </div>
      ) : (
        <ul className="favorites-sidebar-list">
          {favoriteGames.map((game) => (
            <li
              key={game.id}
              className="favorites-sidebar-item"
              onClick={() => handleNavigate(game.id)}
            >
              <div className="favorites-sidebar-item-info">
                <div className="favorites-sidebar-item-title">{game.title}</div>
                <div className="favorites-sidebar-item-category">
                  {game.category}
                </div>
              </div>
              {/* Bottone per rimuovere dai preferiti */}
              <button
                title="Rimuovi dai preferiti"
                className="favorites-sidebar-remove"
                onClick={(e) => handleRemove(e, game.id)}
              >
                <FavoriteStar
                  active={isFavorite(game.id)}
                  onClick={() => handleStarClick(game.id)}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default FavoritesSidebar;
