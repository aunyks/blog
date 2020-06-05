export default function Link({ href, children }) {
  return (
    <p>
      <a className="text-xl no-underline" href={href}>{children}</a>
    </p>
  )
}