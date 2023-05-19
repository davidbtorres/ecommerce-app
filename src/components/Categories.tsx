import React, { useEffect, useState } from 'react';
import './../css/categories.css';

// product type def - need to make global
interface Product {
    id: string;
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

    // fetch array of categories for selectable filters
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

    // fetch array of product objects for display based on current filter
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

    // select filter
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
                    <a href={`/product/${product.id}`} key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                    </a>
                ))}
            </div>
        ) : (
            // Render products for selected category
            <div className="product-grid">
                {products
                .filter((product) => product.category === selectedCategory)
                .map((product) => (
                    <a href={`/product/${product.id}`} key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>${product.price}</p>
                    </a>
            ))}
            </div>
        )}
        </div>
    );
}

export default Categories;
