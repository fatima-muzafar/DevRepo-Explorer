import { type FormEvent, type KeyboardEvent } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: (value: string) => void
  placeholder?: string
  label?: string
}

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search repositories...',
  label = 'Search repositories',
}: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onSearch(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full" role="search">
      <label htmlFor="repository-search" className="sr-only">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-sm focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20">
        <input
          id="repository-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
        />
        <button
          type="submit"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
