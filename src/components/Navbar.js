import React from "react"
import { Link } from "gatsby"

export default function Navbar(){
    return(
        <nav className="navbar">
            <Link to="/" className="navLink" activeClassName="activeNavLink">
                Dashboard
            </Link>
            <Link to="/stats" className="navLink" activeClassName="activeNavLink">
                Statistiken
            </Link>
        </nav>
    )
}