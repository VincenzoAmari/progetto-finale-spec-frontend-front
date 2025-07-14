import React, { useState, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

export function GlobalProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return Array.isArray(saved ? JSON.parse(saved) : [])
      ? JSON.parse(saved)
      : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(Number(id)) ? prev : [...prev, Number(id)]
    );
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((favId) => favId !== Number(id)));
  };

  const isFavorite = (id) => favorites.includes(Number(id));

  return (
    <GlobalContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
