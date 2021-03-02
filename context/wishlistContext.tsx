import { Item } from '@/types/item'
import { useState, useContext, createContext } from 'react'

interface Result {
  title: string
  message: string
  status: string
}

interface WishlistContextInterface {
  wishlist: Item[]
  fetchWishlist: () => Promise<void | Result>
  addToWishlist: (item: Item) => Promise<Result>
  removeFromWishlist: (item: Item) => Result
}

const wishlistContext = createContext<WishlistContextInterface | null>(null)

export function ProvideWishlist({ children }: { children: React.ReactNode }): JSX.Element {
  const wishlist = useProvideWishlist()
  return <wishlistContext.Provider value={wishlist}>{children}</wishlistContext.Provider>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useWishlist = () => {
  return useContext(wishlistContext)
}

const useProvideWishlist = () => {
  const [wishlist, setWishlist] = useState([])

  const fetchWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist/')
      const { wishlist } = await response.json()
      setWishlist(wishlist)
    } catch {
      return {
        title: 'Error!',
        message: 'there was an error retrieving your wishlist',
        status: 'error',
      }
    }
  }

  const addToWishlist = async (item: Item) => {
    if (!wishlist.some((product) => product.id === item.id)) {
      try {
        const response = await fetch('/api/wishlist/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        })
        const { data } = await response.json()
        setWishlist([...wishlist, data])
        return {
          title: 'Item Saved!',
          message: 'Your item has been saved to your wishlist',
          status: 'success',
        }
      } catch {
        return {
          title: 'Error!',
          message: 'there was an error retrieving your wishlist',
          status: 'error',
        }
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
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
  } as const
}
