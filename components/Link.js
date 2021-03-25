
function CardBox() {
  return (
    <svg className="card-footer-block" viewBox="0 0 10 10" width="10" height="10">
      <rect width="10" height="10" />
    </svg>
  )
}

export default function Link({ href, children }) {
  return (
    <>
      <li className="link-item list-none mt-4 mb-0 leading-none">
        <a className="no-underline" href={href}>
          <article className="relative link-article pt-5 pb-3 px-3 text-xl lg:text-3xl h-full">
            <header className="relative top-0">
              <h1 className="card-title font-normal text-lg">
                {children}
              </h1>
            </header>
            <footer className="card-footer absolute">
              <CardBox />
            </footer>
          </article>
        </a>
      </li>
    </>
  )
}