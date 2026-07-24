import { useState } from 'react'
import { useFavoritesContext } from '../../context/FavoritesContext'
import type { FavoriteRepository } from '../../types/favorite'
import type { Repository } from '../../types/repository'

interface FavoriteButtonProps {
  repository: Repository
}

const FavoriteButton = ({ repository }: FavoriteButtonProps) => {
  const { favorites, loading, saveFavorite, removeFavorite } = useFavoritesContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const repositoryId = String(repository.id)
  const isSaved = favorites.some((favorite) => favorite.id === repositoryId)

  const handleToggle = async () => {
    try {
      setIsSubmitting(true)
      setError(null)

      if (isSaved) {
        await removeFavorite(repositoryId)
      } else {
        const favoritePayload: FavoriteRepository = {
          id: repositoryId,
          name: repository.name,
          owner: repository.owner.login,
          description: repository.description,
          stars: repository.stargazers_count,
          language: repository.language,
          htmlUrl: repository.html_url,
          savedAt: new Date().toISOString(),
        }

        await saveFavorite(favoritePayload)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to update favorites right now.'
      setError(message.includes('logged in') ? 'Please sign in to manage favorites.' : message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleToggle}
        disabled={isSubmitting || loading}
        aria-busy={isSubmitting}
        aria-live="polite"
        className={`inline-flex min-w-[9.5rem] items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-70 ${
          isSaved
            ? 'border-cyan-400 bg-cyan-500/15 text-cyan-300'
            : 'border-slate-700 bg-slate-800 text-slate-200 hover:border-cyan-400 hover:text-cyan-300'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {isSaved ? 'Removing...' : 'Saving...'}
          </span>
        ) : isSaved ? (
          '❤️ Remove Favorite'
        ) : (
          '⭐ Save Favorite'
        )}
      </button>

      {error && (
        <p role="alert" className="max-w-xs text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

export default FavoriteButton
