import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function useProducts(query) {
  const { data, error } = useSWR(`/api/filter?${query}`, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
