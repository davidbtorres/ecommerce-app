import withQuery from './withQuery'

function useProductQuery(productId: string | undefined) {
  return withQuery<ProductItem>(
    ['product', productId],
    `https://fakestoreapi.com/products/${productId}`
  )
}

export default useProductQuery
