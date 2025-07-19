import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import Navbar from "../components/Navbar";
import GameList from "../components/GameList";
import FavoritesSidebar from "../components/FavoritesSidebar";
import FilterSortBar from "../components/FilterSortBar";
import CompareOverlay from "../components/CompareOverlay";

const Home = () => {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("az");
  const [compareGames, setCompareGames] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tripleCompare, setTripleCompare] = useState(false);
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useGlobal();

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const categories = useMemo(() => {
    const cats = games.map((g) => g.category).filter(Boolean);
    return [...new Set(cats)];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(
      (game) =>
        game.title.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (category === "" || game.category === category)
    );
  }, [games, debouncedSearch, category]);

  const handleCompareToggle = (id) => {
    setCompareGames((prev) => {
      if (prev.includes(id)) return prev.filter((gid) => gid !== id);
      const max = tripleCompare ? 3 : 2;
      if (prev.length < max) return [...prev, id];
      return prev;
    });
  };

  // Quando si attiva/disattiva la modalità tripla, azzera la selezione
  React.useEffect(() => {
    setCompareGames([]);
  }, [tripleCompare]);

  const handleCloseCompare = () => setCompareGames([]);

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
            tripleCompare={tripleCompare}
            setTripleCompare={setTripleCompare}
          />
          <GameList
            games={filteredGames}
            sortBy={sortBy}
            isFavorite={isFavorite}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            compareGames={compareGames}
            handleCompareToggle={handleCompareToggle}
            navigate={navigate}
            tripleCompare={tripleCompare}
          />
          {(tripleCompare ? compared.length === 3 : compared.length === 2) && (
            <CompareOverlay compared={compared} onClose={handleCloseCompare} />
          )}
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
