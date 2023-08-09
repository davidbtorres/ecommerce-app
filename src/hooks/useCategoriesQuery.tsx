import { useQuery } from 'react-query'
import ky from 'ky'

function useCategoriesQuery() {
  return useQuery('categories', async () => {
    const response = ky.get('https://fakestoreapi.com/products/categories')
    const data: Category[] = await response.json()
    return data
  })
}

export default useCategoriesQuery
