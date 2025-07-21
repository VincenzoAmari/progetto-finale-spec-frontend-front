import React from "react";
import "./FavoriteStar.css";

// FavoriteStar: icona stella per aggiungere/rimuovere un gioco dai preferiti
const FavoriteStar = ({ active, onClick, title }) => (
  <span
    className={`favorite-star${active ? " active" : ""}`}
    onClick={(e) => {
      if (onClick) onClick(e);
    }}
    title={
      title || (active ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti")
    }
  >
    {active ? "★" : "☆"}
  </span>
);

export default FavoriteStar;
