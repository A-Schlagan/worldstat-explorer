import React, { useState, useEffect } from "react"
import CountryCard from "../components/CountryCard.js"
import RegionSelector from "../components/RegionSelector.js"
import "../styles/global.css"

export default function Home() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [displayCount, setDisplayCount] = useState(20)

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,area")
      const data = await response.json()
      const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
      setCountries(sortedData)
      setIsLoading(false)
    } catch (error) {
      console.error("fehler beim Laden", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 50 >= document.documentElement.scrollHeight) {
        setDisplayCount((prevCount) => prevCount + 20)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredCountries = countries.filter((country) => {
    const searchLower = searchTerm.trim().toLowerCase();
    const nameLower = country.name.common.toLowerCase();
    const matchesSearch = nameLower.includes(searchLower)
    const matchesRegion = selectedRegion === "" || country.region === selectedRegion
    return matchesSearch && matchesRegion
  });

  const hasMore = displayCount < filteredCountries.length

  if (isLoading) {
    return <main><h2>Lade Länder...</h2></main>
  }

  return (
    <main style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>WorldStat Explorer</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "20px", alignItems: "center" }}>

        <input
          type="text"
          placeholder="Suche nach Land oder Kontinent..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchTerm"
        />

        <RegionSelector selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />

        <span style={{ fontWeight: "bold", color: "#444", backgroundColor: "#e2e8f0", padding: "8px 12px", borderRadius: "5px" }}>
          {filteredCountries.length} Länder gefunden
        </span>

      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {filteredCountries.slice(0, displayCount).map((country, index) => (
          <CountryCard key={index} country={country} />
        ))}
      </div>
      {hasMore && (
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>Scrolle für mehr Länder...</p>
      )}
    </main>
  )






}