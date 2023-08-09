import { useQuery, UseQueryOptions } from 'react-query'
import ky from 'ky'

function withQuery<T>(
  queryKey: string,
  url: string,
  options?: UseQueryOptions<T, unknown>
) {
  return useQuery<T, unknown>(
    queryKey,
    async () => {
      const response = await ky.get(url)
      const data: T = await response.json()
      return data
    },
    options
  )
}

export default withQuery
