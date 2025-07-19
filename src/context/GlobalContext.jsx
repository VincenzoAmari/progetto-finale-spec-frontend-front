import React, { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

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
    const numId = Number(id);
    if (!numId || isNaN(numId)) return;
    setFavorites((prev) => (prev.includes(numId) ? prev : [...prev, numId]));
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

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context || typeof context !== "object" || !("favorites" in context)) {
    throw new Error(
      "useGlobal deve essere usato all'interno di GlobalProvider"
    );
  }
  return context;
}
