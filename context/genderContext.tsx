import { useState, useContext, createContext } from 'react'

const genderContext = createContext()

export function ProvideGender({ children }) {
  const gender = useProvideGender()
  return <genderContext.Provider value={gender}>{children}</genderContext.Provider>
}

export const useGender = () => {
  return useContext(genderContext)
}

const useProvideGender = () => {
  const [gender, setGender] = useState('')

  const toggleGender = (value) => {
    setGender(value)
  }

  return {
    gender,
    setGender: toggleGender,
  }
}
