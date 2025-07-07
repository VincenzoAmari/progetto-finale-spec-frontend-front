// src/pages/Home.jsx /// fetch per collegamento al back
import { useEffect, useState } from "react";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/games")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Giochi Indie</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {games.map((game) => (
          <li key={game.id} className="border p-2 rounded shadow">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-lg font-semibold">{game.title}</h2>
            <p className="text-sm text-gray-600">{game.category}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
