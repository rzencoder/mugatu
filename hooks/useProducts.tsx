/* eslint-disable @typescript-eslint/no-explicit-any */
import { Item } from '@/types/item'
import useSWR from 'swr'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetcher = async (input: RequestInfo, init: RequestInit, ...args: any[]) => {
  const res = await fetch(input, init)
  return res.json()
}

interface UseProductsInterface {
  data: {
    products: Item[]
  }
  isLoading: boolean
  isError: string
}

export default function useProducts(query: string): UseProductsInterface {
  const { data, error } = useSWR(`/api/filter?${query}`, fetcher)
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
