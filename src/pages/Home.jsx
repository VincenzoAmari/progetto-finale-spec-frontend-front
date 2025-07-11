import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import Navbar from "../components/Navbar";
import {
  FaEuroSign,
  FaArrowUp,
  FaArrowDown,
  FaSearch,
  FaBalanceScale,
} from "react-icons/fa";
import { MdTextFields } from "react-icons/md";
import GameCard from "../components/GameCard";
import FavoritesSidebar from "../components/FavoritesSidebar";
import FilterSortBar from "../components/FilterSortBar";
import CompareOverlay from "../components/CompareOverlay";

const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("az");
  const [compareGames, setCompareGames] = useState([]); // array di id
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  // Ricava le categorie uniche
  const categories = useMemo(() => {
    const cats = games.map((g) => g.category).filter(Boolean);
    return [...new Set(cats)];
  }, [games]);

  // Filtro giochi per ricerca e categoria
  const filteredGames = useMemo(() => {
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "" || game.category === category)
    );
  }, [games, search, category]);

  // Ordinamento giochi
  const sortedGames = useMemo(() => {
    const arr = [...filteredGames];
    arr.sort((a, b) => {
      // Gestione robusta del campo prezzo
      const priceA =
        a.price ?? a.prezzo ?? (a.game && (a.game.price ?? a.game.prezzo));
      const priceB =
        b.price ?? b.prezzo ?? (b.game && (b.game.price ?? b.game.prezzo));
      if (sortBy === "priceAsc") return Number(priceA) - Number(priceB);
      if (sortBy === "priceDesc") return Number(priceB) - Number(priceA);
      if (sortBy === "za") return b.title.localeCompare(a.title);
      return a.title.localeCompare(b.title);
    });
    return arr;
  }, [filteredGames, sortBy]);

  // Gestione selezione comparazione
  const handleCompareToggle = (id) => {
    setCompareGames((prev) => {
      if (prev.includes(id)) return prev.filter((gid) => gid !== id);
      if (prev.length < 2) return [...prev, id];
      return prev;
    });
  };

  // Chiudi overlay
  const handleCloseCompare = () => setCompareGames([]);

  // Ottieni i dati dei giochi selezionati
  const compared = compareGames.map((id) => games.find((g) => g.id === id));

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
      />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <FilterSortBar
            category={category}
            setCategory={setCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
          />
          <div className="game-list">
            {sortedGames.length > 0 ? (
              sortedGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={isFavorite(Number(game.id))}
                  onFavoriteToggle={(e) => {
                    e.stopPropagation();
                    const numId = Number(game.id);
                    if (isFavorite(numId)) {
                      removeFavorite(numId);
                    } else {
                      addFavorite(numId);
                    }
                  }}
                  onClick={() => navigate(`/games/${game.id}`)}
                  compareSelected={compareGames.includes(game.id)}
                  onCompareToggle={() => handleCompareToggle(game.id)}
                />
              ))
            ) : (
              <p
                style={{
                  color: "#fff",
                  textAlign: "center",
                  marginTop: 60,
                  fontSize: 18,
                }}
              >
                Nessun gioco trovato.
              </p>
            )}
          </div>
          <CompareOverlay compared={compared} onClose={handleCloseCompare} />
        </div>
        <FavoritesSidebar
          games={games}
          isFavorite={isFavorite}
          removeFavorite={removeFavorite}
        />
      </div>
    </>
  );
};

export default Home;
