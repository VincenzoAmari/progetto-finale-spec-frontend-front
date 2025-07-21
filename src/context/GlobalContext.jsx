import React, { createContext, useContext, useState, useEffect } from "react";

// Context globale per gestire i preferiti in tutta l'app
const GlobalContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

// Provider globale: gestisce lo stato dei preferiti e lo salva in localStorage
export function GlobalProvider({ children }) {
  // Stato: array di id giochi preferiti
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return Array.isArray(saved ? JSON.parse(saved) : [])
      ? JSON.parse(saved)
      : [];
  });

  // Aggiorna localStorage ogni volta che cambiano i preferiti
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Aggiunge un gioco ai preferiti
  const addFavorite = (id) => {
    const numId = Number(id);
    if (!numId || isNaN(numId)) return;
    setFavorites((prev) => (prev.includes(numId) ? prev : [...prev, numId]));
  };

  // Rimuove un gioco dai preferiti
  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((favId) => favId !== Number(id)));
  };

  // Verifica se un gioco è nei preferiti
  const isFavorite = (id) => favorites.includes(Number(id));

  // Espone i valori e le funzioni tramite context
  return (
    <GlobalContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// Hook custom per accedere al context globale
export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context || typeof context !== "object" || !("favorites" in context)) {
    throw new Error(
      "useGlobal deve essere usato all'interno di GlobalProvider"
    );
  }
  return context;
}
