import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { currentUser, logout } = useAuth()

  const navItems = currentUser
    ? [
        { to: '/', label: 'Home' },
        { to: '/favorites', label: 'Favorites' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/login', label: 'Login' },
        { to: '/register', label: 'Register' },
      ]

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-lg font-semibold tracking-tight text-white transition hover:text-cyan-400">
          DevRepo Explorer
        </NavLink>

        <nav aria-label="Primary navigation" className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'rounded-md px-3 py-2 text-sm font-medium transition',
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}

          {currentUser && (
            <button
              type="button"
              onClick={() => void logout()}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
