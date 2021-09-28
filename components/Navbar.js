import {
  useState,
  useEffect
} from 'react'
import A from 'components/A'

const NavLink = ({ href, children }) => (
  <A href={href} className="text-sm no-underline block mt-4 lg:inline-block lg:mt-0 mr-4">
    {children}
  </A>
)

export default function Navbar() {
  const [isOpen, setNavbarOpen] = useState(false)
  const [cartLen, setCartLen] = useState(null)
  useEffect(() => {
    const smallScreenW = 640
    const mediumScreenW = 768
    const largeScreenW = 1024
    if (document.body.clientWidth >= largeScreenW) {
      setNavbarOpen(true)
    }
  }, [])
  return (
    <>
      <style jsx>{`
      @media print {
        nav {
          display: none;
        }
      }

      nav {
        background: var(--white);
        box-shadow: 0px 0px 2px var(--black);
        z-index: 2;
      }

      nav a {
        color: var(--black);
      }

      .logo-text {
        color: var(--black);
      }

      @media (prefers-color-scheme: dark) {
        nav {
          background: var(--dark-gray);
          box-shadow: 0px 0px 2px var(--light-gray);
        }
      
        nav a {
          color: var(--light-gray);
        }
      }
    `}</style>
      <nav id="navbar"
        className="top-0 inset-x-0 fixed flex items-center justify-between flex-wrap px-3 py-3 lg:px-24">
        <div className="flex items-center flex-shrink-0 mr-6">
          <a href="/" className="logo-text text-base font-semibold tracking-tight no-underline">
            Hi-Voltage
          </a>
        </div>
        <div className="block lg:hidden">
          <span onClick={() => setNavbarOpen(!isOpen)} className="flex items-center">
            <svg className="h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </span>
        </div>
        <div style={{ display: `${isOpen ? 'flex' : 'none'}` }} id="navbar-items" className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="lg:flex-grow">
            {/* LEFT SIDE OF NAV (LARGE SCREEN) */}
            <NavLink href="/all">
              Posts
            </NavLink>
            <NavLink href="/categories">
              Categories
            </NavLink>
            <NavLink href="/about">
              About
            </NavLink>
            <div className="block lg:hidden">
              <NavLink href="/thoughts">
                Thoughts
              </NavLink>
              <NavLink href="/notes">
                Notes
              </NavLink>
            </div>
          </div>
          <div className="hidden lg:block">
            {/* RIGHT SIDE OF NAV (LARGE SCREEN) */}
            <NavLink href="/thoughts">
              Thoughts
            </NavLink>
            <NavLink href="/notes">
              Notes
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}