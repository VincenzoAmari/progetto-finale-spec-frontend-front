import React from "react";
import "./CompareOverlay.css";

const CompareOverlay = ({ compared, onClose }) => {
  const [gamesData, setGamesData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchGamesData = async () => {
      if (!compared || compared.length === 0) {
        setGamesData([]);
        return;
      }
      setLoading(true);
      try {
        const games = await Promise.all(
          compared.map(async (g) => {
            if (!g || !g.id) return null;
            try {
              const res = await fetch(`http://localhost:3001/games/${g.id}`);
              if (!res.ok) return null;
              const data = await res.json();
              return data && data.game ? data.game : g;
            } catch {
              return g;
            }
          })
        );
        setGamesData(games.filter((g) => g));
        setError(null);
      } catch (err) {
        setGamesData([]);
        setError(
          "Errore nel fetch dei dati di confronto: " + (err?.message || err)
        );
        console.error("Errore nel fetch dei dati di confronto:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGamesData();
  }, [compared]);

  if (!compared || compared.length === 0) {
    return (
      <div className="compare-overlay">
        <div className="compare-content">
          <button className="close-compare" onClick={onClose}>
            ×
          </button>
          <div className="compare-cards compare-cards-empty">
            <span className="compare-empty-main">
              Nessun gioco selezionato per il confronto.
            </span>
            <span className="compare-empty-sub">
              Seleziona giochi da confrontare!
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (compared.length !== 2 && compared.length !== 3) return null;
  if (loading) {
    return (
      <div className="compare-overlay">
        <div className="compare-content">
          <button className="close-compare" onClick={onClose}>
            ×
          </button>
          <div className="compare-cards compare-cards-loading">
            <span>Caricamento...</span>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="compare-overlay">
        <div className="compare-content">
          <button className="close-compare" onClick={onClose}>
            ×
          </button>
          <div className="compare-cards compare-cards-error">
            <span>Errore: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="compare-overlay">
      <div className="compare-content">
        <button className="close-compare" onClick={onClose}>
          ×
        </button>
        {gamesData.length === 3 ? (
          <>
            <div className="compare-cards compare-cards-row">
              {gamesData.slice(0, 2).map((game) => (
                <div className="compare-card" key={game.id}>
                  <img
                    className="game-detail-image compare-image"
                    src={game.image}
                    alt={game.title}
                    onError={(e) => {
                      if (!e.target.src.includes("via.placeholder.com")) {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/320x200?text=No+Image";
                      }
                    }}
                  />
                  <div className="game-detail-info compare-info">
                    <h1 className="compare-title">{game.title}</h1>
                    <p>
                      <strong>Categoria:</strong> {game.category}
                    </p>
                    <p>
                      <strong>Piattaforma:</strong> {game.platform}
                    </p>
                    <p>
                      <strong>Developer:</strong> {game.developer}
                    </p>
                    <p>
                      <strong>Anno:</strong> {game.releaseYear}
                    </p>
                    <p>
                      <strong>Voto:</strong> {game.rating}
                    </p>
                    <p>
                      <strong>Prezzo:</strong> €{game.price}
                    </p>
                    <p>
                      <strong>Descrizione:</strong> {game.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="compare-cards compare-cards-row compare-cards-bottom">
              <div className="compare-card" key={gamesData[2].id}>
                <img
                  className="game-detail-image compare-image"
                  src={gamesData[2].image}
                  alt={gamesData[2].title}
                  onError={(e) => {
                    if (!e.target.src.includes("via.placeholder.com")) {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/320x200?text=No+Image";
                    }
                  }}
                />
                <div className="game-detail-info compare-info">
                  <h1 className="compare-title">{gamesData[2].title}</h1>
                  <p>
                    <strong>Categoria:</strong> {gamesData[2].category}
                  </p>
                  <p>
                    <strong>Piattaforma:</strong> {gamesData[2].platform}
                  </p>
                  <p>
                    <strong>Developer:</strong> {gamesData[2].developer}
                  </p>
                  <p>
                    <strong>Anno:</strong> {gamesData[2].releaseYear}
                  </p>
                  <p>
                    <strong>Voto:</strong> {gamesData[2].rating}
                  </p>
                  <p>
                    <strong>Prezzo:</strong> €{gamesData[2].price}
                  </p>
                  <p>
                    <strong>Descrizione:</strong> {gamesData[2].description}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="compare-cards compare-cards-row">
            {gamesData.map((game) => (
              <div className="compare-card" key={game.id}>
                <img
                  className="game-detail-image compare-image"
                  src={game.image}
                  alt={game.title}
                  onError={(e) => {
                    if (!e.target.src.includes("via.placeholder.com")) {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/320x200?text=No+Image";
                    }
                  }}
                />
                <div className="game-detail-info compare-info">
                  <h1 className="compare-title">{game.title}</h1>
                  <p>
                    <strong>Categoria:</strong> {game.category}
                  </p>
                  <p>
                    <strong>Piattaforma:</strong> {game.platform}
                  </p>
                  <p>
                    <strong>Developer:</strong> {game.developer}
                  </p>
                  <p>
                    <strong>Anno:</strong> {game.releaseYear}
                  </p>
                  <p>
                    <strong>Voto:</strong> {game.rating}
                  </p>
                  <p>
                    <strong>Prezzo:</strong> €{game.price}
                  </p>
                  <p>
                    <strong>Descrizione:</strong> {game.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareOverlay;
