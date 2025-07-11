import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import FavoritesPage from "./pages/FavoritesPage";
import { FavoritesProvider } from "./context/FavoritesContext";

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}
