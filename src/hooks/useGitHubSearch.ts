import { useRef, useState } from 'react'
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
  const activeRequestIdRef = useRef(0)
  const activeQueryRef = useRef<string | null>(null)
  const inFlightRef = useRef(false)

  const searchRepositories = async (query: string) => {
    const normalizedQuery = query.trim()

    if (!normalizedQuery) {
      setHasSearched(true)
      setRepositories([])
      setError('Please enter a repository name to search.')
      return
    }

    if (activeQueryRef.current === normalizedQuery && inFlightRef.current) {
      return
    }

    const requestId = activeRequestIdRef.current + 1
    activeRequestIdRef.current = requestId
    activeQueryRef.current = normalizedQuery
    inFlightRef.current = true

    setHasSearched(true)
    setLoading(true)
    setError(null)

    try {
      const response = await searchGitHubRepositories(normalizedQuery)
      if (requestId === activeRequestIdRef.current) {
        setRepositories(response.items)
      }
    } catch (err) {
      const message =
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof err.message === 'string'
          ? err.message
          : 'Something went wrong while searching repositories.'

      if (requestId === activeRequestIdRef.current) {
        setError(message)
        setRepositories([])
      }
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setLoading(false)
        inFlightRef.current = false
      }
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