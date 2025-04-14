function StatsTab({ stats }) {
  return (
    <div className="tab-content">
      {stats.map(stat => (
        <div key={stat.stat.name} className="stat-row">
          <span>{stat.stat.name.toUpperCase()}</span>
          <div className="bar">
            <div style={{ width: `${stat.base_stat / 2}%` }}></div>
          </div>
          <span>{stat.base_stat}</span>
        </div>
      ))}
    </div>
  );
}

export default StatsTab;
