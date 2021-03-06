import {
  useEffect,
  useState
} from 'react'

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

  const [isShowingCode, setShowingCode] = useState(showCodeByDefault ? true : false)

  return (
    <>
      <style jsx>{`
        .no-code-btn {
          background: #fab700;
        }

        .code-btn {
          background: #fab700;
        }

        @media (prefers-color-scheme: dark) {
          .code-btn {
            background: #5d44f8;
          }
        }
        
        @media (prefers-color-scheme: dark) {
          .no-code-btn {
            background: #5d44f8;
          }
        }
      `}</style>
      <div className={`p-0 m-0 ${isShowingCode ? "block" : "hidden"}`}>
        <pre className={`${className || ''} code-block overflow-x-scroll`}>
          <code
            className={`language-${lang}`}
            dangerouslySetInnerHTML={{ __html: Prism === null ? '' : Prism.highlight(children.trim(), Prism.languages[lang], lang) }}>
          </code>
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
              {cbWriteSuccess ? 'Copied' : 'Copy'} to clipboard {cbWriteSuccess && <>&#10003;</>}
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
        className={`${isShowingCode ? "hidden" : "block"} code-btn w-full text-center py-2 rounded`}
        onClick={() => {
          setShowingCode(true)
        }}>
        Show Code &#9660;
      </button>
    </>
  )
}