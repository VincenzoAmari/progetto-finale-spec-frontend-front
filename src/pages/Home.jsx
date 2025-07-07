import React, { useEffect, useState, useMemo } from "react";

export default function Home() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/games")
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Dati dal backend:", data);
        setGames(data);
      })
      .catch((error) => {
        console.error("Errore fetch:", error);
        setGames([]);
      });
  }, []);

  const categories = useMemo(() => {
    const cats = games.map((g) => g.category);
    return [...new Set(cats)];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !categoryFilter || game.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchTerm, categoryFilter]);

  return (
    <>
      <nav className="navbar">
        <input
          type="text"
          placeholder="Cerca giochi..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Tutte le categorie</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </nav>

      <main className="game-list">
        {filteredGames.length === 0 ? (
          <p>Nessun gioco trovato.</p>
        ) : (
          filteredGames.map((game) => (
            <div key={game.id} className="game-card">
              <img src={game.image} alt={game.title} className="game-image" />
              <div className="game-info">
                <h2>{game.title}</h2>
                <p>
                  <strong>Categoria:</strong> {game.category}
                </p>
                <p>
                  <strong>Piattaforma:</strong> {game.platform}
                </p>
                <p>
                  <strong>Anno:</strong> {game.releaseYear}
                </p>
              </div>
            </div>
          ))
        )}
      </main>
    </>
  );
}
