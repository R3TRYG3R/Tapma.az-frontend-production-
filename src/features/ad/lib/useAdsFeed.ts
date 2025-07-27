// src/features/ad/lib/useAdsFeed.ts

import { useEffect, useState, useCallback, useRef } from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface Ad {
  id: number
  title: string
  description: string
  imageUrl: string | null
  createdAt: string
  updatedAt: string
  user: {
    id: number
    nickname: string
    avatarUrl: string | null
  }
}

interface UseAdsFeedParams {
  initialSearch?: string
  pageSize?: number
}

interface AdsResponse {
  data: Ad[]
  total: number
  limit: number
  page: number
  nextPage: number | null
}

export const useAdsFeed = ({ initialSearch = '', pageSize = 20 }: UseAdsFeedParams = {}) => {
  const [ads, setAds] = useState<Ad[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [search, setSearch] = useState(initialSearch)

  const isFetching = useRef(false)

  const fetchAds = useCallback(
    async (reset = false) => {
      if (isFetching.current) return
      if (!hasMore && !reset) return

      isFetching.current = true
      setLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        params.append('limit', String(pageSize))
        params.append('page', String(reset ? 1 : page))
        if (search) params.append('search', search)

        const res = await fetch(`${BASE_URL}/ads?${params.toString()}`)
        if (!res.ok) throw new Error('Failed to load ads')

        const data: AdsResponse = await res.json()

        setAds(prev => (reset ? data.data : [...prev, ...data.data]))
        setHasMore(data.nextPage !== null)
        setPage(reset ? 2 : data.nextPage ?? page)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
        isFetching.current = false
      }
    },
    [page, pageSize, search, hasMore]
  )

  const resetSearch = useCallback((newSearch: string) => {
    setSearch(newSearch)
    setPage(1)
    setHasMore(true)
  }, [])

  useEffect(() => {
    fetchAds(true)
  }, [fetchAds, search])

  return { ads, loading, error, fetchAds, hasMore, resetSearch }
}