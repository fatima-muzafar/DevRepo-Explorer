# Manual Improvements

## Overview

Although GitHub Copilot and ChatGPT assisted during development, several issues were identified and resolved through manual debugging and code review. These improvements enhanced the application's stability, navigation, and user experience.

---

## 1. Preserving Search State Across Navigation

### Issue

When navigating from the search results to a repository's details page and then returning, the previous search query and search results were lost.

### Manual Improvement

Implemented state persistence so that the search query and results are preserved when returning to the Home page.

### Outcome

- Improved user experience.
- Eliminated unnecessary repeated searches.
- Maintained user context during navigation.

---

## 2. Repository Details Page Flickering

### Issue

The Repository Details page flickered whenever it was opened.

### Cause

The `loadRepositoryDetails` function was recreated on every render, causing the `useEffect` hook to execute repeatedly and trigger unnecessary API requests.

### Manual Improvement

Wrapped the `loadRepositoryDetails` function with React's `useCallback` hook to keep the function reference stable and prevent unnecessary re-fetching.

### Outcome

- Eliminated page flickering.
- Prevented redundant API requests.
- Improved rendering performance.

---

## 3. Register Page Returning 404

### Issue

Clicking **Register** in the navigation bar opened the 404 page.

### Cause

The `/register` route was missing from the application's routing configuration.

### Manual Improvement

Imported the `Register` page into `AppRoutes.tsx` and added the missing route so it matched the navigation link.

### Outcome

- Restored access to the Register page.
- Fixed broken navigation.
- Improved overall application reliability.

---

## Review Process

Every AI-generated suggestion was carefully reviewed before being accepted. This included:

- Verifying application logic.
- Testing features manually.
- Debugging issues that AI-generated code did not resolve.
- Refining implementations where necessary.
- Ensuring the final code met the project's quality standards.

These manual improvements demonstrate that AI was used as a development assistant, while all final implementation decisions, debugging, and refinements were completed through manual review and testing.