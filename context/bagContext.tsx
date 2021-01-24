import { useState, useContext, createContext } from 'react'

const bagContext = createContext({})

export function ProvideBag({ children }: { children: any }): JSX.Element {
  const bag = useProvideBag()
  return <bagContext.Provider value={bag}>{children}</bagContext.Provider>
}

export const useBag = (): any => {
  return useContext(bagContext)
}

const useProvideBag = () => {
  const [bag, setBag] = useState([])

  const addToBag = (item) => {
    const filteredBag = bag.filter((product) => product.id !== item.id)
    const newBag = [...filteredBag, item]
    setBag(newBag)
  }

  const updateBag = (item) => {
    const filteredBag = bag.filter((product) => product.id !== item.id)
    const updatedBag = [...filteredBag, item]
    setBag(updatedBag)
  }

  const removeFromBag = (item) => {
    const updatedBag = bag.filter((el) => el.id !== item.id)
    setBag(updatedBag)
  }

  return {
    bag,
    addToBag,
    updateBag,
    removeFromBag,
  } as const
}
