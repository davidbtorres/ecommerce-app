import React, { useEffect, useState } from 'react'
import ky from 'ky'

function ProductList() {
  const [products, setProducts] = useState<ProductItem[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = ky.get('https://fakestoreapi.com/products')
        const data: ProductItem[] = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
