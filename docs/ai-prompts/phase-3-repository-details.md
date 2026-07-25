# Phase 3 — Repository Details

## Goal

Implement a dynamic repository details page by extending the GitHub API service, creating reusable detail components, introducing a custom hook for fetching repository data, and connecting the repository details route.

---

## Architecture Decisions

Before implementation, the following architectural decisions were made manually.

### Route Design

Repository details are accessed using a dynamic route.

```text
/repository/:owner/:repo
```

Example:

```text
/repository/facebook/react
```

Route parameters:

```text
owner = facebook
repo = react
```

---

### Data Flow

```text
User clicks RepositoryCard
          │
          ▼
Navigate to Repository Details Page
          │
          ▼
Get owner and repository name from URL
          │
          ▼
useRepositoryDetails Hook
          │
          ▼
githubApi Service
          │
          ▼
GitHub REST API
          │
          ▼
Display Repository Details
```

---

### Components

The repository details feature is composed of the following reusable components:

```text
components/
└── repository/
    ├── RepositoryDetailsCard.tsx
    ├── RepositoryStats.tsx
    └── FavoriteButton.tsx
```

---

# Prompt 1 — Add Repository Details API Function

```text
I am implementing Phase 3 of my DevRepo Explorer project.

Phase 2 is complete:
- GitHub API service exists
- Repository types exist
- Search functionality works

Now I need repository details.

API Strategy:
Use GitHub REST API.

Endpoint:

GET /repos/{owner}/{repo}

Update:

src/services/githubApi.ts

Add a function:

getRepositoryDetails(
 owner: string,
 repo: string
)

Requirements:

- Use existing fetch approach.
- Return typed Repository data.
- Handle API errors.
- Keep API logic inside service layer.

Do not create UI components.
Do not add Firebase.
```

---

# Prompt 2 — Update TypeScript Models

```text
Update repository TypeScript models for repository details.

File:

src/types/repository.ts

Add any missing fields required for the details page:

- owner information
- repository description
- stars
- forks
- issues
- language
- topics
- GitHub URL
- created date
- updated date

Keep interfaces clean and reusable.

Do not add API logic.
```

---

# Prompt 3 — Create useRepositoryDetails Hook

```text
Create a custom hook for fetching repository details.

Create:

src/hooks/useRepositoryDetails.ts

Requirements:

The hook should manage:

- repository data
- loading state
- error state

Input:

owner
repo

Use:

- React useState
- Existing githubApi service
- Existing TypeScript models

Return:

{
 repository,
 loading,
 error
}

Keep business logic inside the hook.

Do not put API calls inside components.
```

---

# Prompt 4 — Update RepositoryCard Navigation

```text
Update RepositoryCard component.

Requirements:

When a user clicks a repository card:

Navigate to:

/repository/:owner/:repo

Use React Router.

The URL should contain:

owner
repository name

Keep existing card UI unchanged.

Do not add API logic.
```

---

# Prompt 5 — Create Repository Detail Components

```text
Create repository detail UI components.

Location:

src/components/repository/

Create:

1. RepositoryDetailsCard.tsx

Display:

- Repository name
- Description
- Owner
- Language
- Stars
- Forks
- Issues

2. RepositoryStats.tsx

Display repository statistics.

3. FavoriteButton.tsx

Create UI only.

Requirements:

- TypeScript
- Tailwind CSS
- Reusable components
- No Firebase logic yet

The favorite button should only show UI state.
```

---

# Prompt 6 — Build Repository Details Page

```text
Update:

src/pages/RepositoryDetails.tsx

Implement repository details page.

Requirements:

Use:

- useParams from React Router
- useRepositoryDetails hook
- RepositoryDetailsCard component

Flow:

Get owner and repo from URL
        ↓
Fetch repository details
        ↓
Display information

Add:

Loading state:
- Show loading skeleton

Error state:
- Show friendly error message

Success state:
- Display repository information

Include:

GitHub repository link button.

Do not implement favorite functionality yet.
Only display favorite button UI.
```

---

## Outcome

After completing Phase 3, the project includes:

- Dynamic repository details routing
- GitHub repository details API integration
- Extended TypeScript repository models
- Reusable `useRepositoryDetails` hook
- Clickable repository cards that navigate to the details page
- Reusable repository detail components
- Repository statistics component
- Favorite button UI placeholder
- Loading skeletons
- Error handling
- External GitHub repository link

---

## Final Architecture

```text
Home
 │
 └── RepositoryCard
          │
          ▼
 /repository/:owner/:repo
          │
          ▼
 RepositoryDetails.tsx
          │
          ▼
 useRepositoryDetails()
          │
          ▼
 githubApi.ts
          │
          ▼
 GitHub REST API
```