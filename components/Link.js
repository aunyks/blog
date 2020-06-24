export default function Link({ href, children }) {
  return (
    <p>
      <a className="text-2xl lg:text-3xl no-underline" href={href}>{children}</a>
    </p>
  )
}