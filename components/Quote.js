export default function Quote({ author, children }) {
  return (
    <blockquote className="my-2 lg:my-5 inline-block">
      <span className="text-lg lg:text-3xl font-serif bold leading-tight inline" style={{ color: 'white', background: '#5d44f8' }}>
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
  )
}