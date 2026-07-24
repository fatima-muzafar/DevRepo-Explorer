const NotFound = () => {
  return (
    <section className="bg-slate-950 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          Error 404
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          The page you are looking for does not exist yet.
        </p>
      </div>
    </section>
  )
}

export default NotFound
