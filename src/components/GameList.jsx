import React from "react";
import GameCard from "./GameCard";

const GameList = ({
  games,
  sortBy,
  isFavorite,
  addFavorite,
  removeFavorite,
  compareGames,
  handleCompareToggle,
  navigate,
}) => {
  let sortedGames = [...games];
  sortedGames.sort((a, b) => {
    const priceA = Number(
      a.price ?? a.prezzo ?? (a.game && (a.game.price ?? a.game.prezzo)) ?? 0
    );
    const priceB = Number(
      b.price ?? b.prezzo ?? (b.game && (b.game.price ?? b.game.prezzo)) ?? 0
    );
    if (sortBy === "priceAsc") return priceA - priceB;
    if (sortBy === "priceDesc") return priceB - priceA;
    if (sortBy === "za") return b.title.localeCompare(a.title);
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="game-list">
      {sortedGames.length > 0 ? (
        sortedGames.map((game) => (
          <GameCard
            key={game.id + "-" + sortBy}
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
          />
        ))
      ) : (
        <p
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: 60,
            fontSize: 18,
          }}
        >
          Nessun gioco trovato.
        </p>
      )}
    </div>
  );
};

export default GameList;
