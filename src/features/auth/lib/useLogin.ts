// src/features/auth/lib/useLogin.ts

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const err = await response.json()
        const message = err.message || 'unknown_error'
        throw new Error(
          message
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '')
        )
      }

      const data = await response.json()

      if (!data?.token || data.token === 'undefined') {
        throw new Error('user_not_found')
      }

      localStorage.setItem('token', data.token)
      navigate('/')
      window.location.reload()
    } catch (err) {
      const message = (err as Error).message
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}