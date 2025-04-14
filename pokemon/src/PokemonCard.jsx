import React from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

function PokemonCard({ name, image, id, types }) {
  // Get the primary type to determine background color
  const typeClass = types?.[0]?.type?.name || "normal";

  return (
    <Link to={`/pokemon/${name}`} className={`pokemon-card ${typeClass}`}>
      <div className="pokemon-image">
        <img src={image} alt={name} />
      </div>

      <div className="pokemon-info">
        <h3>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        <span>#{String(id).padStart(3, "0")}</span>
        <div className="types">
          {types &&
            types.map((typeObj, index) => (
              <span key={index} className={`type-badge ${typeObj.type.name}`}>
                {typeObj.type.name}
              </span>
            ))}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
