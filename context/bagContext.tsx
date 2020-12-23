import { useState, useContext, createContext } from 'react'

const bagContext = createContext()

export function ProvideBag({ children }) {
  const bag = useProvideBag()
  return <bagContext.Provider value={bag}>{children}</bagContext.Provider>
}

export const useBag = () => {
  return useContext(bagContext)
}

const useProvideBag = () => {
  const [bag, setBag] = useState([])

  const addToBag = (item) => {
    const newBag = [...bag, item]
    setBag(newBag)
  }

  const removeFromBag = (item) => {
    setBag()
  }

  return {
    bag,
    addToBag,
    removeFromBag,
  }
}
