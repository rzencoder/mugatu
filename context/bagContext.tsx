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

  const addToBag = (item: any) => {
    const newBag = [...bag, item]
    setBag(newBag)
  }

  const removeFromBag = (item) => {
    setBag(item)
  }

  return {
    bag,
    addToBag,
    removeFromBag,
  } as const
}
