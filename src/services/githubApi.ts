import type { Repository, SearchResponse } from '../types/repository'

export type GitHubRepository = Repository
export type GitHubSearchResponse = SearchResponse

export interface GitHubApiError {
  message: string
  status?: number
}

const GITHUB_API_BASE_URL = 'https://api.github.com'

export const searchRepositories = async (query: string): Promise<GitHubSearchResponse> => {
  if (!query.trim()) {
    throw { message: 'Search query cannot be empty.' } as GitHubApiError
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
        message: error.message,
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
      const message =
        errorData?.message || `GitHub API request failed with status ${response.status}`

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
        message: error.message,
      } as GitHubApiError
    }

    throw error
  }
}
