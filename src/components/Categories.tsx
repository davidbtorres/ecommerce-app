import React, { useState } from 'react'
import './../css/categories.css'
import { Link } from 'react-router-dom'
import useCategoriesQuery from '../hooks/useCategoriesQuery'
import useProductsQuery from '../hooks/useProductsQuery'

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categoriesQuery = useCategoriesQuery()
  const productsQuery = useProductsQuery()

  const categories = categoriesQuery.data || []
  const products = productsQuery.data || []
  const isLoading = categoriesQuery.isLoading || productsQuery.isLoading
  const isError = categoriesQuery.isError || productsQuery.isError

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
        <div className='mt-4 mb-4'>
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
          <div className="container mx-auto px-20 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(selectedCategory === 'all'
                ? products
                : products.filter(
                    (product) => product.category === selectedCategory
                  )
              ).map((product) => (
                <Link to={`/product/${product.id}`} key={product.id}>
                  <div className="overflow-hidden bg-white p-4 h-full flex flex-col items-center rounded-lg transition-all duration-300 hover:border-black border border-transparent hover:border-solid shadow-lg">
                    <img className="object-contain max-h-48 w-full mb-4" src={product.image} alt={product.title} />
                    <h3 className='text-lg font-medium overflow-hidden line-clamp-1' title={product.title}>{product.title}</h3>
                    <p className='text-gray-700'>${product.price}</p>
                  </div>
                </Link>
              ))}
              </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default Categories
