// src/features/auth/lib/useRegister.ts

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadRandomAvatar } from '@/features/profile/lib/uploadRandomAvatar'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const register = async (email: string, password: string, nickname: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nickname }),
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
      const token = data.token
      const userId = data.user?.id

      if (token && userId) {
        localStorage.setItem('token', token)
        await uploadRandomAvatar(userId, token)
        navigate('/')
        window.location.reload()
      }
    } catch (err) {
      const message = (err as Error).message
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  return { register, loading, error }
}