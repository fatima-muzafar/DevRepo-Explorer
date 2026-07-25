import type { Repository, SearchResponse } from '../types/repository'

export type GitHubRepository = Repository
export type GitHubSearchResponse = SearchResponse

export interface GitHubApiError {
  message: string
  status?: number
}

const GITHUB_API_BASE_URL = 'https://api.github.com'

const normalizeGitHubError = (message: string | undefined, status?: number) => {
  if (!message) {
    return 'We could not reach GitHub right now. Please check your connection and try again.'
  }

  if (status === 403 || status === 429) {
    return 'GitHub is temporarily rate-limiting requests. Please wait a moment and try again.'
  }

  if (status === 404) {
    return 'We could not find the repository information you requested.'
  }

  if (status === 401) {
    return 'GitHub authentication failed. Please try again shortly.'
  }

  if (message.includes('fetch')) {
    return 'We could not reach GitHub right now. Please check your connection and try again.'
  }

  return message
}

export const searchRepositories = async (query: string): Promise<GitHubSearchResponse> => {
  if (!query.trim()) {
    throw { message: 'Please enter a repository name to search.' } as GitHubApiError
  }

  const url = `${GITHUB_API_BASE_URL}/search/repositories?q=${encodeURIComponent(query.trim())}`

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const message =
        errorData?.message || `GitHub API request failed with status ${response.status}`

      throw {
        message,
        status: response.status,
      } as GitHubApiError
    }

    const data = (await response.json()) as GitHubSearchResponse

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw {
        message: normalizeGitHubError(error.message),
      } as GitHubApiError
    }

    throw error
  }
}

export const getRepositoryDetails = async (owner: string, repo: string): Promise<GitHubRepository> => {
  const normalizedOwner = owner.trim()
  const normalizedRepo = repo.trim()

  if (!normalizedOwner || !normalizedRepo) {
    throw { message: 'Owner and repository name are required.' } as GitHubApiError
  }

  const url = `${GITHUB_API_BASE_URL}/repos/${encodeURIComponent(normalizedOwner)}/${encodeURIComponent(normalizedRepo)}`

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      const message = normalizeGitHubError(
        errorData?.message || `GitHub API request failed with status ${response.status}`,
        response.status,
      )

      throw {
        message,
        status: response.status,
      } as GitHubApiError
    }

    const data = (await response.json()) as GitHubRepository

    return data
  } catch (error) {
    if (error instanceof Error) {
      throw {
        message: normalizeGitHubError(error.message),
      } as GitHubApiError
    }

    throw error
  }
}
