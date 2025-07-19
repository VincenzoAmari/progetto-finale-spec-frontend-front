import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import "./FavoritesSidebar.css";

const FavoritesSidebar = ({ games }) => {
  const navigate = useNavigate();
  const { isFavorite, removeFavorite } = useGlobal();
  const favoriteGames = games.filter((g) => isFavorite(Number(g.id)));
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
              onClick={() => navigate(`/games/${game.id}`)}
            >
              <div className="favorites-sidebar-item-info">
                <div className="favorites-sidebar-item-title">{game.title}</div>
                <div className="favorites-sidebar-item-category">
                  {game.category}
                </div>
              </div>
              <button
                title="Rimuovi dai preferiti"
                className="favorites-sidebar-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(Number(game.id));
                }}
              >
                ★
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default FavoritesSidebar;
