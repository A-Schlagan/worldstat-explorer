import React, { useState, useEffect } from "react";
import { Link } from "gatsby"

export default function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            setIsDarkMode(false);
            document.body.classList.add("light-mode");
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.body.classList.add("light-mode");
            localStorage.setItem("theme", "light");
            setIsDarkMode(false);
        } else {
            document.body.classList.remove("light-mode");
            localStorage.setItem("theme", "dark");
            setIsDarkMode(true);
        }
    };

    return (
        <nav className="navbar" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: "30px" }}>
                <Link to="/" className="navLink" activeClassName="activeNavLink">
                    Dashboard
                </Link>
                <Link to="/stats" className="navLink" activeClassName="activeNavLink">
                    Statistiken
                </Link>
                <Link to="/quiz" className="navLink" activeClassName="activeNavLink">
                    Flaggen-Quiz
                </Link>
            </div>
            <button onClick={toggleTheme} className="themeToggleBtn">
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
        </nav>
    );
}