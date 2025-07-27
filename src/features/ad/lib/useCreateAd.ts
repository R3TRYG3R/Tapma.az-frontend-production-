// src/features/ad/lib/useCreateAd.ts

import { useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCreateAd = () => {
  const [loading, setLoading] = useState(false)

  const createAd = async (
    title: string,
    description: string,
    file?: File
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true)

    try {
      const token = localStorage.getItem('token')

      const res = await fetch(
        `${BASE_URL}/ads`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
          }),
        }
      )

      if (!res.ok) {
        const data = await res.json()
        const msg = data.message || 'unknown_error'
        return { success: false, error: msg }
      }

      const ad = await res.json()

      if (file && ad?.id) {
        const imageForm = new FormData()
        imageForm.append('file', file)

        const imageRes = await fetch(
          `${BASE_URL}/ads/${ad.id}/image`,
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: imageForm,
          }
        )

        if (!imageRes.ok) {
          const data = await imageRes.json()
          const msg = data.message || 'image_upload_failed'
          return { success: false, error: msg }
        }
      }

      return { success: true }
    } catch (err) {
      return { success: false, error: 'unknown_error' }
    } finally {
      setLoading(false)
    }
  }

  return { createAd, loading }
}