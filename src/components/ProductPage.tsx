import ky from 'ky'
import { useQuery } from 'react-query'
import './../css/product.css'

type ProductPageProps = {
  onAddToCart: (product: ProductItem) => void
}

function ProductPage({ onAddToCart }: ProductPageProps) {
  const productQuery = useQuery('product', fetchProduct)

  const product = productQuery.data || null
  const isLoading = productQuery.isLoading
  const isError = productQuery.isError

  const productId = window.location.pathname.split('/product/')[1]
  async function fetchProduct() {
    const response = ky.get(`https://fakestoreapi.com/products/${productId}`)
    const data: ProductItem = await response.json()
    return data
  }

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
