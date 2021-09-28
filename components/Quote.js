export default function Quote({ author, children }) {
  return (
    <>
      <style jsx>{`
    .quote-text {
      color: var(--white);
      background: var(--indigo);
    }
    `}</style>
      <blockquote className="my-2 lg:my-5 inline-block">
        <span className="quote-text text-lg lg:text-3xl font-serif bold leading-tight inline">
          "{children}"
        </span>
        {!!author && (
          <>
            <br />
            <span className="text-md lg:text-2xl font-serif">
              &mdash; {author}
            </span>
          </>
        )}
      </blockquote>
    </>
  )
}