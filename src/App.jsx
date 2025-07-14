import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import GameDetail from "./pages/GameDetail";
import FavoritesPage from "./pages/FavoritesPage";
import { GlobalProvider } from "./context/GlobalContext";

export default function App() {
  return (
    <Router>
      <GlobalProvider>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </GlobalProvider>
    </Router>
  );
}
