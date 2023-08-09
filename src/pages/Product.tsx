import './../css/product.css'
import { useParams } from 'react-router-dom'
import useProductQuery from '../hooks/useProductQuery'

type ProductPageProps = {
  onAddToCart: (product: ProductItem) => void
}

function ProductPage({ onAddToCart }: ProductPageProps) {
  //const productId = window.location.pathname.split('/product/')[1]
  const { productId } = useParams<'productId'>()
  const productQuery = productId ? useProductQuery(productId) : null

  const product = productQuery?.data || null
  const isLoading = productQuery?.isLoading
  const isError = productQuery?.isError

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product)
    }
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <>
          {product ? (
            <div className="product-container">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-details">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p className="product-price-text">${product.price}</p>
                <div className="button-container">
                  <button className="product-button" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  )
}

export default ProductPage
