import React from 'react';
import './../css/navbar.css';

function Link({ to, children }: { to: string; children: React.ReactNode }) {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      window.location.href = to;
    };
  
    return (
      <a href={to} onClick={handleClick}>
        {children}
      </a>
    );
}

function Navbar() {
  return (
    <nav>
      <a className="logo" href='/'>
        <div>E-Commerce App</div>
      </a>
      <div className="search-bar">
        {/* Search bar component or input field */}
      </div>
      <div className="site-links">
        {/* Site section links */}
        <Link to="/categories">Categories</Link>
      </div>
      <div className="cart-icon">
        {/* Cart icon component */}
      </div>
      <div className="user-profile">
        {/* User profile icon component */}
      </div>
    </nav>
  );
}

export default Navbar;
