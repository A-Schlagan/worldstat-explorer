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
    <div className="countryCard" style={{ position: "relative" }}>
      
      <img 
        src={country.flags.svg} 
        alt={`Flagge von ${country.name.common}`} 
        style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "5px" }} 
      />
      <h3 style={{ margin: "15px 0 10px 0" }}>{country.name.common}</h3>
      
      <div style={{ fontSize: "0.9rem", marginTop: "auto", textAlign: "left", paddingRight: "40px" }}>
        <p style={{ margin: "5px 0" }}>
          <strong>Einwohner:</strong> {country.population.toLocaleString()}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Fläche:</strong> {area.toLocaleString()} km²
        </p>
        <p style={{ margin: "5px 0", paddingBottom: "5px" }}>
          <strong>Dichte:</strong>{" "}
          <span style={{ 
            color: "#0a192f", 
            backgroundColor: densityColor, 
            padding: "2px 8px", 
            borderRadius: "12px",
            fontWeight: "bold"
          }}>
            {density.toFixed(1)} / km²
          </span>
        </p>
      </div>

      <span 
        onClick={onToggleFavorite}
        className={`likeButton ${isFavorite ? "liked" : ""}`}
        title="Zu Favoriten hinzufügen/entfernen"
      >
        {isFavorite ? "🤍" : "🤍"}
      </span>

    </div>
  )
}