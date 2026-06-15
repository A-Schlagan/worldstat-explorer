import React, { useState, useEffect } from "react"
import CountryCard from "../components/CountryCard.js"
import RegionSelector from "../components/RegionSelector.js"
import SortSelector from "../components/SortSelector.js"
import Navbar from "../components/Navbar.js"
import "../styles/global.css"

export default function Home() {
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [displayCount, setDisplayCount] = useState(20)
  const [sortType, setSortType] = useState("name-asc")
  const [favorites, setFavorites] = useState([])

  const toggleFavorite = (countryName) => {
    if (favorites.includes(countryName)) {
      setFavorites(favorites.filter(name => name !== countryName))
    } else {
      setFavorites([...favorites, countryName])
    }
  }

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/mledoze/countries/master/countries.json")
      
      if (!response.ok) {
        throw new Error(`HTTP Fehler! Status: ${response.status}`)
      }

      const result = await response.json()
      
      if (Array.isArray(result)) {
        setCountries(result)
      } else {
        console.error("Unerwartetes Datenformat:", result)
        setCountries([])
      }
    } catch (error) {
      console.error("Fehler beim Laden:", error)
      setCountries([])
    } finally {
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

  const sortedAndFilteredCountries = [...filteredCountries].sort((a, b) => {
    const densityA = a.area > 0 ? a.population / a.area : 0;
    const densityB = b.area > 0 ? b.population / b.area : 0;

    switch (sortType) {
      case "name-asc": return a.name.common.localeCompare(b.name.common);
      case "name-desc": return b.name.common.localeCompare(a.name.common);
      case "pop-asc": return a.population - b.population;
      case "pop-desc": return b.population - a.population;
      case "area-asc": return (a.area || 0) - (b.area || 0);
      case "area-desc": return (b.area || 0) - (a.area || 0);
      case "density-asc": return densityA - densityB;
      case "density-desc": return densityB - densityA;
      default: return 0;
    }
  });

  const hasMore = displayCount < filteredCountries.length

  if (isLoading) {
    return <main className="mainStyle"><h2 className="loadingText">Lade Länder...</h2></main>
  }

  return (
    <main className="mainStyle">
      <Navbar />
      <h1>WorldStat Explorer</h1>

      <div className="controlsContainer">
        <input
          type="text"
          placeholder="Suche nach Land ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchTerm"
        />

        <RegionSelector selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        <SortSelector sortType={sortType} setSortType={setSortType} />

        <span className="counterBadge">
          {filteredCountries.length} Länder gefunden
        </span>
      </div>

      <div className="countryGrid">
        {sortedAndFilteredCountries.slice(0, displayCount).map((country, index) => (
          <CountryCard
            key={index}
            country={country}
            isFavorite={favorites.includes(country.name.common)}
            onToggleFavorite={() => toggleFavorite(country.name.common)}
          />
        ))}
      </div>

      {hasMore && (
        <p className="loadMoreText">Scrolle für mehr Länder...</p>
      )}
    </main>
  )
}