import { BagItem } from '@/types/bagItem'
import { useState, useContext, createContext } from 'react'

interface BagContextInterface {
  bag: BagItem[]
  addToBag: (item: BagItem) => void
  updateBag: (item: BagItem) => void
  removeFromBag: (item: BagItem) => void
}

const bagContext = createContext<BagContextInterface | null>(null)

export function ProvideBag({ children }: { children: React.ReactNode }): JSX.Element {
  const bag = useProvideBag()
  return <bagContext.Provider value={bag}>{children}</bagContext.Provider>
}

export const useBag = () => {
  return useContext(bagContext)
}

const useProvideBag = () => {
  const [bag, setBag] = useState([])

  const addToBag = (item: BagItem) => {
    const filteredBag = bag.filter((product: BagItem) => product.id !== item.id)
    const newBag = [...filteredBag, item]
    setBag(newBag)
  }

  const updateBag = (item: BagItem) => {
    const filteredBag = bag.filter((product: BagItem) => product.id !== item.id)
    const updatedBag = [...filteredBag, item]
    setBag(updatedBag)
  }

  const removeFromBag = (item: BagItem) => {
    const updatedBag = bag.filter((el: BagItem) => el.id !== item.id)
    setBag(updatedBag)
  }

  return {
    bag,
    addToBag,
    updateBag,
    removeFromBag,
  } as const
}
