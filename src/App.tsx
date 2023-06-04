import './App.css'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'
import Route from './components/Route'
import { useState, useMemo } from 'react'
import ProductList from './components/ProductList'

interface ProductCartItem {
  id: string
  image: string
  title: string
  price: number
  category: string
  description: string
  quantity: number
}

function App() {
  // state variables
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartProducts, setCartProducts] = useState<ProductCartItem[]>([])
  const cartCount = useMemo(() => {
    return cartProducts.reduce((count, product) => count + product.quantity, 0)
  }, [cartProducts])

  // cart handling
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const handleAddToCart = (newProduct: ProductCartItem) => {
    // setCartCount(cartCount + 1); should no longer need due to memoization

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

  const handleRemoveFromCart = (product: ProductCartItem) => {
    // setCartCount(cartCount - product.quantity); should no longer need due to memoization

    setCartProducts((prevProducts) =>
      prevProducts.filter((p) => p.id !== product.id)
    )
  }

  // const navigate = (path: string) => {
  //   window.history.replaceState(null, '', path)
  // }

  // routing handling
  //let content = null

  // useEffect(() => {
  //   const currentPath = window.location.pathname

  //   navigate(currentPath)

  //   if (currentPath === '/categories') {
  //     content = <Categories />
  //   } else if (currentPath.startsWith('/product/')) {
  //     const productId = currentPath.substring('/product/'.length)
  //     content = (
  //       <ProductPage onAddToCart={handleAddToCart} productId={productId} />
  //     )
  //   }
  // }, [])

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
