import {
  useEffect,
  useState
} from 'react'

export default function CodeBlock({ className, lang, children }) {
  const [Prism, setPrism] = useState(null)
  useEffect(() => {
    setPrism(window.Prism)
  }, [])

  const [isShowingCode, setShowingCode] = useState(false)

  return (
    <>
      {
        isShowingCode ? (
          <pre className={`${className || ''} code-block overflow-x-scroll`}>
            <code
              className={`language-${lang}`}
              dangerouslySetInnerHTML={{ __html: Prism === null ? '' : Prism.highlight(children.trim(), Prism.languages[lang], lang) }}>
            </code>
          </pre>
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
                Show Code
              </button>
            </>
          )
      }
    </>
  )
}