import useSWR from 'swr'

const fetcher = async (input: RequestInfo, init: RequestInit, ...args: any[]) => {
  const res = await fetch(input, init)
  return res.json()
}

export default function useProducts(query) {
  const { data, error } = useSWR(`/api/filter?${query}`, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
