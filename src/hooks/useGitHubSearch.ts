import { useState } from 'react'
import { searchRepositories as searchGitHubRepositories } from '../services/githubApi'
import type { Repository } from '../types/repository'

interface UseGitHubSearchResult {
  repositories: Repository[]
  loading: boolean
  error: string | null
  hasSearched: boolean
  searchRepositories: (query: string) => Promise<void>
}

export const useGitHubSearch = (): UseGitHubSearchResult => {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const searchRepositories = async (query: string) => {
    setHasSearched(true)
    setLoading(true)
    setError(null)

    try {
      const response = await searchGitHubRepositories(query)
      setRepositories(response.items)
    } catch (err) {
      const message =
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof err.message === 'string'
          ? err.message
          : 'Something went wrong while searching repositories.'

      setError(message)
      setRepositories([])
    } finally {
      setLoading(false)
    }
  }

  return {
    repositories,
    loading,
    error,
    hasSearched,
    searchRepositories,
  }
}

export default useGitHubSearch