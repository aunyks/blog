import {
  useEffect,
  useState
} from 'react'

export default function CodeBlock({
  className,
  lang,
  showCodeByDefault,
  children
}) {
  const [Prism, setPrism] = useState(null)
  useEffect(() => {
    setPrism(window.Prism)
  }, [])

  const [isShowingCode, setShowingCode] = useState(showCodeByDefault ? true : false)

  return (
    <>
      {
        isShowingCode ? (
          <>
            <style jsx>{`
              .no-code-btn {
                background: #fab700;
              }
              @media (prefers-color-scheme: dark) {
                .no-code-btn {
                  background: #5d44f8;
                }
              }
            `}</style>
            <pre className={`${className || ''} code-block overflow-x-scroll`}>
              <code
                className={`language-${lang}`}
                dangerouslySetInnerHTML={{ __html: Prism === null ? '' : Prism.highlight(children.trim(), Prism.languages[lang], lang) }}>
              </code>
            </pre>
            <button
              className="no-code-btn my-2 px-2 py-0 text-sm rounded-sm"
              onClick={() => {
                setShowingCode(false)
              }}>Hide code &#9650;</button>
          </>
        ) : (
            <>
              <style jsx>{`
                .code-btn {
                  background: #fab700;
                }
                @media (prefers-color-scheme: dark) {
                  .code-btn {
                    background: #5d44f8;
                  }
                }
            `}</style>
              <button
                className="code-btn w-full text-center py-2 rounded"
                onClick={() => {
                  setShowingCode(true)
                }}>
                Show Code &#9660;
              </button>
            </>
          )
      }
    </>
  )
}