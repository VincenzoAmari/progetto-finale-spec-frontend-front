import GameCard from "./GameCard";
import "./GameList.css";

// GameList: mostra la lista di giochi come griglia di GameCard
const GameList = ({
  games, // Array di giochi da mostrare
  isFavorite, // Funzione per sapere se un gioco è nei preferiti
  addFavorite, // Funzione per aggiungere ai preferiti
  removeFavorite, // Funzione per rimuovere dai preferiti
  compareGames, // Array di id giochi selezionati per confronto
  handleCompareToggle, // Funzione per toggle confronto
  navigate, // Funzione di navigazione (router)
  tripleCompare, // Booleano: se la modalità confronto triplo è attiva
}) => {
  // Render della lista giochi
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
