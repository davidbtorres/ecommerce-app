import './App.css';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import { useState } from 'react';

interface ProductCartItem {
  id: string;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
  quantity: number;
}

function App() {
  // gett current route
  const currentPath = window.location.pathname;

  // state variables
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState<ProductCartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // cart handling
  const toggleCart = () => {
    console.log(isCartOpen);
    setIsCartOpen(!isCartOpen);
  };

  const handleAddToCart = (newProduct: ProductCartItem) => {
    setCartCount(cartCount + 1);

    setCartProducts((prevProducts) => {
      // if product in array matches product we are trying to add - remember it
      const existingProduct = prevProducts.find((p) => p.id === newProduct.id);

      if(existingProduct) {
        // we have a product that is already in array (dup item) - return every other array item as normal but return dup item with incremented quantity
        return prevProducts.map((p) =>
          p.id === newProduct.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      // if product is new, add to end of list with quantity of 1
      return [...prevProducts, { ...newProduct, quantity: 1}];
    });
  }

  const handleRemoveFromCart = (product: ProductCartItem) => {
    setCartCount(cartCount - product.quantity);

    setCartProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id)
    );
  };

  // routing handling
  let content = null;
  if (currentPath === '/categories') {
    content = <Categories />;
  } else if (currentPath.startsWith('/product/')) {
    const productId = currentPath.substring('/product/'.length);
    content = <ProductPage onAddToCart={handleAddToCart} productId={productId} />;
  }

  return (
    <div className="App">
      <Navbar onCartButtonClick={toggleCart} cartCount={cartCount}/>
      {isCartOpen && <Cart cartProducts={cartProducts} onClose={toggleCart} onRemoveProduct={handleRemoveFromCart}/>}
      {content}
    </div>
  )
}

export default App;
