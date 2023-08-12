import './App.css'
import Navbar from './components/Navbar'
import Categories from './components/Categories'
import Product from './pages/Product'
import Cart from './components/Cart'
import { useState, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  // state variables
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartProducts, setCartProducts] = useState<ProductItem[]>([])
  const cartCount = useMemo(() => {
    return cartProducts.reduce((count, product) => count + product.quantity, 0)
  }, [cartProducts])

  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User>()

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

  const handleAddUser = (newUser: User) => {
    const duplicateUser = users.find((user) => user.email === newUser.email)
    if (duplicateUser) {
      console.error('ERROR: email already in use.')
    } else {
      setUsers((prevUsers) => [...prevUsers, newUser])
    }
    console.log(users)
  }

  const handleSignIn = (creds: Creds) => {
    const existingUser = users.find((users) => users.email === creds.email)
    if (existingUser) {
      setCurrentUser(existingUser)
      console.log(`SUCCESS: signed in as ${currentUser?.name}`)
    } else {
      console.error('ERROR: user does not exist.')
    }
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
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/categories'} element={<Categories />} />
        <Route
          path={'/product/:productId'}
          element={<Product onAddToCart={handleAddToCart} />}
        />
        <Route path={'/signin'} element={<SignIn signIn={handleSignIn} />} />
        <Route path={'/signup'} element={<SignUp addUser={handleAddUser} />} />
      </Routes>
    </div>
  )
}

export default App
