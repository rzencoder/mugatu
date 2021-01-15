import { useState, useContext, createContext } from 'react'

const wishlistContext = createContext({})

export function ProvideWishlist({ children }): JSX.Element {
  const wishlist = useProvideWishlist()
  return <wishlistContext.Provider value={wishlist}>{children}</wishlistContext.Provider>
}

export const useWishlist = (): any => {
  return useContext(wishlistContext)
}

const useProvideWishlist = () => {
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (item) => {
    if (!wishlist.some((product) => product.id === item.id)) {
      setWishlist([...wishlist, item])
      return true
    } else {
      return false
    }
  }

  const removeFromWishlist = (item) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== item.id)
    setWishlist(updatedWishlist)
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } as const
}
