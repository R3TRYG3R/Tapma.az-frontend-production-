// src/pages/ad/edit/ui/EditAdPage.tsx

import './EditAdPage.scss'
import { useParams, Navigate } from 'react-router-dom'
import { EditAdForm } from '@/features/ad/ui/EditAdForm'
import { useTranslation } from 'react-i18next'
import { useAdById } from '@/features/ad/lib/useAdById'
import { useCurrentUser } from '@/features/auth/lib/useCurrentUser'

const EditAdPage = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const adId = Number(id)

  const { ad, loading, error } = useAdById(adId)
  const { user } = useCurrentUser()

  if (loading) return <div className="edit-ad-page">{t('auth.loading')}</div>
  if (error || !ad) return <div className="edit-ad-page">{t('auth.unknown_error')}</div>

  if (user && ad.user?.id !== user.id) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="edit-ad-page">
      <EditAdForm
        adId={ad.id}
        currentTitle={ad.title}
        currentDescription={ad.description}
        currentImageUrl={ad.imageUrl || null}
      />
    </div>
  )
}

export default EditAdPage