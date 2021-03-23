import { bagContext } from '@/context/bagContext'
import { BagItem } from '@/types/bagItem'
import { useState } from 'react'

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

interface ProvideBagProps {
  bag: BagItem[]
  children: React.ReactNode
}

export const ProvideBag = ({ bag, children }: ProvideBagProps): JSX.Element => {
  const bagValue = useProvideBag(bag)
  return <bagContext.Provider value={bagValue}>{children}</bagContext.Provider>
}

export const useProvideBag = (mockBag: BagItem[]): BagContextInterface => {
  const [bag, setBag] = useState(mockBag)

  const fetchBag = async () => {
    try {
      setBag([...mockBag])
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBagOnSignIn = async () => {
    if (bag.length > 0) {
      // Combine guest shopping bag with users saved bag
      try {
        setBag([...mockBag])
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
        setBag([...bag, item])
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
        const updatedBag = bag.filter((el: BagItem) => el.id !== item.id)
        setBag(updatedBag)
        return {
          title: 'Item Removed!',
          message: 'Your item has been removed',
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
