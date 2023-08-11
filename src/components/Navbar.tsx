import React from 'react'
import { Link } from 'react-router-dom'
import './../css/navbar.css'

type NavbarProps = {
  onCartButtonClick: () => void
  cartCount: number
}

function Navbar({ onCartButtonClick, cartCount }: NavbarProps) {
  return (
    <nav>
      <div className="logo">
        <Link to={'/'}>E-Commerce App</Link>
      </div>
      <div className="search-bar">
        {/* Search bar component or input field */}
      </div>
      <div className="site-links">
        {/* Site section links */}
        <Link to="/categories">Categories</Link>
      </div>
      <div className="cart-icon">
        <button onClick={onCartButtonClick}>Cart({cartCount})</button>
      </div>
      <div className="user-profile">
        <Link to="/signin">
          <p>sign in</p>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
