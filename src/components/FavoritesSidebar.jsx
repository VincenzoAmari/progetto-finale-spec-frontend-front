import React from "react";
import { useNavigate } from "react-router-dom";

const FavoritesSidebar = ({ games, isFavorite, removeFavorite }) => {
  const navigate = useNavigate();
  const favoriteGames = games.filter((g) => isFavorite(Number(g.id)));
  return (
    <aside
      className="favorites-sidebar"
      style={{
        width: 320,
        minWidth: 220,
        background: "#181c24",
        borderLeft: "2px solid #00ffe7",
        padding: "24px 12px",
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
        boxShadow: "-2px 0 12px #00ffe733",
        zIndex: 10,
      }}
    >
      <h2
        style={{
          color: "#00ffe7",
          marginBottom: 18,
          fontSize: "1.4rem",
          textAlign: "center",
        }}
      >
        Preferiti
      </h2>
      {favoriteGames.length === 0 ? (
        <p style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>
          Nessun gioco nei preferiti.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {favoriteGames.map((game) => (
            <li
              key={game.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 18,
                background: "#23272f",
                borderRadius: 10,
                padding: "8px 8px 8px 0",
                boxShadow: "0 2px 8px #00ffe722",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onClick={() => navigate(`/games/${game.id}`)}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "1.05rem",
                  }}
                >
                  {game.title}
                </div>
                <div style={{ color: "#00ffe7", fontSize: "0.95rem" }}>
                  {game.category}
                </div>
              </div>
              <button
                title="Rimuovi dai preferiti"
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffd700",
                  fontSize: 22,
                  cursor: "pointer",
                  marginLeft: 4,
                }}
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
