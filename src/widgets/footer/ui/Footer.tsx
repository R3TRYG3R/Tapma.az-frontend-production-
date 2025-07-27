// src/widgets/footer/ui/Footer.tsx

import './Footer.scss'

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <a
          href="https://instagram.com/a.abbassovv"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          aria-label="Instagram"
        >
          <InstagramIcon />
          Instagram
        </a>

        <a
          href="https://www.linkedin.com/in/aki22"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
          LinkedIn
        </a>

        <a
          href="https://t.me/currleys"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
          aria-label="Telegram"
        >
          <TelegramIcon />
          Telegram
        </a>
      </div>
    </footer>
  )
}

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="footer-icon"
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm4.25 3.75a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5zm0 1.5a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zm3.5-.88a1 1 0 110 2 1 1 0 010-2z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="footer-icon"
  >
    <path d="M20.447 20.452H16.89v-5.569c0-1.328-.026-3.039-1.85-3.039-1.851 0-2.135 1.445-2.135 2.939v5.669H9.342V9h3.41v1.561h.049c.475-.9 1.635-1.85 3.363-1.85 3.6 0 4.268 2.367 4.268 5.448v6.293zM5.337 7.433a1.971 1.971 0 11-.002-3.943 1.971 1.971 0 01.002 3.943zm1.775 13.02H3.56V9h3.552v11.452zM22.225 0H1.771C.792 0 0 .77 0 1.723v20.553C0 23.23.792 24 1.771 24h20.451C23.207 24 24 23.23 24 22.276V1.723C24 .77 23.207 0 22.225 0z" />
  </svg>
)

const TelegramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    fill="currentColor"
    viewBox="0 0 24 24"
    className="footer-icon"
  >
    <path d="M9.999 16.993l-.392 4.761c.562 0 .808-.24 1.103-.527l2.64-2.502 5.483 4.023c1.004.555 1.725.267 1.986-.922l3.6-16.858-23.495 8.49 5.87 1.83 13.632-8.516" />
  </svg>
)