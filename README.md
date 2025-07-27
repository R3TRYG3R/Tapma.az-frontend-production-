# Tapma.az — Minimalist Marketplace Frontend

🎯 **Tapma.az** is a modern web application implementing a minimalist marketplace with user listings, profiles, multi-language support, and dark mode.

---

## 🚀 Technologies Used

- **React** + **TypeScript**
- **SCSS** — Responsive design, dark/light themes, custom variables
- **React Router v6**
- **i18next** — Internationalization (🇬🇧 English, 🇷🇺 Russian)
- **React Toastify** — Smooth and aesthetic notifications
- **Vite** — Lightning-fast bundler and dev server

---

## 🧠 Architecture

Built with **Feature-Sliced Design (FSD)** principles:

```
src/
├── app/                 # Entry point and global setup
├── pages/               # Route-based page components
├── features/            # Functional modules by domain
│   ├── auth/            # Login, registration, current user
│   ├── profile/         # User profile, avatar upload/removal
│   └── ads/             # Ads logic, create form, image upload
├── shared/              # Reusable components, styles, utils
├── widgets/             # UI sections like Header, Footer
└── index.scss           # Global styles and variables
```

---

## 📦 Features

- 🔐 **Register / Login** — With validation and auto-login after sign-up
- 👤 **User Profile** — Upload/remove avatar, view personal ads
- 📢 **Ad Creation** — Up to 5 ads per user, with image support
- 🌙 **Themes** — Light and dark, toggleable via variables
- 🌐 **Language Support** — Persistent language switching (EN/RU)
- 📸 **Image Upload** — JPG/PNG/WEBP up to 5MB, validated on client
- 📱 **Responsive Design** — Fully functional across devices

---

## 🧩 Advantages

- 💡 Clean, scalable architecture
- ✨ Elegant UI with transitions and polished styles
- 🔒 Secure API handling (`.env`, `Bearer token`, file validation)
- 🚫 No secrets or keys leaked in code
- 🧠 Maintainable codebase thanks to FSD and modular SCSS

---

## 📁 Environment Variables

Project uses a `.env` file:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

Check `env-example` for reference.

---

## 🧠 Author

Developed by [Ayxan Abbasov](https://www.linkedin.com/in/aki22), a full-stack developer and Computer Engineering student at NAA.  
This project reflects strong attention to code quality, structure, and visual clarity.

---

## ⭐️ Feedback

If you like the project, feel free to ⭐️ the repo and share your thoughts!
