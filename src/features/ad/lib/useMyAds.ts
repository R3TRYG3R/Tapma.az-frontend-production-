// src/features/ad/lib/useMyAds.ts

import { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface Ad {
  id: number
  title: string
  description: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

export const useMyAds = () => {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAds = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      setError('unauthorized')
      return
    }

    try {
      const res = await fetch(`${BASE_URL}/ads/my`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || 'unknown_error')
      }

      const data = await res.json()
      setAds(data)
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAds()
  }, [])

  const removeAdLocally = (id: number) => {
    setAds(prev => prev.filter(ad => ad.id !== id))
  }

  return { ads, loading, error, refetch: fetchAds, removeAdLocally }
}