import React, { useState, useEffect, useContext, createContext } from 'react'
import nookies from 'nookies'
import { firebaseClient } from '../firebase/firebaseClient'

const AuthContext = createContext<{ user: firebaseClient.User | null }>({
  user: null,
})

export function ProvideAuth({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<firebaseClient.User | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any).nookies = nookies
    }
    return firebaseClient.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`)
      if (!user) {
        console.log(`no token found...`)
        setUser(null)
        nookies.destroy(null, 'token')
        nookies.set(null, 'token', '', {})
        return
      }

      console.log(`updating token...`)
      const token = await user.getIdToken()
      setUser(user)
      nookies.destroy(null, 'token')
      nookies.set(null, 'token', token, {})
    })
  }, [])

  // force refresh the token every 30 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`)
      const user = firebaseClient.auth().currentUser
      if (user) await user.getIdToken(true)
    }, 30 * 60 * 1000)
    return () => clearInterval(handle)
  }, [])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuth = () => {
  return useContext(AuthContext)
}
