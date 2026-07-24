import { useMemo } from 'react'
import RepositoryCard from '../components/repository/RepositoryCard'
import { useFavoritesContext } from '../context/FavoritesContext'
import type { Repository } from '../types/repository'

const Favorites = () => {
  const { favorites, loading, error } = useFavoritesContext()

  const repositories = useMemo<Repository[]>(() => {
    return favorites.map((favorite) => ({
      id: Number(favorite.id),
      name: favorite.name,
      full_name: `${favorite.owner}/${favorite.name}`,
      description: favorite.description,
      html_url: favorite.htmlUrl,
      stargazers_count: favorite.stars,
      forks_count: 0,
      open_issues_count: 0,
      language: favorite.language,
      topics: [],
      owner: {
        login: favorite.owner,
        avatar_url: '',
      },
      created_at: '',
      updated_at: '',
    }))
  }, [favorites])

  return (
    <section className="bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl sm:p-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Saved</p>
            <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Your favorites</h1>
          </div>
          <p className="text-sm text-slate-400">{favorites.length} saved</p>
        </div>

        {loading && (
          <div className="mt-8 grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border border-slate-800 bg-slate-800/60 p-6">
                <div className="h-5 w-2/3 rounded bg-slate-700" />
                <div className="mt-4 h-4 w-full rounded bg-slate-700" />
                <div className="mt-2 h-4 w-4/5 rounded bg-slate-700" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div role="alert" className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && favorites.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-700 bg-slate-800/40 p-8 text-center text-slate-300">
            <p className="text-lg font-medium text-white">No favorites yet</p>
            <p className="mt-2 text-sm text-slate-400">
              Save repositories from the details page to see them here.
            </p>
          </div>
        )}

        {!loading && !error && favorites.length > 0 && (
          <div className="mt-8 grid gap-6">
            {repositories.map((repository) => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Favorites
