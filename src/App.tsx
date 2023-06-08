import './App.css'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'
import Route from './components/Route'
import { useState, useMemo } from 'react'
import ProductList from './components/ProductList'

function App() {
  // state variables
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartProducts, setCartProducts] = useState<ProductItem[]>([])
  const cartCount = useMemo(() => {
    return cartProducts.reduce((count, product) => count + product.quantity, 0)
  }, [cartProducts])

  // cart handling
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const handleAddToCart = (newProduct: ProductItem) => {
    setCartProducts((prevProducts) =>
      prevProducts.some((p) => p.id === newProduct.id)
        ? // we have a product that is already in array (dup item) - return every other array item as normal but return dup item with incremented quantity
          prevProducts.map((p) =>
            p.id === newProduct.id ? { ...p, quantity: p.quantity + 1 } : p
          )
        : // if product is new, add to end of list with quantity of 1
          [...prevProducts, { ...newProduct, quantity: 1 }]
    )
  }

  const handleRemoveFromCart = (product: ProductItem) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id)
    )
  }

  return (
    <div className="App">
      <Navbar onCartButtonClick={toggleCart} cartCount={cartCount} />
      {isCartOpen ? (
        <Cart
          cartProducts={cartProducts}
          onClose={toggleCart}
          onRemoveProduct={handleRemoveFromCart}
        />
      ) : null}
      <Route path={'/'} component={ProductList} />
      <Route path={'/categories'} component={Categories} />
      <Route
        path={'/product/:id'}
        component={ProductPage}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default App
