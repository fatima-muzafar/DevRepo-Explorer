# Phase 5 — Favorites Management

## Goal

Implement the Favorites feature by integrating Cloud Firestore, creating a reusable favorites service, managing favorite repositories with a custom hook, connecting the Favorite button, and building a protected Favorites page.

---

## Architecture Decisions

Before implementation, the following architectural decisions were made manually.

### Firestore Structure

The Favorites feature follows this Firestore structure:

```text
users
 └── {uid}
      └── favorites
            └── {repositoryId}
```

---

### Favorite Document Structure

Each favorite document contains the following fields:

```ts
{
  id: number;
  name: string;
  owner: string;
  description: string;
  stars: number;
  language: string;
  htmlUrl: string;
  savedAt: Timestamp;
}
```

---

### Data Flow

```text
Repository Details
        │
        ▼
FavoriteButton
        │
        ▼
useFavorites Hook
        │
        ▼
favoritesService
        │
        ▼
Cloud Firestore
        │
        ▼
Favorites Collection
```

---

### Folder Structure

```text
src/
├── hooks/
│   └── useFavorites.ts
│
├── services/
│   └── favoritesService.ts
│
├── types/
│   └── favorite.ts
│
├── pages/
│   └── Favorites.tsx
│
└── components/
    └── repository/
        └── FavoriteButton.tsx
```

---

# Prompt 1 — Create Favorites Service

```text
I am implementing Phase 5 of my DevRepo Explorer project.

Authentication is already complete.

Now create the Firestore service.

Create:

src/services/favoritesService.ts

Use Cloud Firestore.

Implement reusable functions:

- saveFavorite(uid, repository)
- removeFavorite(uid, repositoryId)
- getFavorites(uid)
- isFavorite(uid, repositoryId)

Requirements:

Follow my Firestore structure:

users
  └── {uid}
        └── favorites
              └── {repositoryId}

Keep Firestore logic inside the service layer.

Use TypeScript.

Do not create UI components.
```

---

# Prompt 2 — Create Favorite Types

```text
Create TypeScript models for favorite repositories.

File:

src/types/favorite.ts

Create an interface named FavoriteRepository.

Fields:

- id
- name
- owner
- description
- stars
- language
- htmlUrl
- savedAt

Keep the interface reusable for Firestore documents.

Do not add Firebase logic.
```

---

# Prompt 3 — Create useFavorites Hook

```text
Create a custom React hook for managing favorites.

Create:

src/hooks/useFavorites.ts

Requirements:

Use:

- AuthContext
- favoritesService

Manage:

- favorites
- loading
- error

Provide functions:

- loadFavorites()
- saveFavorite()
- removeFavorite()
- isFavorite()

Keep business logic inside the hook.

Do not create UI.
```

---

# Prompt 4 — Connect Favorite Button

```text
Update the FavoriteButton component.

Requirements:

Use:

- useFavorites hook

Behavior:

If repository is not saved:

Display:
⭐ Save Favorite

If repository is already saved:

Display:
❤️ Remove Favorite

When clicked:

Save or remove the repository from Firestore.

Display loading while the request is in progress.

Handle errors with a user-friendly message.

Use Tailwind CSS.

Do not put Firestore logic inside the component.
```

---

# Prompt 5 — Build Favorites Page

```text
Update the Favorites page.

File:

src/pages/Favorites.tsx

Requirements:

Use:

- useFavorites hook
- RepositoryCard component

Display:

- User's saved repositories

If no favorites exist:

Show an empty state.

While loading:

Show loading skeletons.

On error:

Show a friendly error message.

Each repository should include a Remove Favorite action.

Use Tailwind CSS.

Do not duplicate Firestore logic.
```

---

# Prompt 6 — Sync Search Results

```text
Update repository cards across the application.

Requirements:

When a repository is saved or removed:

Synchronize the UI immediately.

The Favorite button should always reflect the correct saved state.

Avoid requiring a page refresh.

Keep the implementation clean using the existing useFavorites hook.

Do not duplicate state across multiple components.
```

---

# Prompt 7 — Improve Loading & Error UX

```text
Improve the favorites user experience.

Requirements:

Loading:

- Show loading skeletons while favorites load.
- Disable favorite button during save/remove operations.

Errors:

Display user-friendly messages for:

- Failed save
- Failed remove
- Failed load

Keep the UI responsive and accessible.

Use Tailwind CSS.

Do not change Firestore structure.
```

---

## Firestore Security Rules

Before deployment, configure Firestore Security Rules so users can only access their own favorites.

```text
match /users/{userId}/favorites/{favoriteId} {
  allow read, write: if request.auth != null &&
                     request.auth.uid == userId;
}
```

---

## Outcome

After completing Phase 5, the project includes:

- Cloud Firestore integration
- Reusable favorites service
- Favorite repository TypeScript model
- Custom `useFavorites` hook
- Save favorite functionality
- Remove favorite functionality
- Protected Favorites page
- Favorite button connected to Firestore
- Automatic UI synchronization
- Loading states
- Error handling
- Firestore security aligned with the project architecture

---

## Final Architecture

```text
Repository Details
        │
        ▼
FavoriteButton
        │
        ▼
useFavorites()
        │
        ▼
favoritesService
        │
        ▼
Cloud Firestore
        │
        ▼
users/{uid}/favorites
        │
        ▼
Favorites Page
```