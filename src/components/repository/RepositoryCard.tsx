import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import type { Repository } from '../../types/repository'

interface RepositoryCardProps {
  repository: Repository
}

const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const [owner] = repository.full_name.split('/')
  const detailsPath = `/repository/${owner}/${repository.name}`

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm transition hover:border-cyan-400/50 hover:shadow-md">
      <div className="flex flex-col gap-4">
        <Link to={detailsPath} className="block">
          <div>
            <h2 className="text-xl font-semibold text-white">{repository.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{repository.full_name}</p>
          </div>
        </Link>

        <p className="text-sm leading-6 text-slate-300">
          {repository.description || 'No description available.'}
        </p>

        <div className="flex flex-wrap gap-3 text-sm text-slate-300">
          <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1">
            {repository.language || 'Unknown'}
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1">
            ⭐ {repository.stargazers_count}
          </span>
          <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1">
            🍴 {repository.forks_count}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={detailsPath}
              className="inline-flex w-fit items-center text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              View details →
            </Link>

            <a
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              View on GitHub →
            </a>
          </div>

          <FavoriteButton repository={repository} />
        </div>
      </div>
    </article>
  )
}

export default RepositoryCard
