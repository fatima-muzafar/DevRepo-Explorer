import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getFavorites, isFavorite, removeFavorite, saveFavorite as saveFavoriteService } from '../services/favoritesService'
import type { FavoriteRepository } from '../types/favorite'

interface UseFavoritesResult {
  favorites: FavoriteRepository[]
  loading: boolean
  error: string | null
  loadFavorites: () => Promise<void>
  saveFavorite: (repository: FavoriteRepository) => Promise<void>
  removeFavorite: (repositoryId: string) => Promise<void>
  isFavorite: (repositoryId: string) => Promise<boolean>
}

export const useFavorites = (): UseFavoritesResult => {
  const { currentUser } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteRepository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const loadingRef = useRef(false)

  const loadFavorites = useCallback(async () => {
    if (!currentUser?.uid) {
      setFavorites([])
      setError(null)
      return
    }

    if (loadingRef.current) {
      return
    }

    loadingRef.current = true

    try {
      setLoading(true)
      setError(null)
      const userFavorites = await getFavorites(currentUser.uid)
      setFavorites(userFavorites)
    } catch (err) {
      setError(err instanceof Error ? 'We could not load your saved repositories. Please try again.' : 'Failed to load favorites.')
    } finally {
      setLoading(false)
      loadingRef.current = false
    }
  }, [currentUser])

  const saveFavorite = useCallback(async (repository: FavoriteRepository) => {
    if (!currentUser?.uid) {
      throw new Error('You must be logged in to save a favorite.')
    }

    try {
      setError(null)
      await saveFavoriteService(currentUser.uid, repository)
      await loadFavorites()
    } catch (err) {
      setError(err instanceof Error ? 'We could not save this repository. Please try again.' : 'Failed to save favorite.')
      throw err
    }
  }, [currentUser, loadFavorites])

  const removeFavoriteById = useCallback(async (repositoryId: string) => {
    if (!currentUser?.uid) {
      throw new Error('You must be logged in to remove a favorite.')
    }

    try {
      setError(null)
      await removeFavorite(currentUser.uid, repositoryId)
      await loadFavorites()
    } catch (err) {
      setError(err instanceof Error ? 'We could not remove this repository. Please try again.' : 'Failed to remove favorite.')
      throw err
    }
  }, [currentUser, loadFavorites])

  const checkIsFavorite = useCallback(async (repositoryId: string) => {
    if (!currentUser?.uid) {
      return false
    }

    try {
      return await isFavorite(currentUser.uid, repositoryId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check favorite status.')
      return false
    }
  }, [currentUser])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadFavorites()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [loadFavorites])

  return {
    favorites,
    loading,
    error,
    loadFavorites,
    saveFavorite,
    removeFavorite: removeFavoriteById,
    isFavorite: checkIsFavorite,
  }
}

export default useFavorites
