import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function FrameManager({ isPaused, children }) {
  useFrame(({ invalidate }) => {
    if (!isPaused) {
      invalidate()
    }
  })
  return <>{children}</>
}

export default function ThreeDFigure({ caption, children, ...props }) {
  const [isPaused, setPaused] = useState(false)
  const figureRef = useRef()
  useEffect(() => {
    const onPointerMove = (e) => {
      e.preventDefault()
    }
    figureRef.current.addEventListener('pointermove', onPointerMove, {
      passive: false
    })
    figureRef.current.addEventListener('touchmove', onPointerMove, {
      passive: false
    })
    return () => {
      figureRef.current.removeEventListener('pointermove', onPointerMove)
      figureRef.current.removeEventListener('touchmove', onPointerMove)
    }
  }, [])

  return (
    <>
      <style jsx>{`
        figure {
          position: relative;
          height: 50vh;
          margin-bottom: ${!!caption ? '3em' : '1em'};
          overscroll-behavior: contain;
        }

        button {
          position: absolute;
          background: rgba(127, 127, 127, 0.5);
          bottom: 5px;
          left: 5px;
          z-index: 1;
        }
      `}</style>
      <figure ref={figureRef}>
        <Canvas
          frameloop="demand"
          gl={{
            powerPreference: 'low-power'
          }}
          {...props}
          onPointerMove={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}>
          <FrameManager isPaused={isPaused}>{children}</FrameManager>
        </Canvas>
        {/* <button aria-label="Toggle playing / pausing this figure" onClick={() => {
          setPaused(!isPaused)
        }}>
          {isPaused ? 'Play' : 'Pause'}
        </button> */}
        {caption}
      </figure>
    </>
  )
}
