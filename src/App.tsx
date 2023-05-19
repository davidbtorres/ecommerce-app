import './App.css';
import Navbar from './components/Navbar';
import Categories from './components/Categories';

function App() {
  const currentPath = window.location.pathname;

  let content = null;
  if (currentPath === '/categories') {
    content = <Categories />;
  }

  return (
    <div className="App">
      <Navbar/>
      {content}
    </div>
  )
}

export default App
