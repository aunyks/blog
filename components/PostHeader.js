export default function PostHeader({
  title,
  subtitle,
  date
}) {
  const d = new Date(date)
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
  let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
  day = parseInt(day) + 1

  return (
    <section>
      <h1 className="mt-2 lg:mt-0 leading-tight">{title}</h1>
      {subtitle && (
        <h2 className="leading-none">{subtitle}</h2>
      )}
      <time className="text-xl" dateTime={date}>{`${month} ${day}, ${year}`}</time>
      <hr style={{ marginBottom: '0.75em' }} />
    </section>
  )
}