import useDeviceSize from 'hooks/use-device-size'
import useKeyPress from 'hooks/use-key-press'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

function ModalCross() {
  const deviceSize = useDeviceSize()
  let crossWidth = 9
  switch (deviceSize) {
    case 'xs':
      crossWidth = 27
      break
    case 'sm':
      crossWidth = 27
      break
    case 'md':
      crossWidth = 35
      break
    case 'lg':
      crossWidth = 35
      break
    default:
      throw new Error(`Unknown device size ${deviceSize} found in  ModalCross`)
  }
  return (
    <>
      <style jsx>{`
        path {
          fill: #000;
        }

        @media (prefers-color-scheme: dark) {
          path {
            fill: #fff;
          }
        }
      `}</style>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={`${crossWidth}`}
        fill="none"
        aria-hidden="true"
        focusable="false"
        role="img">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.63615 5.63603C6.02668 5.24551 6.65984 5.24551 7.05037 5.63603L18.3641 16.9497C18.7546 17.3403 18.7546 17.9734 18.3641 18.364C17.9736 18.7545 17.3404 18.7545 16.9499 18.364L5.63615 7.05024C5.24563 6.65972 5.24563 6.02656 5.63615 5.63603Z"></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.3637 5.63603C18.7542 6.02656 18.7542 6.65972 18.3637 7.05025L7.04998 18.364C6.65946 18.7545 6.02629 18.7545 5.63577 18.364C5.24525 17.9734 5.24525 17.3403 5.63577 16.9497L16.9495 5.63603C17.34 5.24551 17.9732 5.24551 18.3637 5.63603Z"></path>
      </svg>
    </>
  )
}

export default function Modal({
  label,
  title,
  active,
  onClose,
  noScroll,
  footing,
  children,
  className = ''
}) {
  const dialogRef = useRef()
  // To fix SSR hydration issues, this component simply doesn't
  // render on the server. Just the client
  const [loadedOnClient, setOnClientSide] = useState(false)
  // And once it's on the client, we ideally parent ourselves
  // to the document body using a portal instead of whatever React parent we're given
  const [modalParent, setModalParent] = useState(null)
  useEffect(() => {
    setModalParent(window.document.body)
    setOnClientSide(true)
  }, [])

  // Modals should always be escape key-closable
  const escapePressed = useKeyPress('Escape')
  if (active && escapePressed && !!onClose) {
    onClose()
  }

  // For keyboard & screen reader users to focus on the modal
  // once it becomes active
  useEffect(() => {
    if (active && dialogRef.current) {
      dialogRef.current.focus()
    }
  }, [active])

  if (loadedOnClient) {
    const modalComponent = (
      <>
        <style jsx>{`
          .modal-overlay {
            background: rgba(0, 0, 0, 0.5) !important;
            -webkit-backdrop-filter: blur(3px) !important;
            backdrop-filter: blur(3px) !important;
            z-index: 999;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }

          .modal-dialog {
            z-index: 4;
            transition: all 0.2s;
            transform: translateY(20px);
            opacity: 0;
          }

          .modal-dialog.active {
            transform: translateY(0px);
            opacity: 1;
          }

          @media (prefers-reduced-motion) {
            .modal-dialog {
              transition: none;
            }
          }
        `}</style>
        <div
          onClick={onClose}
          style={{ visibility: active ? 'visible' : 'hidden' }}
          aria-hidden={active ? 'false' : 'true'}
          className="flex fixed inset-0 w-full h-full flex-col justify-center modal-overlay">
          <aside
            ref={dialogRef}
            tabIndex="-1"
            role="alertdialog"
            aria-modal="true"
            aria-label={label || title}
            onClick={(e) => {
              // Don't want any click events here to
              // bubble up into the overlay, causing the modal to
              // close too early
              e.stopPropagation()
            }}
            className={cx(
              'flex',
              'flex-col',
              'z-10',
              'w-11/12',
              'md:w-4/6',
              'lg:w-1/2',
              'rounded',
              'mx-auto',
              'modal-dialog',
              {
                active: active,
                [className]: !!className
              }
            )}>
            <section
              className={cx('order-2', 'px-4', {
                'overflow-y-scroll': !noScroll
              })}
              style={{ maxHeight: '17rem' }}>
              {children}
            </section>
            <footer className="order-3 px-4">{footing}</footer>
            <header
              className={cx('order-1', 'py-0', 'px-4', 'flex', 'flex-row', {
                'justify-between': !!title,
                'justify-end': !title
              })}>
              {typeof title === 'string' ? (
                <h3 className="text-sm md:text-lg lg:text-xl font-normal my-2">
                  {title}
                </h3>
              ) : (
                <>{title}</>
              )}
              {onClose && (
                <button
                  title="Close this dialog"
                  aria-label="Close this dialog"
                  className="pr-0"
                  onClick={(e) => {
                    onClose(e)
                    // Only want this click event
                    // to run for this button and no ancestors
                    e.stopPropagation()
                  }}>
                  <ModalCross />
                </button>
              )}
            </header>
          </aside>
        </div>
      </>
    )
    return createPortal(modalComponent, modalParent)
  }
  return null
}
