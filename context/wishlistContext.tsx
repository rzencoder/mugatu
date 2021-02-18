import { Item } from '@/types/item'
import { useState, useContext, createContext } from 'react'

interface WishlistContextInterface {
  wishlist: Item[]
  addToWishlist: (item: Item) => boolean
  removeFromWishlist: (item: Item) => void
}

const wishlistContext = createContext<WishlistContextInterface | null>(null)

export function ProvideWishlist({ children }: { children: React.ReactNode }): JSX.Element {
  const wishlist = useProvideWishlist()
  return <wishlistContext.Provider value={wishlist}>{children}</wishlistContext.Provider>
}

export const useWishlist = () => {
  return useContext(wishlistContext)
}

const useProvideWishlist = () => {
  const [wishlist, setWishlist] = useState([])

  const addToWishlist = (item: Item) => {
    if (!wishlist.some((product) => product.id === item.id)) {
      setWishlist([...wishlist, item])
      return true
    } else {
      return false
    }
  }

  const removeFromWishlist = (item: Item) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== item.id)
    setWishlist(updatedWishlist)
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } as const
}
