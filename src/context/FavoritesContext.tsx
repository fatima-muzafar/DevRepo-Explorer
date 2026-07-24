import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useFavorites } from '../hooks/useFavorites'
import type { FavoriteRepository } from '../types/favorite'

interface FavoritesContextValue {
  favorites: FavoriteRepository[]
  loading: boolean
  error: string | null
  loadFavorites: () => Promise<void>
  saveFavorite: (repository: FavoriteRepository) => Promise<void>
  removeFavorite: (repositoryId: string) => Promise<void>
  isFavorite: (repositoryId: string) => Promise<boolean>
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

interface FavoritesProviderProps {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const favoritesHook = useFavorites()

  const value = useMemo<FavoritesContextValue>(
    () => favoritesHook,
    [favoritesHook.favorites, favoritesHook.loading, favoritesHook.error, favoritesHook.loadFavorites, favoritesHook.saveFavorite, favoritesHook.removeFavorite, favoritesHook.isFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider')
  }

  return context
}

export default FavoritesContext
