// src/features/ad/ui/EditAdForm.tsx

import './EditAdForm.scss'
import { useState } from 'react'
import { useEditAd } from '../lib/useEditAd'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface Props {
  adId: number
  currentTitle: string
  currentDescription: string
  currentImageUrl?: string | null
}

export const EditAdForm = ({
  adId,
  currentTitle,
  currentDescription,
  currentImageUrl,
}: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { editAd, uploadImage, removeImage, loading } = useEditAd()

  const [title, setTitle] = useState(currentTitle)
  const [description, setDescription] = useState(currentDescription)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null)
  const [imageRemoved, setImageRemoved] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const trimmedTitle = title.trim()
    const trimmedDesc = description.trim()

    if (!trimmedTitle) {
      toast.error(t('create.error_title_required'))
      setSubmitting(false)
      return
    }

    if (!trimmedDesc) {
      toast.error(t('create.error_description_required'))
      setSubmitting(false)
      return
    }

    if (trimmedTitle.length > 18) {
      toast.error(t('create.error_title_limit'))
      setSubmitting(false)
      return
    }

    if (trimmedDesc.length > 35) {
      toast.error(t('create.error_description_limit'))
      setSubmitting(false)
      return
    }

    const result = await editAd(adId, trimmedTitle, trimmedDesc)
    if (!result.success) {
      const key = result.error?.toLowerCase().replace(/[^a-z0-9]+/g, '_') || 'unknown_error'
      toast.error(t(`create.${key}`) || t('auth.unknown_error'))
      setSubmitting(false)
      return
    }

    if (file) {
      const imageResult = await uploadImage(adId, file)
      if (!imageResult.success) {
        toast.error(t('create.image_upload_failed'))
        setSubmitting(false)
        return
      }
    } else if (imageRemoved) {
      const removeResult = await removeImage(adId)
      if (!removeResult.success) {
        toast.error(t('create.image_upload_failed'))
        setSubmitting(false)
        return
      }
    }

    toast.success(t('edit.success'))
    setTimeout(() => {
      navigate('/profile')
    }, 400)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    e.target.value = ''
    if (!selected) return

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp']
    const maxSize = 5 * 1024 * 1024

    if (!allowedTypes.includes(selected.type)) {
      toast.error(t('create.error_invalid_type'))
      return
    }

    if (selected.size > maxSize) {
      toast.error(t('create.error_file_too_large'))
      return
    }

    setFile(selected)
    setPreviewUrl(URL.createObjectURL(selected))
    setImageRemoved(false)
  }

  const handleRemoveImage = () => {
    setFile(null)
    setPreviewUrl(null)
    setImageRemoved(true)
  }

  return (
    <form className="edit-ad-form" onSubmit={handleSubmit}>
      <h2>{t('edit.title')}</h2>
      <p className="subtitle">{t('create.subtitle')}</p>

      <input
        type="text"
        placeholder={t('create.placeholder_title')}
        value={title}
        onChange={e => setTitle(e.target.value)}
        maxLength={18}
        required
      />

      <textarea
        placeholder={t('create.placeholder_description')}
        value={description}
        onChange={e => setDescription(e.target.value)}
        maxLength={35}
        required
      />

      {previewUrl ? (
        <div className="image-preview-wrapper" onClick={handleRemoveImage}>
          <img src={previewUrl} alt="preview" className="image-preview" />
          <span className="image-preview-remove">×</span>
        </div>
      ) : (
        <label className="button button--secondary" style={{ width: '100%', height: '40px' }}>
          {t('create.choose_file')}
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            hidden
          />
        </label>
      )}

      <button
        type="submit"
        disabled={loading || submitting}
        className="button button--primary"
      >
        {loading || submitting ? t('auth.loading') : t('edit.save')}
      </button>
    </form>
  )
}