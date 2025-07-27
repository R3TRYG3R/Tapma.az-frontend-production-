// src/features/auth/lib/useCurrentUser.ts

import { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface User {
  id: number
  email: string
  nickname: string
  avatarUrl: string | null
}

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token || token === 'undefined') {
      setLoading(false)
      return
    }

    fetch(`${BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async res => {
        if (!res.ok) {
          throw new Error('Failed to fetch user')
        }
        return res.json()
      })
      .then(setUser)
      .catch(() => setError('auth.user_not_found'))
      .finally(() => setLoading(false))
  }, [])

  return { user, loading, error }
}