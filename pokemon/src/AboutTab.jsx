function AboutTab({ pokemon, species }) {
  return (
    <div className="tab-content">
      <p><strong>Species:</strong> {species?.genera?.find(g => g.language.name === "en")?.genus}</p>
      <p><strong>Height:</strong> {pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
      <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
    </div>
  );
}

export default AboutTab;
