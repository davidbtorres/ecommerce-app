import { QueryKey, useQuery, UseQueryOptions } from 'react-query'
import ky from 'ky'

function withQuery<T>(
  queryKey: QueryKey,
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
    {
      enabled:
        !Array.isArray(queryKey) || queryKey.every((key) => key !== undefined),
      ...(options || {}),
    }
  )
}

export default withQuery
