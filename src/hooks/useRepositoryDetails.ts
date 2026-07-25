import { useCallback, useRef, useState } from 'react'
import { getRepositoryDetails } from '../services/githubApi'
import type { Repository } from '../types/repository'

export const useRepositoryDetails = (owner: string, repo: string) => {
  const [repository, setRepository] = useState<Repository | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const activeRequestIdRef = useRef(0)
  const inFlightRef = useRef(false)

  const loadRepositoryDetails = useCallback(async () => {
    if (inFlightRef.current && owner.trim() && repo.trim()) {
      return
    }

    const requestId = activeRequestIdRef.current + 1
    activeRequestIdRef.current = requestId
    inFlightRef.current = true
    setLoading(true)
    setError(null)

    try {
      const details = await getRepositoryDetails(owner, repo)
      if (requestId === activeRequestIdRef.current) {
        setRepository(details)
      }
    } catch (err) {
      const message =
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof err.message === 'string'
          ? err.message
          : 'Something went wrong while loading repository details.'

      if (requestId === activeRequestIdRef.current) {
        setError(message)
        setRepository(null)
      }
    } finally {
      if (requestId === activeRequestIdRef.current) {
        setLoading(false)
        inFlightRef.current = false
      }
    }
  }, [owner, repo])

  return {
    repository,
    loading,
    error,
    loadRepositoryDetails,
  }
}

export default useRepositoryDetails