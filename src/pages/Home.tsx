import { useCallback, useState } from 'react'
import SearchBar from '../components/ui/SearchBar'
import RepositoryCard from '../components/repository/RepositoryCard'
import { useGitHubSearch } from '../hooks/useGitHubSearch'

const Home = () => {
  const [query, setQuery] = useState('')
  const { 
  repositories, 
  loading, 
  error, 
  hasSearched,
  searchRepositories 
} = useGitHubSearch()

  const handleSearch = useCallback(async (value: string) => {
    await searchRepositories(value)
  }, [searchRepositories])

  const handleRetry = useCallback(async () => {
    if (!query.trim()) {
      return
    }

    await handleSearch(query)
  }, [handleSearch, query])

  return (
    <section className="bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl sm:space-y-8 sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Repository Search
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Discover repositories with clarity
          </h1>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            Search GitHub repositories and explore the most relevant results in one place.
          </p>
        </div>

        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={handleSearch}
          placeholder="Search repositories"
          label="Search GitHub repositories"
          isLoading={loading}
        />

        {loading && (
          <div className="grid gap-4 md:grid-cols-2" aria-live="polite">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse rounded-2xl border border-slate-800 bg-slate-800/60 p-6">
                <div className="h-5 w-2/3 rounded bg-slate-700" />
                <div className="mt-4 h-4 w-full rounded bg-slate-700" />
                <div className="mt-2 h-4 w-4/5 rounded bg-slate-700" />
                <div className="mt-6 h-8 w-24 rounded bg-slate-700" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="space-y-3">
            <div role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
            <button
              type="button"
              onClick={() => void handleRetry()}
              className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && hasSearched && repositories.length === 0 && (
          <div role="status" className="rounded-2xl border border-slate-800 bg-slate-800/40 p-6 text-sm text-slate-300">
            No repositories found for this search.
          </div>
        )}

        {!loading && repositories.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2" aria-live="polite">
            {repositories.map((repository) => (
              <RepositoryCard key={repository.id} repository={repository} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Home
