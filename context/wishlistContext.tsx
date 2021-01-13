import { useState, useContext, createContext } from 'react'

const wishlistContext = createContext({})

export function ProvideWishlist({ children }: { children: any }): JSX.Element {
  const wishlist = useProvideWishlist()
  return <wishlistContext.Provider value={wishlist}>{children}</wishlistContext.Provider>
}

export const useWishlist = (): any => {
  return useContext(wishlistContext)
}

const useProvideWishlist = () => {
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (item: any) => {
    const newWishlist = [...wishlist, item]
    setWishlist(newWishlist)
  }

  const removeFromWishlist = (item) => {
    console.log(item)
    // To do
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } as const
}
