export default function Thought({ id, date, children }) {
  let year = null
  let month = null
  let day = null
  if (date) {
    const d = new Date(date)
    year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
    month = new Intl.DateTimeFormat('en', { month: 'long' }).format(d)
    day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    day = parseInt(day) + 1
  }
  return (
    <div id={id} className="py-2">
      {children}
      <span className="font-bold block text-sm">
        {date ? `${month} ${day}, ${year}` : 'No Date'}
      </span>
    </div>
  )
}
