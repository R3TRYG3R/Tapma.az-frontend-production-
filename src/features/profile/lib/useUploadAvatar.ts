// src/features/profile/lib/useUploadAvatar.ts

import { useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useUploadAvatar = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const uploadAvatar = async (userId: number, file: File) => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('unauthorized')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `${BASE_URL}/users/${userId}/avatar`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message || 'upload_failed')
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { uploadAvatar, loading, error }
}