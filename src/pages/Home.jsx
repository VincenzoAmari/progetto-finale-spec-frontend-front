import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Navbar from "../components/Navbar";
import GameList from "../components/GameList";
import FavoritesSidebar from "../components/FavoritesSidebar";
import FilterSortBar from "../components/FilterSortBar";
import CompareOverlay from "../components/CompareOverlay";

// Pagina principale: mostra la lista giochi, filtri, barra preferiti e overlay confronto
const Home = () => {
  // Stati principali
  const [games, setGames] = useState([]); // Tutti i giochi
  const [search, setSearch] = useState(""); // Testo ricerca
  const [category, setCategory] = useState(""); // Categoria selezionata
  const [compareGames, setCompareGames] = useState([]); // Giochi selezionati per confronto
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Ricerca con debounce
  const [tripleCompare, setTripleCompare] = useState(false); // Modalità confronto triplo
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useGlobal();

  // Carica la lista giochi dal backend
  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  // Debounce per la ricerca
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  // Calcola le categorie disponibili
  const categories = useMemo(() => {
    const cats = games.map((g) => g.category).filter(Boolean);
    return [...new Set(cats)];
  }, [games]);

  // Filtra i giochi in base a ricerca e categoria
  const filteredGames = useMemo(() => {
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (category === "" || game.category === category)
    );
  }, [games, debouncedSearch, category]);

  // Gestisce il toggle dei giochi da confrontare
  const handleCompareToggle = (id) => {
    setCompareGames((prev) => {
      if (prev.includes(id)) return prev.filter((gid) => gid !== id);
      const max = tripleCompare ? 3 : 2;
      if (prev.length < max) return [...prev, id];
      return prev;
    });
  };

  // Quando si attiva/disattiva la modalità tripla, azzera la selezione confronto
  React.useEffect(() => {
    setCompareGames([]);
  }, [tripleCompare]);

  // Chiude l'overlay confronto
  const handleCloseCompare = () => setCompareGames([]);

  // Array di giochi selezionati per confronto (oggetti completi)
  const compared = compareGames.map((id) => games.find((g) => g.id === id));

  // Render della pagina Home
  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Barra filtri e lista giochi */}
          <FilterSortBar
            games={filteredGames}
            category={category}
            setCategory={setCategory}
            categories={categories}
            tripleCompare={tripleCompare}
            setTripleCompare={setTripleCompare}
            isFavorite={isFavorite}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            compareGames={compareGames}
            handleCompareToggle={handleCompareToggle}
            navigate={navigate}
          />
          {/* Overlay confronto visibile solo se selezione valida */}
          {(tripleCompare ? compared.length === 3 : compared.length === 2) && (
            <CompareOverlay compared={compared} onClose={handleCloseCompare} />
          )}
        </div>
        {/* Barra laterale preferiti */}
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
