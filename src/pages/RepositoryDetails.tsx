import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FavoriteButton from '../components/repository/FavoriteButton'
import RepositoryDetailsCard from '../components/repository/RepositoryDetailsCard'
import RepositoryStats from '../components/repository/RepositoryStats'
import { useRepositoryDetails } from '../hooks/useRepositoryDetails'

const RepositoryDetails = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>()
  const { repository, loading, error, loadRepositoryDetails } = useRepositoryDetails(owner ?? '', repo ?? '')

  useEffect(() => {
    if (owner && repo) {
      void loadRepositoryDetails()
    }
  }, [owner, repo, loadRepositoryDetails])

  return (
    <section className="bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl sm:p-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Repository details
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              {repository?.name || 'Repository details'}
            </h1>
          </div>
          {repository && <FavoriteButton repository={repository} />}
        </div>

        {loading && (
          <div className="space-y-4">
            <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-800/60 p-8">
              <div className="h-6 w-2/3 rounded bg-slate-700" />
              <div className="mt-4 h-4 w-full rounded bg-slate-700" />
              <div className="mt-2 h-4 w-4/5 rounded bg-slate-700" />
            </div>
            <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-800/60 p-6">
              <div className="h-5 w-1/3 rounded bg-slate-700" />
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="h-16 rounded bg-slate-700" />
                <div className="h-16 rounded bg-slate-700" />
                <div className="h-16 rounded bg-slate-700" />
              </div>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="space-y-3">
            <div role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
            <button
              type="button"
              onClick={() => void loadRepositoryDetails()}
              className="rounded-full border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && repository && (
          <div className="space-y-6">
            <RepositoryDetailsCard repository={repository} />
            <RepositoryStats
              stars={repository.stargazers_count}
              forks={repository.forks_count}
              issues={repository.open_issues_count}
            />

            <a
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default RepositoryDetails
