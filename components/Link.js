
export function CardBox({ series, video, postExample }) {
  return (
    <>
      <style>{`
    .card-footer-block {
      display: inline-block;
      fill: white;
      width: 30px;
      height: 30px;
      transition: all 0.7s ease;
      /*transition-delay: 0.25s;*/
    }

    .card-footer-block.series {
      stroke: #fab700;
      stroke-width: 3;
    }

    .card-footer-block.video {
      stroke: #5d44f8;
      stroke-width: 3;
    }

    .card-footer-block.example {
      stroke: #333;
      stroke-width: 3;
    }
    `}</style>
      <svg className={`card-footer-block ${series && 'series'} ${video && 'video'} ${postExample && 'example'}`} viewBox="0 0 10 10" width="10" height="10">
        <rect width="10" height="10" />
      </svg>
    </>
  )
}

export default function Link({
  series,
  video,
  href,
  children
}) {
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
              <CardBox series={series} video={video} />
            </footer>
          </article>
        </a>
      </li>
    </>
  )
}