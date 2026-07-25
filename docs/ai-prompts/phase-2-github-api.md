# Phase 2 — Repository Search

## Goal

Integrate the GitHub REST API to enable repository searching by implementing a reusable service layer, TypeScript models, a custom search hook, and reusable UI components while maintaining a clean architecture.

---

## Architecture Decisions

Before implementation, the following architectural decisions were made manually.

### GitHub API

**Base URL**

```text
https://api.github.com
```

**Search Endpoint**

```text
GET /search/repositories?q={query}
```

Example:

```text
https://api.github.com/search/repositories?q=react
```

---

### TypeScript Models

The project uses only the fields required for the MVP.

```text
Repository
├── id
├── name
├── full_name
├── description
├── html_url
├── stargazers_count
├── forks_count
├── language
└── owner
```

---

### State Management Strategy

The search feature uses:

- `useState` for:
  - Search query
  - Search results
  - Loading state
  - Error state

- A custom hook:
  - `useGitHubSearch`

This keeps business logic separate from the UI.

---

### Search Flow

```text
User enters search query
        │
        ▼
SearchBar
        │
        ▼
useGitHubSearch
        │
        ▼
githubApi Service
        │
        ▼
GitHub REST API
        │
        ▼
RepositoryCard List
```

---

# Prompt 1 — Create GitHub API Service

```text
I am implementing Phase 2 of my DevRepo Explorer project.

React + TypeScript + Vite + Tailwind are already configured.

Implement the GitHub REST API service layer.

API Strategy:
- External API: GitHub REST API
- Endpoint:
  GET https://api.github.com/search/repositories?q={query}

Create:

src/services/githubApi.ts

Requirements:

- Use fetch API.
- Create a reusable function:
  searchRepositories(query: string)

- Handle API errors.
- Return typed data.
- Keep API logic separate from components.

Do not create UI components.
Do not add Firebase.

After implementation explain:
- File created
- Function responsibility
- Error handling approach
```

---

# Prompt 2 — Create Repository Types

```text
Create TypeScript models for GitHub repository data.

Location:

src/types/repository.ts

Create interfaces for:

- RepositoryOwner
- Repository
- SearchResponse

Only include fields needed for MVP:

Repository:
- id
- name
- full_name
- description
- html_url
- stargazers_count
- forks_count
- language
- owner

Follow TypeScript best practices.

Do not add API logic.
```

---

# Prompt 3 — Create useGitHubSearch Hook

```text
I need a custom React hook for GitHub repository searching.

Create:

src/hooks/useGitHubSearch.ts

Requirements:

The hook should manage:

- search results
- loading state
- error state
- search function

Use:

- React useState
- Existing githubApi service
- Existing Repository types

Return:

{
  repositories,
  loading,
  error,
  searchRepositories
}

Do not create UI.
Keep business logic inside the hook.
```

---

# Prompt 4 — Create SearchBar Component

```text
Create the SearchBar component for DevRepo Explorer.

Location:

src/components/ui/SearchBar.tsx

Requirements:

- TypeScript component
- Controlled input
- Accept search handler as prop
- Tailwind CSS only
- Accessible label
- Keyboard friendly
- Clean reusable component

Do not call API directly.

The parent component will handle searching.
```

---

# Prompt 5 — Create RepositoryCard Component

```text
Create RepositoryCard component.

Location:

src/components/repository/RepositoryCard.tsx

Requirements:

Display:

- Repository name
- Description
- Language
- Stars
- Forks
- GitHub link

Props:

repository: Repository

Use:

- TypeScript
- Tailwind CSS
- Semantic HTML

Do not include API logic.
```

---

# Prompt 6 — Connect Search Page

```text
Update the Home page to integrate GitHub repository searching.

Requirements:

Use:

- SearchBar component
- useGitHubSearch hook
- RepositoryCard component

Flow:

User enters search term
        ↓
Search button clicked
        ↓
Call hook search function
        ↓
Display repository cards

Add:

Loading state:
- Show skeleton cards while loading

Error state:
- Display a user-friendly error message

Empty state:
- Show a message when no repositories are found

Keep logic clean.

Do not put API calls inside Home.tsx.
```

---

## Outcome

After completing Phase 2, the project includes:

- GitHub REST API integration
- Reusable API service layer
- TypeScript models for repository data
- Custom `useGitHubSearch` hook
- Reusable `SearchBar` component
- Reusable `RepositoryCard` component
- Repository search functionality
- Loading states
- Error handling
- Empty state messaging
- A clean separation between UI and business logic