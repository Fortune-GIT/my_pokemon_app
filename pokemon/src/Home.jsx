import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./PokemonCard";
import "./Home.css";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );

      const newPokemons = await Promise.all(
        res.data.results.map(async (p) => {
          const poke = await axios.get(p.url);
          return poke.data;
        })
      );

      // Remove duplicates based on ID
      setPokemonList((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNew = newPokemons.filter((p) => !existingIds.has(p.id));
        return [...prev, ...uniqueNew];
      });

      setOffset((prev) => prev + limit);
      if (!res.data.next) setHasMore(false);
    } catch (err) {
      alert("Failed to fetch Pokémon. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // Filter by search input
  const filtered = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-page">
      <h1>My Pokemon</h1>

      <input
        type="text"
        placeholder="Search Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <div className="pokemon-grid">
        {filtered
          .filter((p) => p.types && p.types.length > 0) //  Only render complete Pokémon
          .map((pokemon) => (
            <PokemonCard
              key={`${pokemon.name}-${pokemon.id}`} //  Unique key
              name={pokemon.name}
              id={pokemon.id}
              image={pokemon.sprites.front_default}
              types={pokemon.types}
            />
          ))}
      </div>

      {hasMore && !loading && (
        <button className="load-more" onClick={fetchPokemons}>
          Load More
        </button>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default Home;