function EvolutionTab({ evolutionData }) {
  if (!evolutionData) return <p>Loading...</p>;

  const chain = [];
  let current = evolutionData.chain;

  while (current) {
    chain.push(current.species.name);
    current = current.evolves_to[0];
  }

  return (
    <div className="tab-content">
      <p><strong>Evolution Chain:</strong></p>
      <ul>
        {chain.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default EvolutionTab;
