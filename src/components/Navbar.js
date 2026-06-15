import React, { useState, useEffect } from "react"
import { Link } from "gatsby"

// WICHTIG: Navbar() wurde funktional entwickelt (NICHT klassenbasiert!)
export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
      setIsDarkMode(false)
      document.body.classList.add("light-mode")
    }
  }, [])

  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.add("light-mode")
      localStorage.setItem("theme", "light")
      setIsDarkMode(false)
    } else {
      document.body.classList.remove("light-mode")
      localStorage.setItem("theme", "dark")
      setIsDarkMode(true)
    }
  }
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav
      className="navbar"
      style={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <button
        className="hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menü umschalten"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>
      <div className={`navLinksContainer ${isMenuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className="navLink"
          activeClassName="activeNavLink"
          onClick={closeMenu}
        >
          Dashboard
        </Link>
        <Link
          to="/stats"
          className="navLink"
          activeClassName="activeNavLink"
          onClick={closeMenu}
        >
          Statistiken
        </Link>
        <Link
          to="/quiz"
          className="navLink"
          activeClassName="activeNavLink"
          onClick={closeMenu}
        >
          Flaggen-Quiz
        </Link>
      </div>
      <button onClick={toggleTheme} className="themeToggleBtn">
        {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </nav>
  )
}
