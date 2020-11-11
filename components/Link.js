export default function Link({ href, children }) {
  return (
    <li className="list-none mt-4 mb-0 leading-none">
      <a className="text-xl lg:text-3xl no-underline" href={href}>{children}</a>
    </li>
  )
}