import React from "react";
import "./FavoriteStar.css";

const FavoriteStar = ({ active, onClick, title }) => (
  <span
    className={`favorite-star${active ? " active" : ""}`}
    onClick={onClick}
    title={
      title || (active ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti")
    }
    tabIndex={0}
    role="button"
    aria-label={
      title || (active ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti")
    }
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onClick(e);
    }}
  >
    {active ? "★" : "☆"}
  </span>
);

export default FavoriteStar;
