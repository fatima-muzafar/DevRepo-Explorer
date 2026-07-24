interface RepositoryStatsProps {
  stars: number
  forks: number
  issues: number
}

const RepositoryStats = ({ stars, forks, issues }: RepositoryStatsProps) => {
  const stats = [
    { label: 'Stars', value: stars.toLocaleString() },
    { label: 'Forks', value: forks.toLocaleString() },
    { label: 'Issues', value: issues.toLocaleString() },
  ]

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-white">Repository statistics</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-slate-800 bg-slate-800/60 p-4">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RepositoryStats
