import katex from 'katex'

export default function Math({ tex, isFigure }) {
  const renderedLatex = katex.renderToString(tex, {
    displayMode: !!isFigure,
  })
  return (
    <span dangerouslySetInnerHTML={{
      __html: renderedLatex
    }} />
  )
}