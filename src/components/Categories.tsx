import React, { useState } from 'react'
import './../css/categories.css'
import { Link } from 'react-router-dom'
import ky from 'ky'
import { useQuery } from 'react-query'

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categoriesQuery = useQuery('categories', fetchCategories)
  const productsQuery = useQuery('products', fetchProducts)

  const categories = categoriesQuery.data || []
  const products = productsQuery.data || []
  const isLoading = categoriesQuery.isLoading || productsQuery.isLoading
  const isError = categoriesQuery.isError || productsQuery.isError

  async function fetchCategories() {
    const response = ky.get('https://fakestoreapi.com/products/categories')
    const data: Category[] = await response.json()
    return data
  }

  async function fetchProducts() {
    const response = ky.get('https://fakestoreapi.com/products')
    const data: ProductItem[] = await response.json()
    return data
  }

  // select filter
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <div>
          <ul>
            {/* Render category links */}
            <li>
              <button onClick={() => handleCategoryClick('all')}>All</button>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <button onClick={() => handleCategoryClick(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>

          {/* Render products based on selected category */}
          <div className="product-grid">
            {(selectedCategory === 'all'
              ? products
              : products.filter(
                  (product) => product.category === selectedCategory
                )
            ).map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="product-card">
                  <img src={product.image} alt={product.title} />
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories
