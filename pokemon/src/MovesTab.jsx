function MovesTab({ moves }) {
  return (
    <div className="tab-content">
      <ul>
        {moves.slice(0, 10).map((m, index) => (
          <li key={index}>{m.move.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovesTab;
