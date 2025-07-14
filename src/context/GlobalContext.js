import { createContext } from "react";

export const GlobalContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});
