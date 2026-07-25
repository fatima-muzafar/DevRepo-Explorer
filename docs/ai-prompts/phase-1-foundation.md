# Phase 1 — Project Foundation

## Goal

Set up the initial project architecture for **DevRepo Explorer** by creating a scalable folder structure, configuring React Router, establishing a reusable layout system, creating placeholder pages, and connecting the routing structure.

---

## Prompt 1 — Create Folder Structure

```text
I am building DevRepo Explorer, a React + TypeScript + Vite + Tailwind CSS project.

React and Tailwind are already configured.

Help me create the project folder architecture based on my SDD.

Create this structure inside src:

src/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   └── repository/
├── pages/
├── hooks/
├── context/
├── services/
├── types/
├── routes/
├── utils/
├── config/

Create only the folders and basic placeholder files where needed.

Do not add business logic, API calls, Firebase, or authentication.

Keep the structure clean and scalable for future development.
```

---

## Prompt 2 — Setup React Router

```text
I am implementing Phase 1 of my DevRepo Explorer project.

React + TypeScript + Vite and Tailwind CSS are already configured.

Install and configure React Router.

Requirements:

Create these routes:

/
- Home page

/repository/:owner/:repo
- Repository details page

/login
- Login page

/favorites
- Favorites page (placeholder protected route)

/*
- Not Found page

Implementation requirements:

1. Create routing configuration inside:
src/routes/

2. Create:
- AppRoutes.tsx

3. Configure BrowserRouter correctly.

4. Keep routing separate from App.tsx.

5. Use TypeScript.

6. Do not implement Firebase authentication yet.

7. Create a ProtectedRoute placeholder component that only wraps children using Outlet.

Follow clean architecture principles.

After implementation, explain:
- Files created
- Changes made
- How routing works.
```

---

## Prompt 3 — Create Layout System

```text
I am implementing the layout system for my DevRepo Explorer React TypeScript project.

Create a reusable layout architecture.

Create:

src/components/layout/

Files:

- Layout.tsx
- Navbar.tsx
- Footer.tsx

Requirements:

Layout:
- Use React Router Outlet.

Structure:

Navbar
   |
Main Content
   |
Footer

Navbar:
- Responsive navigation.
- Links:
  - Home
  - Favorites
  - Login
- Use React Router Link.
- Use Tailwind CSS.
- Accessible navigation.

Footer:
- Simple reusable footer.
- Responsive.
- Tailwind CSS only.

Do not add authentication logic yet.

Keep components reusable and production-quality.
```

---

## Prompt 4 — Create Basic Pages

```text
I am implementing the page structure for DevRepo Explorer.

Create these pages inside:

src/pages/

Files:

- Home.tsx
- RepositoryDetails.tsx
- Favorites.tsx
- Login.tsx
- NotFound.tsx

Requirements:

Each page should:

- Be a functional React TypeScript component.
- Use Tailwind CSS.
- Have semantic HTML.
- Include simple placeholder content.
- Have proper page headings.
- Be ready for future feature implementation.

Do not add:
- API calls
- Firebase
- Authentication logic
- Business logic

Keep pages clean and only responsible for rendering UI.
```

---

## Prompt 5 — Connect Layout and Routes

```text
I have created:

- React Router
- Layout component
- Navbar
- Footer
- Pages

Now connect the routing structure.

Requirements:

Use nested routes:

Layout
 |
 ├── Home
 ├── RepositoryDetails
 ├── Favorites
 ├── Login
 └── NotFound

Use React Router Outlet.

Ensure:
- Navbar and Footer appear on all normal pages.
- Routes work correctly.
- No duplicate BrowserRouter.
- TypeScript has no errors.

After completing, explain the final routing flow.
```

---

## Outcome

After completing Phase 1, the project includes:

- A scalable folder structure.
- React Router configured with nested routes.
- Reusable Layout, Navbar, and Footer components.
- Placeholder pages for future implementation.
- A clean routing architecture following React and TypeScript best practices.
- A solid foundation for implementing repository search, authentication, and favorites in later phases.