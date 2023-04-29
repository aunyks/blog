import { useEffect, useState } from 'react'
import cx from 'classnames'

export default function CodeBlock({
  className,
  lang,
  showCodeByDefault,
  noClipboardButton,
  noButton,
  children
}) {
  const [Prism, setPrism] = useState(null)
  const [cbWriteSuccess, setCbWriteSuccess] = useState(false)
  useEffect(() => {
    setPrism(window.Prism)
  }, [])

  const [isShowingCode, setShowingCode] = useState(
    showCodeByDefault ? true : false
  )

  return (
    <>
      <style jsx>{`
        .no-code-btn {
          background: var(--yellow);
        }

        .code-btn {
          background: var(--yellow);
        }

        @media (prefers-color-scheme: dark) {
          .code-btn {
            background: var(--indigo);
          }
        }

        @media (prefers-color-scheme: dark) {
          .no-code-btn {
            background: var(--indigo);
          }
        }
      `}</style>
      <div
        className={cx('p-0', 'm-0', {
          block: isShowingCode,
          hidden: !isShowingCode
        })}>
        <pre
          className={`${
            className || ''
          } code-block overflow-x-scroll language-${lang}`}>
          <code
            className={`language-${lang}`}
            dangerouslySetInnerHTML={{
              __html:
                Prism === null
                  ? ''
                  : Prism.highlight(
                      children.trim(),
                      Prism.languages[lang],
                      lang
                    )
            }}></code>
        </pre>
        <div className="flex flex-row p-0 m-0">
          {!noClipboardButton && (
            <button
              className="no-code-btn my-2 px-2 mr-1 py-0 text-sm rounded-sm"
              onClick={async () => {
                await navigator.clipboard.writeText(children.trim())
                setCbWriteSuccess(true)
                setTimeout(() => {
                  setCbWriteSuccess(false)
                }, 2000)
              }}>
              {cbWriteSuccess ? 'Copied' : 'Copy'} to clipboard{' '}
              {cbWriteSuccess && <>&#10003;</>}
            </button>
          )}
          {!noButton && (
            <button
              className="no-code-btn my-2 px-2 ml-1 py-0 text-sm rounded-sm"
              onClick={() => {
                setShowingCode(false)
              }}>
              Hide code &#9650;
            </button>
          )}
        </div>
      </div>
      <button
        className={cx('code-btn', 'w-full', 'text-center', 'py-2', 'rounded', {
          hidden: isShowingCode,
          block: !isShowingCode
        })}
        onClick={() => {
          setShowingCode(true)
        }}>
        Show Code &#9660;
      </button>
    </>
  )
}
