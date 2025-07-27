// src/features/ad/lib/useEditAd.ts

import { useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useEditAd = () => {
  const [loading, setLoading] = useState(false)

  const editAd = async (
    adId: number,
    title: string,
    description: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${BASE_URL}/ads/${adId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        const msg = data.message || 'unknown_error'
        return { success: false, error: msg }
      }

      return { success: true }
    } catch {
      return { success: false, error: 'unknown_error' }
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (
    adId: number,
    file: File
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(
        `${BASE_URL}/ads/${adId}/image`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      )

      if (!res.ok) {
        const data = await res.json()
        return { success: false, error: data.message || 'image_upload_failed' }
      }

      return { success: true }
    } catch {
      return { success: false, error: 'image_upload_failed' }
    }
  }

  const removeImage = async (
    adId: number
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(
        `${BASE_URL}ads/${adId}/image`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) {
        const data = await res.json()
        return { success: false, error: data.message || 'image_remove_failed' }
      }

      return { success: true }
    } catch {
      return { success: false, error: 'image_remove_failed' }
    }
  }

  return { editAd, uploadImage, removeImage, loading }
}