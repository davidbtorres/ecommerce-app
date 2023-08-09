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
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
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
      )}
    </div>
  )
}

export default ProductPage
