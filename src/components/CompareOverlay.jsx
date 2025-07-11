import React from "react";

const CompareOverlay = ({ compared, onClose }) =>
  compared.length === 2 && (
    <div className="compare-overlay">
      <div className="compare-content">
        <button className="close-compare" onClick={onClose}>
          ×
        </button>
        <div className="compare-cards">
          {compared.map((game) => (
            <div className="compare-card" key={game.id}>
              <img
                className="game-detail-image"
                src={game.image}
                alt={game.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "14px",
                  border: "2px solid #00ffe7",
                  background: "#222",
                  boxShadow: "0 2px 12px #00ffe733",
                }}
                onError={(e) => {
                  if (!e.target.src.includes("via.placeholder.com")) {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/320x200?text=No+Image";
                  }
                }}
              />
              <div
                className="game-detail-info"
                style={{
                  padding: "18px 12px",
                  fontSize: "1.1rem",
                }}
              >
                <h1
                  style={{
                    marginBottom: 0,
                    fontSize: "2rem",
                    color: "#00ffe7",
                  }}
                >
                  {game.title}
                </h1>
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
      </div>
    </div>
  );

export default CompareOverlay;
