import {
  useState,
  useEffect
} from 'react'

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
    <nav id="navbar"
      style={{ boxShadow: '0px 0px 2px #000' }}
      className="z-50 bg-white top-0 inset-x-0 fixed flex items-center justify-between flex-wrap px-3 py-3 lg:px-5">
      <div className="flex items-center flex-shrink-0 mr-6">
        <a href="/" style={{ textColor: 'black' }} className="font-semibold text-xl tracking-tight no-underline">
          Hi-Voltage
        </a>
      </div>
      <div className="block lg:hidden">
        <span onClick={() => setNavbarOpen(!isOpen)} className="flex items-center">
          <svg className=" h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </span>
      </div>
      <div style={{ display: `${isOpen ? 'flex' : 'none'}` }} id="navbar-items" className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          {/* LEFT SIDE OF NAV (LARGE SCREEN) */}
        </div>
        <div>
          {/* RIGHT SIDE OF NAV (LARGE SCREEN) */}
          <a href="https://aunyks.com/about" className="no-underline block mt-4 lg:inline-block lg:mt-0 mr-4">
            About
          </a>
          <a href="/music" className="no-underline block mt-4 lg:inline-block lg:mt-0 mr-4">
            Music
          </a>
          <a href="/tech" className="no-underline block mt-4 lg:inline-block lg:mt-0 mr-4">
            Tech
          </a>
          <a href="/tech-culture" className="no-underline block mt-4 lg:inline-block lg:mt-0 mr-4">
            Tech{'<>'}Culture
            </a>
          <a href="/thoughts" className="no-underline block mt-4 lg:inline-block lg:mt-0 mr-4">
            Thoughts
            </a>
          <a href="/notes" className="no-underline block mt-4 lg:inline-block lg:mt-0 mr-4">
            Notes
            </a>
        </div>
      </div>
    </nav>
  )
}