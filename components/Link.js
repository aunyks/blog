export default function Link({ href, children }) {
  return (
    <li className="list-none mt-2 mb-0 lg:my-0">
      <a className="text-xl lg:text-3xl no-underline" href={href}>{children}</a>
    </li>
  )
}