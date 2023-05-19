import './App.css';
import Navbar from './components/Navbar';
import Categories from './components/Categories';
import Product from './components/Product';

function App() {
  const currentPath = window.location.pathname;

  let content = null;
  if (currentPath === '/categories') {
    content = <Categories />;
  } else if (currentPath.startsWith('/product/')) {
    const productId = currentPath.substring('/product/'.length);
    content = <Product productId={productId} />;
  }

  return (
    <div className="App">
      <Navbar/>
      {content}
    </div>
  )
}

export default App
