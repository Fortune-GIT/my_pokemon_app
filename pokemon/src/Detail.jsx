import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AboutTab from "./AboutTab";
import StatsTab from "./StatsTab";
import MovesTab from "./MovesTab";
import EvolutionTab from "./EvolutionTab";
import "./Detail.css";

function Detail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [speciesData, setSpeciesData] = useState(null);
  const [evolutionData, setEvolutionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokeRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(pokeRes.data);

        const speciesRes = await axios.get(pokeRes.data.species.url);
        setSpeciesData(speciesRes.data);

        const evoRes = await axios.get(speciesRes.data.evolution_chain.url);
        setEvolutionData(evoRes.data);
      } catch (err) {
        console.error("Error loading Pokémon:", err);
      }
    };

    fetchData();
  }, [name]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className={`detail-page ${pokemon.types[0].type.name}`}>
      <Link to="/" className="back-btn">← Back</Link>

      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} <span>#{String(pokemon.id).padStart(3, "0")}</span></h1>
      <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} />

      {/* Tabs */}
      <div className="tabs">
        <button onClick={() => setActiveTab("about")} className={activeTab === "about" ? "active" : ""}>About</button>
        <button onClick={() => setActiveTab("stats")} className={activeTab === "stats" ? "active" : ""}>Base Stats</button>
        <button onClick={() => setActiveTab("evolution")} className={activeTab === "evolution" ? "active" : ""}>Evolution</button>
        <button onClick={() => setActiveTab("moves")} className={activeTab === "moves" ? "active" : ""}>Moves</button>
      </div>

      {/* Tab Content */}
      {activeTab === "about" && <AboutTab pokemon={pokemon} species={speciesData} />}
      {activeTab === "stats" && <StatsTab stats={pokemon.stats} />}
      {activeTab === "evolution" && <EvolutionTab evolutionData={evolutionData} />}
      {activeTab === "moves" && <MovesTab moves={pokemon.moves} />}
    </div>
  );
}

export default Detail;
