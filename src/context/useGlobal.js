import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context || typeof context !== "object" || !("favorites" in context)) {
    throw new Error(
      "useGlobal deve essere usato all'interno di GlobalProvider"
    );
  }
  return context;
}
