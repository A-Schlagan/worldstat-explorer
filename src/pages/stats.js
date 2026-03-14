import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar.js"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts"
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
                <h2 className="loadingText">Lade Statistiken... </h2>
            </main>
        )
    }

    const topPopulated = [...countries].sort((a, b) => b.population - a.population).slice(0, 10)
    const topArea = [...countries].sort((a, b) => (b.area || 0) - (a.area || 0)).slice(0, 10)
    const totalPopulation = countries.reduce((sum, country) => sum + country.population, 0)
    const regionCounts = countries.reduce((acc, country) => {
        const region = country.region || "Andere"
        acc[region] = (acc[region] || 0) + 1
        return acc
    }, {})

    const COLORS = ["#64ffda", "#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

    const regionTranslations = {
        "Europe": "Europa",
        "Asia": "Asien",
        "Africa": "Afrika",
        "Americas": "Amerika",
        "Oceania": "Ozeanien",
        "Antarctic": "Antarktis",
        "Andere": "Andere"
    }

    const pieData = Object.keys(regionCounts).map((key, index) => ({
        name: regionTranslations[key] || key,
        value: regionCounts[key],
        fill: COLORS[index % COLORS.length]
    }))

    return (
        <main className="mainStyle">
            <Navbar />
            <h1>Welt-Statistiken</h1>

            <div className="countryCard statsMapCard">
                <div className="mapContainer" style={{ backgroundColor: "#0a192f"}}>
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
                            <h3 className="selectedCountryTitle">{selectedCountry.name.common}</h3>
                            <p className="selectedCountryText">
                                <strong>Einwohner:</strong> {typeof selectedCountry.population === "number" ? selectedCountry.population.toLocaleString() : selectedCountry.population} <br />
                                <strong>Fläche:</strong> {typeof selectedCountry.area === "number" ? `${selectedCountry.area.toLocaleString()} km²` : selectedCountry.area}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="countryCard totalPopCard">
                <h2 className="totalPopTitle">
                    {totalPopulation.toLocaleString()}
                </h2>
                <p className="totalPopText">Menschen leben insgesamt auf unserer Erde.</p>
            </div>

            <div className="statsGrid">
                {/* Top 10 Einwohner */}
                <div className="countryCard statsListCard">
                    <h3 className="statsListHeader">Top 10 nach Einwohnern</h3>
                    <div className="statsListContainer">
                        {topPopulated.map((country, index) => (
                            <div key={index} className="statItem">
                                <div className="statItemDetails">
                                    <strong className="statItemName">{index + 1}. {country.name.common}</strong>
                                    <span className="statItemValue">{country.population.toLocaleString()}</span>
                                </div>
                                <div className="statBarTrack">
                                    <div
                                        className="statBarFill popBar"
                                        style={{ width: `${(country.population / topPopulated[0].population) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top 10 Fläche */}
                <div className="countryCard statsListCard">
                    <h3 className="statsListHeader areaHeader">Top 10 nach Fläche</h3>
                    <div className="statsListContainer">
                        {topArea.map((country, index) => (
                            <div key={index} className="statItem">
                                <div className="statItemDetails">
                                    <strong className="statItemName">{index + 1}. {country.name.common}</strong>
                                    <span className="statItemValue">{country.area.toLocaleString()} km²</span>
                                </div>
                                <div className="statBarTrack">
                                    <div
                                        className="statBarFill areaBar"
                                        style={{ width: `${(country.area / topArea[0].area) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tortendiagramm */}
                <div className="countryCard statsPieCard">
                    <h3 className="statsListHeader pieHeader">Länder pro Kontinent</h3>
                    <div className="pieChartContainer">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#0a192f", border: "1px solid #233554", borderRadius: "8px", color: "#ccd6f6" }}
                                    itemStyle={{ color: "#64ffda" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </main>
    )
}