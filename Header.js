import React from 'react'
import './Header.css'
import logo from '../assets/Images/aress-logo.png'

// Header component
export default function Header() {
  return (
    <div>
      <header className="main-header fixed-top">
        <nav className="navbar navbar-expand-md">
          <div className="container">
            <a className="navbar-brand" href="#"><img src={logo}></img></a>
          </div>
        </nav>
      </header>
    </div>
  )
}
