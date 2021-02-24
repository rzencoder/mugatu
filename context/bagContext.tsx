import { BagItem } from '@/types/bagItem'
import { useState, useContext, createContext } from 'react'

interface Result {
  title: string
  message: string
  status: string
}

interface BagContextInterface {
  bag: BagItem[]
  addToBag: (item: BagItem) => Result
  updateBag: (item: BagItem) => void
  removeFromBag: (item: BagItem) => Result
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

  const addToBag = (item: BagItem) => {
    const filteredBag = bag.filter((product: BagItem) => product.id !== item.id)
    const newBag = [...filteredBag, item]
    if (newBag) {
      setBag(newBag)
      return {
        title: 'Item Added!',
        message: 'Your item has been added to your shopping bag',
        status: 'success',
      }
    } else {
      return {
        title: 'Error!',
        message: 'There was an error adding your item',
        status: 'error',
      }
    }
  }

  const updateBag = (item: BagItem) => {
    const filteredBag = bag.filter((product: BagItem) => product.id !== item.id)
    const updatedBag = [...filteredBag, item]
    setBag(updatedBag)
  }

  const removeFromBag = (item: BagItem) => {
    const updatedBag = bag.filter((el: BagItem) => el.id !== item.id)
    if (updatedBag.length !== bag.length) {
      setBag(updatedBag)
      return {
        title: 'Item Removed!',
        message: 'Your item has been removed from your shopping bag',
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
    bag,
    addToBag,
    updateBag,
    removeFromBag,
  } as const
}
