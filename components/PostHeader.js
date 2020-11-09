export default function PostHeader({
  title,
  subtitle,
  date
}) {
  let month = null
  let year = null
  let day = null
  if (date) {
    const d = new Date(date)
    year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
    day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    day = parseInt(day) + 1
  }

  return (
    <header>
      <h1 className="mt-2 lg:mt-0 leading-tight">{title}</h1>
      {subtitle && (
        <h2 className="leading-none">{subtitle}</h2>
      )}
      {date && <time className="text-lg" dateTime={date}>{`${month} ${day}, ${year}`}</time>}
      <hr style={{ marginBottom: '0.75em' }} />
    </header>
  )
}