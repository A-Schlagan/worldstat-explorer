import React, { useState } from "react"

// WICHTIG: CountryCard() wurde funktional entwickelt (NICHT klassenbasiert!)
export default function CountryCard({ country, isFavorite, onToggleFavorite }) {
  const [showDetails, setShowDetails] = useState(false)

  const area = country.area || 0
  let density = 0

  if (area > 0) {
    density = country.population / area
  }

  let densityColor = "green"
  if (density > 500) {
    densityColor = "red"
  } else if (density >= 100) {
    densityColor = "#e6b800"
  }

  const capital =
    country.capital && country.capital.length > 0
      ? country.capital[0]
      : "Keine Angabe"

  const subregion = country.subregion || "Keine Angabe"

  const continent =
    country.continents && country.continents.length > 0
      ? country.continents.join(", ")
      : "Keine Angabe"

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "Keine Angabe"

  const currencies = country.currencies
    ? Object.values(country.currencies)
      .map(currency => currency.name)
      .join(", ")
    : "Keine Angabe"

  const timezones =
    country.timezones && country.timezones.length > 0
      ? country.timezones.join(", ")
      : "Keine Angabe"

  return (
    <div
      className={`countryCard relativeCard clickableCard ${showDetails ? "openCard" : ""
        }`}
      onClick={() => setShowDetails(!showDetails)}
    >
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

      {showDetails && (
        <div className="extraDetails">
          <p className="cardText">
            <strong>Hauptstadt:</strong> {capital}
          </p>
          <p className="cardText">
            <strong>Unterregion:</strong> {subregion}
          </p>
          <p className="cardText">
            <strong>Kontinent:</strong> {continent}
          </p>
          <p className="cardText">
            <strong>Sprachen:</strong> {languages}
          </p>
          <p className="cardText">
            <strong>Währung:</strong> {currencies}
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={e => {
          e.stopPropagation()
          onToggleFavorite()
        }}
        className={`likeButton ${isFavorite ? "liked" : ""}`}
      >
        {isFavorite ? "🤍" : "🤍"}
      </button>
    </div>
  )
}
