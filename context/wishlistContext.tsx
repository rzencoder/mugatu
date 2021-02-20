import { Item } from '@/types/item'
import { useState, useContext, createContext } from 'react'

interface Result {
  title: string
  message: string
  status: string
}

interface WishlistContextInterface {
  wishlist: Item[]
  addToWishlist: (item: Item) => Result
  removeFromWishlist: (item: Item) => Result
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
      return {
        title: 'Item Saved!',
        message: 'Your item has been saved to your wishlist',
        status: 'success',
      }
    } else {
      return {
        title: 'Error!',
        message: 'Your item is already saved in your wishlist',
        status: 'error',
      }
    }
  }

  const removeFromWishlist = (item: Item) => {
    const updatedWishlist = wishlist.filter((product) => product.id !== item.id)
    if (wishlist.length !== updatedWishlist.length) {
      setWishlist(updatedWishlist)
      return {
        title: 'Item Removed!',
        message: 'Your item has been removed from your wishlist',
        status: 'success',
      }
    } else {
      return {
        title: 'Error!',
        message: 'There was an error removing your item',
        status: 'error',
      }
    }
  }

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } as const
}
