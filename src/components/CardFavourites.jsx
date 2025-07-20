import React from "react";
import "./CardFavourites.css";
import FavoriteStar from "./FavoriteStar";

const CardFavourites = ({ game, onRemove }) => {
  if (!game) return null;
  return (
    <div className="favourites-card">
      <div className="favourites-card-image-wrapper">
        <img
          src={
            game.image || "https://via.placeholder.com/540x304?text=No+Image"
          }
          alt={game.title}
          className="favourites-card-image"
        />
      </div>
      <div className="favourites-info">
        <div
          className="favourites-info-title-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="favourites-info-title" style={{ textAlign: "left" }}>
            <h2>{game.title}</h2>
          </div>
          <FavoriteStar
            active={true}
            onClick={() => onRemove(game.id)}
            className="favourites-info-star"
          />
        </div>
        <div className="favourites-info-details">
          <p className="favourites-info-category">{game.category}</p>
          <p className="favourites-info-price">
            Prezzo: €
            {typeof game.price === "number"
              ? game.price.toFixed(2)
              : game.price}
          </p>
        </div>
        <p>{game.description}</p>
        <div>
          <span>Publisher: {game.publisher}</span> |{" "}
          <span>Release: {game.releaseDate}</span> |{" "}
          <span>Players: {game.players}</span>
        </div>
      </div>
    </div>
  );
};

export default CardFavourites;
