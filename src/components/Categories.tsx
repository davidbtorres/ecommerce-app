import React, { useEffect, useState } from 'react';
import './../css/categories.css';

interface Product {
    id: number;
    image: string;
    title: string;
    price: number;
    category: string;
    description: string;
  }

function Categories() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  console.log(categories);
  console.log(selectedCategory);
  
  return (
    <div>
      <ul>
        {/* Render category links */}
        <li>
            <button onClick={() => handleCategoryClick('all')}>All</button>
        </li>
        {categories.map((category) => (
          <li key={category}>
            <button onClick={() => handleCategoryClick(category)}>{category}</button>
          </li>
        ))}
      </ul>

      {/* Render products based on selected category */}
      {selectedCategory === 'all' ? (
        // Render all products
        <div className="product-grid">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
      ) : (
        // Render products for selected category
        <div className="product-grid">
            {products
            .filter((product) => product.category === selectedCategory)
            .map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                </div>
        ))}
        </div>
      )}
    </div>
  );
}

export default Categories;
