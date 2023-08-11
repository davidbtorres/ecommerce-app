import withQuery from './withQuery'

function useCategoriesQuery() {
  return withQuery<Category[]>(
    'categories',
    'https://fakestoreapi.com/products/categories'
  )
}

export default useCategoriesQuery
