import React from "react"

export default function CountryCard({ country, isFavorite, onToggleFavorite }) {
  const area = country.area || 0;
  let density = 0;

  if (area > 0) {
    density = country.population / area;
  }

  let densityColor = "green";
  if (density > 500) {
    densityColor = "red";
  } else if (density >= 100) {
    densityColor = "#e6b800";
  }

  return (
    <div className="countryCard relativeCard">
      <img
        src={country.flags.svg}
        alt={`Flagge von ${country.name.common}`}
        className="cardImage"
      />
      <h3 className="cardTitle">{country.name.common}</h3>

      <div className="cardInfo">
        <p className="cardText">
          <strong>Einwohner:</strong> {country.population.toLocaleString()}
        </p>
        <p className="cardText">
          <strong>Fläche:</strong> {area.toLocaleString()} km²
        </p>
        <p className="cardText densityText">
          <strong>Dichte:</strong>{" "}
          <span
            className="densityBadge"
            style={{ backgroundColor: densityColor }}
          >
            {density.toFixed(1)} / km²
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={onToggleFavorite}
        className={`likeButton ${isFavorite ? "liked" : ""}`}
      >
        {isFavorite ? "🤍" : "🤍"}
      </button>
    </div>
  )
}