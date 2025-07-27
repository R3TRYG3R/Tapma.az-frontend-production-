// src/features/ad/ui/CreateAdForm.tsx

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useCreateAd } from '../lib/useCreateAd'
import './CreateAdForm.scss'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const CreateAdForm = () => {
  const { t } = useTranslation()
  const { createAd, loading } = useCreateAd()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle) {
      toast.error(t('create.error_title_required'))
      return
    }
    if (!trimmedDescription) {
      toast.error(t('create.error_description_required'))
      return
    }

    if (trimmedTitle.length > 18) {
      toast.error(t('create.error_title_limit'))
      return
    }

    if (trimmedDescription.length > 35) {
      toast.error(t('create.error_description_limit'))
      return
    }

    const result = await createAd(trimmedTitle, trimmedDescription, file || undefined)

    if (result.success) {
      setTitle('')
      setDescription('')
      setFile(null)
      setPreviewUrl(null)
      toast.success(t('create.success'))
      navigate('/')
    } else if (result.error) {
      const key = result.error.toLowerCase().replace(/[^a-z0-9]+/g, '_')
      const translated = t(`create.${key}`)
      toast.error(translated !== `create.${key}` ? translated : t('auth.unknown_error'))
    }
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
  }

  const handleRemoveImage = () => {
    setFile(null)
    setPreviewUrl(null)
  }

  return (
    <form className="create-ad-form" onSubmit={handleSubmit}>
      <h2>{t('create.title')}</h2>
      <p className="subtitle">{t('create.subtitle')}</p>

      <input
        type="text"
        placeholder={t('create.placeholder_title')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={18}
        required
      />

      <textarea
        placeholder={t('create.placeholder_description')}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={35}
        required
      />

      {previewUrl ? (
        <div className="image-preview-wrapper" onClick={handleRemoveImage}>
          <img src={previewUrl} alt="preview" className="image-preview" />
          <span className="image-preview-remove">×</span>
        </div>
      ) : (
        <label
          className="button button--secondary"
          style={{ width: '100%', height: '40px' }}
        >
          {t('create.choose_file')}
          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
            hidden
          />
        </label>
      )}

      <button className="button button--primary" type="submit" disabled={loading}>
        {loading ? t('auth.loading') : t('create.submit')}
      </button>
    </form>
  )
}