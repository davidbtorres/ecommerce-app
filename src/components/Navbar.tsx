import React from 'react'
import Link from './Link'
import './../css/navbar.css'

interface NavbarProps {
  onCartButtonClick: () => void
  cartCount: number
}

/* moved into Link.tsx */
// function Link({ to, children }: { to: string; children: React.ReactNode }) {
//   const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
//     event.preventDefault()
//     window.location.href = to
//   }

//   return (
//     <a href={to} onClick={handleClick}>
//       {children}
//     </a>
//   )
// }

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
      <div className="user-profile">{/* User profile icon component */}</div>
    </nav>
  )
}

export default Navbar
