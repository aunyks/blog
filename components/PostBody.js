export default function PostBody({
  wide,
  children
}) {
  return (
    <article className={`mx-auto px-3 lg:px-0 w-full ${!!wide ? 'lg:px-24' : 'lg:w-1/2'} pt-16 lg:pt-16`}>
      {children}
    </article>
  )
}