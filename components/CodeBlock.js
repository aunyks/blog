import {
  useEffect,
  useState
} from 'react'

export default function CodeBlock({ className, lang, children }) {
  const [Prism, setPrism] = useState(null)
  useEffect(() => {
    setPrism(window.Prism)
  }, [])

  return (
    <pre className={`${className || ''} code-block overflow-x-scroll`}>
      <code
        className={`language-${lang}`}
        dangerouslySetInnerHTML={{ __html: Prism === null ? '' : Prism.highlight(children, Prism.languages[lang], lang) }}>
      </code>
    </pre>
  )
}