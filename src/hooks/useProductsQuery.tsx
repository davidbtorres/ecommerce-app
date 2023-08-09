import { useQuery } from 'react-query'
import ky from 'ky'

function useProductsQuery() {
  return useQuery('products', async () => {
    const response = ky.get('https://fakestoreapi.com/products')
    const data: ProductItem[] = await response.json()
    return data
  })
}

export default useProductsQuery
