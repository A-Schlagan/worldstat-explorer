import React from "react"

// WICHTIG: SortSelector() wurde funktional entwickelt (NICHT klassenbasiert!)
export default function SortSelector({ sortType, setSortType }) {
  const sortOptions = [
    { label: "A-Z (Alphabetisch)", value: "name-asc" },
    { label: "Z-A (Alphabetisch)", value: "name-desc" },
    { label: "Einwohner (aufsteigend)", value: "pop-asc" },
    { label: "Einwohner (absteigend)", value: "pop-desc" },
    { label: "Fläche (aufsteigend)", value: "area-asc" },
    { label: "Fläche (absteigend)", value: "area-desc" },
    { label: "Dichte (aufsteigend)", value: "density-asc" },
    { label: "Dichte (absteigend)", value: "density-desc" },
  ]

  return (
    <select
      value={sortType}
      onChange={e => setSortType(e.target.value)}
      className="selectorRegion"
    >
      {sortOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
