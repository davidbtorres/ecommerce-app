import { useQuery } from 'react-query'
import ky from 'ky'

function useProductQuery(productId: string) {
  return useQuery('product', async () => {
    const response = ky.get(`https://fakestoreapi.com/products/${productId}`)
    const data: ProductItem = await response.json()
    return data
  })
}

export default useProductQuery
