// src/features/ad/ui/MyAdsList.tsx

import './MyAdsList.scss'
import { useTranslation } from 'react-i18next'
import { useMyAds } from '../lib/useMyAds'
import { useDeleteAd } from '../lib/useDeleteAd'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const MyAdsList = () => {
  const { t } = useTranslation()
  const { ads, loading, error, removeAdLocally } = useMyAds()
  const { deleteAd, loading: deleting } = useDeleteAd()
  const navigate = useNavigate()

  const handleDelete = async (adId: number) => {
    const confirmDelete = confirm(t('create.confirm_delete') || 'Are you sure you want to delete this ad?')
    if (!confirmDelete) return

    const success = await deleteAd(adId)
    if (success) {
      removeAdLocally(adId)
      toast.success(t('create.deleted_success'), { position: 'bottom-center' })
    } else {
      toast.error(t('auth.unknown_error'), { position: 'bottom-center' })
    }
  }

  const handleEdit = (adId: number) => {
    navigate(`/edit-ad/${adId}`)
  }

  if (loading) return <p className="my-ads-loading">{t('auth.loading')}</p>
  if (error) return <p className="my-ads-error">{t(`auth.${error}`) || t('auth.unknown_error')}</p>
  if (ads.length === 0) return null

  return (
    <div className="my-ads-list">
      <h2>{t('profile.my_ads')}</h2>
      <div className="my-ads-items">
        {ads.map(ad => (
          <div className="ad-card" key={ad.id}>
            {ad.imageUrl ? (
              <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
            ) : (
              <div className="ad-placeholder" />
            )}

            <div className="ad-info">
              <p className="ad-title">{ad.title}</p>
              <p className="ad-description">{ad.description}</p>
            </div>

            <button
              className="ad-edit-icon"
              onClick={() => handleEdit(ad.id)}
              aria-label={t('edit')}
            >
              ✏️
            </button>

            <button
              className="ad-delete-icon"
              onClick={() => handleDelete(ad.id)}
              disabled={deleting}
              aria-label={t('create.confirm_delete')}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}