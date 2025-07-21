import React, { useEffect, useRef } from "react";
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
  const listRef = useRef();

  // Effetto: adatta la dimensione del font dei titoli per evitare overflow
  useEffect(() => {
    if (!listRef.current) return;
    const titles = Array.from(
      listRef.current.querySelectorAll(".game-info-title")
    );
    let minFont = 2.1; // rem
    if (titles.length > 0) {
      // Riduci il font-size finché nessun titolo va a capo o viene troncato
      for (let size = 2.1; size >= 1.1; size -= 0.05) {
        let fits = titles.every((el) => {
          el.style.fontSize = size + "rem";
          return el.scrollWidth <= el.offsetWidth;
        });
        if (fits) {
          minFont = size;
          break;
        }
      }
      // Applica la variabile CSS a tutti
      listRef.current.style.setProperty("--game-title-size", minFont + "rem");
    }
  }, [games]);

  // Render della lista giochi
  return (
    <div className="game-list" ref={listRef}>
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
