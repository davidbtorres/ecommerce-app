import './App.css';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Product from './components/Product';
import Cart from './components/Cart';
import { useState } from 'react';

function App() {

  // routing handler
  const currentPath = window.location.pathname;

  let content = null;
  if (currentPath === '/categories') {
    content = <Categories />;
  } else if (currentPath.startsWith('/product/')) {
    const productId = currentPath.substring('/product/'.length);
    content = <Product productId={productId} />;
  }

  // cart handler
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    console.log(isCartOpen);
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="App">
      <Navbar onCartButtonClick={toggleCart}/>
      {isCartOpen && <Cart onClose={toggleCart}/>}
      {content}
    </div>
  )
}

export default App
