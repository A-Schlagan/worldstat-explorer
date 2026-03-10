import React, { useState, useEffect } from "react"
import CountryCard from "../components/CountryCard.js"
import "../styles/global.css"

export default function Home() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm]=useState("")

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,area")
      const data = await response.json()
      setCountries(data)
      setIsLoading(false)
    } catch (error) {
      console.error("fehler beim Laden", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const filteredCountries = countries.filter((country) => {
    const searchLower = searchTerm.trim().toLowerCase();
    const nameLower = country.name.common.toLowerCase();
    const regionLower = country.region ? country.region.toLowerCase() : "";

    return nameLower.includes(searchLower) || regionLower.includes(searchLower);
  });

  if (isLoading) {
    return <main><h2>Lade Länder...</h2></main>
  }

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>WorldStat Explorer</h1>

      <input 
        type="text" 
        placeholder="Suche nach Land oder Kontinent..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchTerm"
      />

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {filteredCountries.slice(0, 20).map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
      </div>
    </main>
  )






}