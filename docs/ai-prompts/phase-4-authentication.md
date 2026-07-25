# Phase 4 — Firebase Authentication

## Goal

Integrate Firebase Authentication into DevRepo Explorer by configuring Firebase, implementing a reusable authentication service, managing authentication state with React Context, creating authentication pages, and protecting authenticated routes.

---

## Architecture Decisions

Before implementation, the following architectural decisions were made manually.

### Authentication Provider

The application uses:

- Firebase Authentication
- Email and Password authentication
- React Context for global authentication state

---

### Authentication Flow

```text
User
 │
 ▼
Login / Register Page
 │
 ▼
AuthContext
 │
 ▼
authService
 │
 ▼
Firebase Authentication
 │
 ▼
Authenticated User
```

---

### Authentication State

Global authentication state is managed through `AuthContext`.

State includes:

- currentUser
- loading

Exposed functions:

- login()
- register()
- logout()

---

### Folder Structure

```text
src/
├── config/
│   └── firebase.ts
│
├── services/
│   └── authService.ts
│
├── context/
│   └── AuthContext.tsx
│
├── pages/
│   ├── Login.tsx
│   └── Register.tsx
│
└── routes/
    └── ProtectedRoute.tsx
```

---

# Prompt 1 — Firebase Configuration

```text
I am implementing Phase 4 of my DevRepo Explorer project.

Project Stack:
- React
- TypeScript
- Vite
- Tailwind CSS
- Firebase Authentication
- Cloud Firestore

Create the Firebase configuration file.

Create:
src/config/firebase.ts

Requirements:

- Initialize Firebase using environment variables from Vite.
- Import configuration values using import.meta.env.
- Initialize the Firebase app.
- Export:
  - app
  - auth
  - db

Use:
- initializeApp
- getAuth
- getFirestore

Do not hardcode Firebase configuration values.
Do not add authentication logic yet.

Follow clean architecture principles by keeping Firebase initialization separate from business logic.
```

---

# Prompt 2 — Create Authentication Service

```text
I have completed Firebase configuration.

Now create the authentication service.

Create:
src/services/authService.ts

Requirements:

Use Firebase Authentication.

Implement reusable functions for:

- register(email, password)
- login(email, password)
- logout()

Each function should:

- Return typed results.
- Throw meaningful errors.
- Keep Firebase logic inside the service layer.

Do not create React components.
Do not use Context yet.
Follow clean architecture.
```

---

# Prompt 3 — Create AuthContext

```text
Create an authentication context for my DevRepo Explorer project.

Create:
src/context/AuthContext.tsx

Requirements:

Manage global authentication state.

State should include:

- currentUser
- loading

Provide functions:

- login
- register
- logout

Listen for authentication state changes using Firebase Authentication.

Expose a custom hook:

useAuth()

Wrap the application with AuthProvider.

Use TypeScript.

Do not add Firestore logic.
```

---

# Prompt 4 — Create Login Page

```text
Update the Login page.

File:
src/pages/Login.tsx

Requirements:

Create a responsive login form using Tailwind CSS.

Fields:

- Email
- Password

Buttons:

- Login

Also include a link to:

Register

Use AuthContext instead of calling Firebase directly.

Display:

- Loading state
- Authentication errors

Use semantic HTML and accessible form labels.

Do not add social login.
```

---

# Prompt 5 — Create Register Page

```text
Create the Register page.

Create:

src/pages/Register.tsx

Requirements:

Fields:

- Email
- Password
- Confirm Password

Button:

Register

Use AuthContext to register users.

Validate:

- Required fields
- Password confirmation

Display loading and error states.

Use Tailwind CSS.

Do not connect Firestore yet.
```

> **Note:** Update React Router to include:

```text
/register
```

---

# Prompt 6 — Update Navbar

```text
Update the Navbar component.

Requirements:

If the user is NOT authenticated:

Show:

- Home
- Login
- Register

If the user IS authenticated:

Show:

- Home
- Favorites
- Logout

Use AuthContext to determine authentication state.

Use React Router Link.

Use Tailwind CSS.

Keep the Navbar responsive and accessible.

Do not add Firestore logic.
```

---

# Prompt 7 — Implement ProtectedRoute

```text
Update ProtectedRoute.

File:
src/routes/ProtectedRoute.tsx

Requirements:

Use AuthContext.

If loading:

Display a loading indicator.

If the user is authenticated:

Render the protected content using Outlet.

If the user is not authenticated:

Redirect to /login.

Use React Router Navigate.

Keep the component reusable.

Do not add Firestore logic.
```

---

# Prompt 8 — Wrap Application with AuthProvider

```text
Update the application entry point.

Requirements:

Wrap the application with AuthProvider.

Ensure React Router continues to work correctly.

Verify that all authentication state is available throughout the application.

Do not modify existing routing structure unless necessary.
```

---

## Outcome

After completing Phase 4, the project includes:

- Firebase initialized using environment variables
- Reusable authentication service
- Global authentication management with React Context
- Custom `useAuth()` hook
- Login page
- Register page
- Logout functionality
- Protected routes
- Dynamic Navbar based on authentication state
- Clean separation between Firebase, business logic, and UI

---

## Final Architecture

```text
User
 │
 ▼
Login / Register
 │
 ▼
AuthContext
 │
 ▼
authService
 │
 ▼
Firebase Authentication
 │
 ▼
Authenticated User
 │
 ├── Navbar
 ├── ProtectedRoute
 └── Favorites (Next Phase)
```