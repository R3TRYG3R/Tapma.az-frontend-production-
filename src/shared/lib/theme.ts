// src/shared/lib/theme.ts

export const toggleTheme = () => {
  const html = document.documentElement
  const current = html.getAttribute('data-theme') || 'light'
  const next = current === 'light' ? 'dark' : 'light'
  html.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
}

export const loadTheme = () => {
  const saved = localStorage.getItem('theme') || 'light'
  document.documentElement.setAttribute('data-theme', saved)
}