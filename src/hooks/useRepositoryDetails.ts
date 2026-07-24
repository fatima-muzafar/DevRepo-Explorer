import { useCallback, useState } from 'react'
import { getRepositoryDetails } from '../services/githubApi'
import type { Repository } from '../types/repository'

export const useRepositoryDetails = (owner: string, repo: string) => {
  const [repository, setRepository] = useState<Repository | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadRepositoryDetails = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const details = await getRepositoryDetails(owner, repo)
      setRepository(details)
    } catch (err) {
      const message =
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof err.message === 'string'
          ? err.message
          : 'Something went wrong while loading repository details.'

      setError(message)
      setRepository(null)
    } finally {
      setLoading(false)
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