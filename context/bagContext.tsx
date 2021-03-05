import { BagItem } from '@/types/bagItem'
import { useState, useContext, createContext } from 'react'

interface Result {
  title: string
  message: string
  status: string
}

interface BagContextInterface {
  bag: BagItem[]
  fetchBag: () => Promise<void>
  fetchBagOnSignIn: () => Promise<void>
  addToBag: (item: BagItem, signedIn?: boolean) => Promise<Result>
  removeFromBag: (item: BagItem, signedIn?: boolean) => Promise<Result>
}

const bagContext = createContext<BagContextInterface | null>(null)

export function ProvideBag({ children }: { children: React.ReactNode }): JSX.Element {
  const bag = useProvideBag()
  return <bagContext.Provider value={bag}>{children}</bagContext.Provider>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBag = () => {
  return useContext(bagContext)
}

const useProvideBag = () => {
  const [bag, setBag] = useState([])

  const fetchBag = async () => {
    try {
      const result = await fetch('/api/bag/')
      const data = await result.json()
      setBag(data.bag)
    } catch {
      console.log('error')
    }
  }

  const fetchBagOnSignIn = async () => {
    if (bag.length > 0) {
      // Combine guest shopping bag with users saved bag
      try {
        const response = await fetch('/api/bag/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bag, route: 'fetchBagOnSignIn' }),
        })
        const data = await response.json()
        console.log(data)
        setBag(data.bag)
      } catch {
        console.log('there was an error fetching your shopping bag')
      }
    } else {
      try {
        await fetchBag()
      } catch {
        console.log('there was an error fetching your shopping bag')
      }
    }
  }

  const addToBag = async (item: BagItem, signedIn = false) => {
    if (signedIn) {
      try {
        const response = await fetch('/api/bag/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        })
        const data = await response.json()
        setBag(data.bag)
        return {
          title: 'Item Added!',
          message: 'Your item has been added to your shopping bag',
          status: 'success',
        }
      } catch {
        return {
          title: 'Error!',
          message: 'There was an error adding your item',
          status: 'error',
        }
      }
    } else {
      const filteredBag = bag.filter((product: BagItem) => product.id !== item.id)
      setBag([...filteredBag, item])
      return {
        title: 'Item Added!',
        message: 'Your item has been added to your shopping bag',
        status: 'success',
      }
    }
  }

  const removeFromBag = async (item: BagItem, signedIn = false) => {
    if (!signedIn) {
      const updatedBag = bag.filter((el: BagItem) => el.id !== item.id)
      setBag(updatedBag)
      return {
        title: 'Item Removed!',
        message: 'Your item has been removed from your shopping bag',
        status: 'success',
      }
    } else {
      try {
        const response = await fetch('/api/bag/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        })
        const data = await response.json()
        const updatedBag = bag.filter((el: BagItem) => el.id !== item.id)
        setBag(updatedBag)
        return {
          title: 'Item Removed!',
          message: data.message,
          status: 'success',
        }
      } catch {
        return {
          title: 'Error!',
          message: 'There was an error removing your item',
          status: 'error',
        }
      }
    }
  }

  return {
    bag,
    fetchBag,
    fetchBagOnSignIn,
    addToBag,
    removeFromBag,
  } as const
}
