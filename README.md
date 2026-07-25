# DevRepo Explorer

A modern React and TypeScript application for discovering GitHub repositories, exploring repository details, and managing favorite repositories with Firebase Authentication and Cloud Firestore.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Authentication%20%26%20Firestore-FFCA28?logo=firebase)](https://firebase.google.com/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)
- [AI-Assisted Development](#ai-assisted-development)
- [Future Improvements](#future-improvements)

---

## Overview

DevRepo Explorer is a developer-focused web application that enables users to search GitHub repositories, explore detailed repository information, and save their favorite repositories securely using Firebase Authentication and Cloud Firestore.

This project demonstrates modern frontend development practices, including React, TypeScript, API integration, authentication, state management, reusable component architecture, responsive design, and accessibility.

---

## Features

- 🔍 Search GitHub repositories using the GitHub REST API
- 📄 View detailed repository information
- 🔐 User authentication with Firebase Authentication
- ⭐ Save repositories to a protected favorites collection
- ❤️ Remove repositories from favorites
- 🔒 Protected Favorites page
- ⚡ Loading indicators and friendly error handling
- 📱 Responsive design for mobile, tablet, and desktop
- ♿ Accessibility improvements with semantic HTML and keyboard navigation
- 🧩 Reusable and maintainable component architecture

---

## Screenshots

### 🏠 Home Page

![Home Page](assets/home-page.png)

---

### 📄 Repository Details

![Repository Details](assets/repository-details.png)

---

### ⭐ Favorites Page

![Favorites Page](assets/favorites-page.png)

---

### 🔐 Login Page

![Login Page](assets/login-page.png)

---

### 📝 Register Page

![Register Page](assets/register-page.png)

---

### 📱 Mobile Responsive View

![Mobile Responsive View](assets/mobile-home.png)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| API | GitHub REST API |

---

## Project Structure

```text
DevRepo-Explorer/
│
├── assets/
│   ├── home-page.png
│   ├── repository-details.png
│   ├── favorites-page.png
│   ├── login-page.png
│   ├── register-page.png
│   └── mobile-home.png
│
├── public/
│
├── src/
│   ├── components/
│   ├── config/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd DevRepo-Explorer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

### 4. Start the Development Server

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

### 5. Build for Production

```bash
npm run build
```

### 6. Preview the Production Build

```bash
npm run preview
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Authentication Domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase Application ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase Analytics Measurement ID |

---

## Usage

1. Search GitHub repositories using the search bar.
2. Browse repositories returned by the GitHub API.
3. Open a repository to view detailed information.
4. Register a new account or log in.
5. Save repositories to your Favorites page.
6. Remove repositories from favorites whenever needed.

---

## Accessibility

This project follows accessibility best practices, including:

- Semantic HTML elements
- Proper form labels
- Keyboard-accessible navigation
- Visible focus states
- Accessible validation and error messages
- Appropriate ARIA attributes where necessary

---

## Responsive Design

The interface is built using Tailwind CSS with a mobile-first approach.

The application is optimized for:

- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop screens

Responsive layouts ensure a consistent user experience across different screen sizes.

---

## AI-Assisted Development

GitHub Copilot and ChatGPT were used as development assistants throughout the project.

AI helped with:

- Project planning
- Component implementation
- TypeScript development
- Firebase integration
- Debugging assistance
- Documentation generation

All AI-generated code was carefully reviewed, tested, and refined before being incorporated into the final application.

---

## Future Improvements

Possible future enhancements include:

- Infinite scrolling or pagination
- Advanced search filters
- GitHub OAuth authentication
- Repository sorting and filtering
- Dark mode support
- Unit and integration testing
- Repository history and activity insights

---

## Acknowledgements

- GitHub REST API
- Firebase
- React
- Vite
- Tailwind CSS
- GitHub Copilot
- ChatGPT