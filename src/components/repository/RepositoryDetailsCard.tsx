import type { Repository } from '../../types/repository'

interface RepositoryDetailsCardProps {
  repository: Repository
}

const RepositoryDetailsCard = ({ repository }: RepositoryDetailsCardProps) => {
  const stats = [
    { label: 'Stars', value: repository.stargazers_count.toLocaleString() },
    { label: 'Forks', value: repository.forks_count.toLocaleString() },
    { label: 'Issues', value: repository.open_issues_count.toLocaleString() },
  ]

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-sm">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Repository Overview
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{repository.name}</h1>
          <p className="mt-3 text-lg text-slate-300">
            {repository.description || 'No description available.'}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
            <p className="text-sm text-slate-400">Owner</p>
            <p className="mt-1 font-medium text-white">{repository.owner.login}</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
            <p className="text-sm text-slate-400">Language</p>
            <p className="mt-1 font-medium text-white">{repository.language || 'Unknown'}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-800 bg-slate-800/60 px-4 py-3">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-1 font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RepositoryDetailsCard
