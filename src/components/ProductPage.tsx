import React, { useEffect, useState } from 'react'
import ky from 'ky'
import './../css/product.css'

interface ProductPageProps {
  onAddToCart: (product: ProductItem) => void
}

function ProductPage({ onAddToCart }: ProductPageProps) {
  const [product, setProduct] = useState<ProductItem | null>(null)
  const productId = window.location.pathname.split('/product/')[1]

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = ky.get(
          `https://fakestoreapi.com/products/${productId}`
        )
        const data: ProductItem = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [])

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product)
    }
  }

  return (
    <div className="product">
      {product ? (
        <>
          {/* will not leave 'div' in the markup - same as <React.Fragment> */}
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-details">
            <h2>{product.title}</h2>
            <p>Price: {product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ProductPage
