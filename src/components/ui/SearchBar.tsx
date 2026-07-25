import { type FormEvent, type KeyboardEvent } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
  placeholder?: string
  label?: string
  isLoading?: boolean
}

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search repositories...',
  label = 'Search repositories',
  isLoading = false,
}: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isLoading) {
      onSearch(value)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      event.preventDefault()
      onSearch(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search" aria-busy={isLoading}>
      <label htmlFor="repository-search" className="sr-only">
        {label}
      </label>
      <div className="flex flex-col gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-sm focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 sm:flex-row sm:items-center">
        <input
          id="repository-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full min-w-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          aria-label="Search repositories"
          disabled={isLoading}
          className="w-full rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar
