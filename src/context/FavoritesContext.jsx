import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }) {
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
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context || typeof context !== "object" || !("favorites" in context)) {
    throw new Error(
      "useFavorites deve essere usato all'interno di FavoritesProvider"
    );
  }
  return context;
}
