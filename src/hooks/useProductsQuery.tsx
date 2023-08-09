import withQuery from './withQuery'

function useProductsQuery() {
  return withQuery<ProductItem[]>(
    'products',
    'https://fakestoreapi.com/products'
  )
}

export default useProductsQuery
