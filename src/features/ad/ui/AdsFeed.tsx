// src/features/ad/ui/AdsFeed.tsx

import React, { useRef, useCallback, useState, useEffect } from 'react'
import { useAdsFeed } from '../lib/useAdsFeed'
import './AdsFeed.scss'
import { useTranslation } from 'react-i18next'

export const AdsFeed = () => {
  const { t } = useTranslation()
  const { ads, loading, error, fetchAds, hasMore, resetSearch } = useAdsFeed({ pageSize: 20 })

  const [localSearch, setLocalSearch] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      resetSearch(localSearch.trim())
    }, 400)

    return () => clearTimeout(handler)
  }, [localSearch, resetSearch])

  const observer = useRef<IntersectionObserver | null>(null)
  const lastAdElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchAds()
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, fetchAds]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
  }

  return (
    <div className="ads-feed">
      <input
        type="text"
        placeholder={t('home.search_placeholder') || 'Search ads...'}
        onChange={handleSearchChange}
        value={localSearch}
        className="ads-feed-search"
        autoComplete="off"
      />

      <div className="ads-list">
        {ads.map((ad, index) => {
          const isLast = index === ads.length - 1
          return (
            <div
              key={ad.id}
              className="ad-card"
              ref={isLast ? lastAdElementRef : null}
              onClick={() => window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank')}
              style={{ cursor: 'pointer' }}
            >
              {ad.imageUrl ? (
                <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
              ) : (
                <div className="ad-placeholder" />
              )}
              <div className="ad-info">
                <h3 className="ad-title">{ad.title}</h3>
                <p className="ad-description">{ad.description}</p>
                <div className="ad-user">
                  <img
                    src={ad.user.avatarUrl || '/default-avatar.png'}
                    alt={ad.user.nickname}
                    className="ad-user-avatar"
                  />
                  <span className="ad-user-nickname">{ad.user.nickname}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {loading && ads.length === 0 && <p className="ads-loading">{t('auth.loading')}</p>}
      {error && <p className="ads-error">{error}</p>}
      {!loading && !hasMore && ads.length > 0 && (
        <p className="ads-end">{t('home.no_more_ads') || 'No more ads'}</p>
      )}
    </div>
  )
}