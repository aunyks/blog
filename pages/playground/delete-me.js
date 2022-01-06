import { useState } from 'react'
import Navbar from 'components/Navbar'
import useDarkMode from 'hooks/use-dark-mode'

function UpChevron({ width, strokeWidth = 3, ...props }) {
  return (
    <svg width={width || '50'} viewBox="0 0 71 71" fill="none" {...props}>
      <line
        x1="35.7582"
        y1="24.1075"
        x2="4.10749"
        y2="49.2418"
        strokeWidth={`${strokeWidth}`}
        strokeLinecap="round"
      />
      <line
        x1="1.5"
        y1="-1.5"
        x2="41.9166"
        y2="-1.5"
        transform="matrix(0.783111 0.621882 0.621882 -0.783111 36 22)"
        strokeWidth={`${strokeWidth}`}
        strokeLinecap="round"
      />
    </svg>
  )
}

function DownChevron({ width, strokeWidth = 3, ...props }) {
  return (
    <svg width={width || '50'} viewBox="0 0 71 71" fill="none" {...props}>
      <line
        x1="1.5"
        y1="-1.5"
        x2="41.9166"
        y2="-1.5"
        transform="matrix(-0.783111 -0.621882 -0.621882 0.783111 36 49)"
        strokeWidth={`${strokeWidth}`}
        strokeLinecap="round"
      />
      <line
        x1="36.2418"
        y1="46.8925"
        x2="67.8925"
        y2="21.7582"
        strokeWidth={`${strokeWidth}`}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function PresentationPost() {
  const [drawerOpen, toggleDrawer] = useState(false)
  const isDark = useDarkMode()
  return (
    <>
      <style>{`
      .drawer {
        top: 88%;
        transition: top 0.35s ease-in-out 0s;
      }

      .drawer.open {
        top: 12.5%;
      }
    `}</style>
      <Navbar />
      <main style={{ height: '100vh', overflow: 'hidden' }}>
        <section className="w-full h-full bg-red z-0">
          <p>Hi</p>
        </section>
        <section
          className={`drawer ${
            drawerOpen ? 'open' : ''
          } w-full h-full rounted-t-lg bg-blue z-1 fixed`}>
          <button
            className="w-full"
            style={{ height: '12%' }}
            alt={drawerOpen ? 'Close drawer' : 'Open drawer'}
            title={drawerOpen ? 'Close details' : 'Open details'}
            onClick={() => {
              toggleDrawer(!drawerOpen)
            }}>
            {drawerOpen ? (
              <DownChevron
                className="mx-auto"
                strokeWidth={7}
                style={{ stroke: isDark ? 'white' : 'black' }}
              />
            ) : (
              <UpChevron
                className="mx-auto"
                strokeWidth={7}
                style={{ stroke: isDark ? 'white' : 'black' }}
              />
            )}
          </button>
          <div aria-hidden={`${drawerOpen ? 'false' : 'true'}`}>Bye</div>
        </section>
      </main>
    </>
  )
}
