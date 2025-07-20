import React from "react";
import GameCard from "./GameCard";
import "./GameList.css";

const GameList = ({
  games,
  isFavorite,
  addFavorite,
  removeFavorite,
  compareGames,
  handleCompareToggle,
  navigate,
  tripleCompare,
}) => {
  return (
    <div className="game-list">
      {games.length > 0 ? (
        games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isFavorite={isFavorite(Number(game.id))}
            onFavoriteToggle={(e) => {
              e.stopPropagation();
              const numId = Number(game.id);
              if (isFavorite(numId)) {
                removeFavorite(numId);
              } else {
                addFavorite(numId);
              }
            }}
            onClick={() => navigate(`/games/${game.id}`)}
            compareSelected={compareGames.includes(game.id)}
            onCompareToggle={() => handleCompareToggle(game.id)}
            tripleCompare={tripleCompare}
          />
        ))
      ) : (
        <p className="game-list-empty">Nessun gioco trovato.</p>
      )}
    </div>
  );
};

export default GameList;
