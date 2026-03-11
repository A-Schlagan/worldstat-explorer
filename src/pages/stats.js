import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar.js"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import "../styles/global.css"

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"

export default function Stats() {
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedCountry, setSelectedCountry] = useState(null)

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,population,area,region")
                const data = await response.json()
                setCountries(data)
                setIsLoading(false)
            } catch (error) {
                console.error("Fehler beim Laden", error)
                setIsLoading(false)
            }
        }
        fetchCountries()
    }, [])

    if (isLoading) {
        return (
            <main className="mainStyle">
                <Navbar />
                <h2 style={{ color: "#ccd6f6" }}>Lade Statistiken... </h2>
            </main>
        )
    }

    const topPopulated = [...countries].sort((a, b) => b.population - a.population).slice(0, 10)
    const topArea = [...countries].sort((a, b) => (b.area || 0) - (a.area || 0)).slice(0, 10)
    const totalPopulation = countries.reduce((sum, country) => sum + country.population, 0)

    return (
        <main className="mainStyle">
            <Navbar />
            <h1>Welt-Statistiken</h1>

      <div className="countryCard" style={{ marginBottom: "30px", padding: "20px", backgroundColor: "#112240" }}>
        <div style={{ width: "100%", height: "400px", overflow: "hidden", borderRadius: "8px", backgroundColor: "#0a192f" }}>
          
          <ComposableMap projectionConfig={{ scale: 300 }} style={{ width: "100%", height: "100%" }}>
            <ZoomableGroup>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => {
                        const clickedName = geo.properties.name;
                        const found = countries.find(c => 
                          c.name.common.includes(clickedName) || clickedName.includes(c.name.common)
                        );
                        
                        if (found) {
                          setSelectedCountry(found);
                        } else {
                          setSelectedCountry({
                            name: { common: clickedName },
                            population: "Keine Infos",
                            area: "Keine Infos"
                          });
                        }
                      }}
                      style={{
                        default: { fill: "#233554", stroke: "#0a192f", strokeWidth: 0.5, outline: "none" },
                        hover: { fill: "#64ffda", stroke: "#0a192f", strokeWidth: 1, outline: "none", cursor: "pointer" },
                        pressed: { fill: "#3b82f6", outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {selectedCountry && (
          <div className="selectedCountry">
            <div>
              <h3 style={{ margin: "0 0 5px 0", color: "#64ffda" }}>{selectedCountry.name.common}</h3>
              <p style={{ margin: 0, color: "#ccd6f6", fontSize: "0.9rem" }}>
                <strong>Einwohner:</strong> {typeof selectedCountry.population === "number" ? selectedCountry.population.toLocaleString() : selectedCountry.population} <br/>
                <strong>Fläche:</strong> {typeof selectedCountry.area === "number" ? `${selectedCountry.area.toLocaleString()} km²` : selectedCountry.area}
              </p>
            </div>
          </div>
        )}

      </div>

            <div className="countryCard" style={{ marginBottom: "30px", padding: "30px", backgroundColor: "#233554" }}>
                <h2 style={{ color: "#64ffda", margin: "0 0 10px 0", fontSize: "2.5rem" }}>
                    {totalPopulation.toLocaleString()}
                </h2>
                <p style={{ color: "#ccd6f6", margin: 0, fontSize: "1.1rem" }}>Menschen leben insgesamt auf unserer Erde.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>

                <div className="countryCard" style={{ alignItems: "flex-start", textAlign: "left" }}>
                    <h3 style={{ color: "#64ffda", marginTop: 0 }}>Top 10 nach Einwohnern</h3>
                    <div style={{ width: "100%" }}>
                        {topPopulated.map((country, index) => (
                            <div key={index} style={{ marginBottom: "15px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                    <strong style={{ color: "#e2e8f0" }}>{index + 1}. {country.name.common}</strong>
                                    <span style={{ color: "#a8b2d1" }}>{country.population.toLocaleString()}</span>
                                </div>

                                <div style={{ width: "100%", height: "8px", backgroundColor: "#0a192f", borderRadius: "4px" }}>
                                    <div style={{

                                        width: `${(country.population / topPopulated[0].population) * 100}%`,
                                        height: "100%",
                                        backgroundColor: "#64ffda",
                                        borderRadius: "4px",
                                        transition: "width 1s ease-out"
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="countryCard" style={{ alignItems: "flex-start", textAlign: "left" }}>
                    <h3 style={{ color: "#ccd6f6", marginTop: 0 }}>Top 10 nach Fläche</h3>
                    <div style={{ width: "100%" }}>
                        {topArea.map((country, index) => (
                            <div key={index} style={{ marginBottom: "15px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                                    <strong style={{ color: "#e2e8f0" }}>{index + 1}. {country.name.common}</strong>
                                    <span style={{ color: "#a8b2d1" }}>{country.area.toLocaleString()} km²</span>
                                </div>

                                <div style={{ width: "100%", height: "8px", backgroundColor: "#0a192f", borderRadius: "4px" }}>
                                    <div style={{
                                        width: `${(country.area / topArea[0].area) * 100}%`,
                                        height: "100%",
                                        backgroundColor: "#3b82f6",
                                        borderRadius: "4px",
                                        transition: "width 1s ease-out"
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}