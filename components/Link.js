export default function Link({ href, children }) {
  return (
    <p>
      <a className="text-xl lg:text-3xl no-underline" href={href}>{children}</a>
    </p>
  )
}