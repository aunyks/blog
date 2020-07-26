export default function PostFooter({ date, remark }) {
  let year = null
  if (date) {
    const d = new Date(date)
    year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  }
  return (
    <section id="footer">
      <hr className="mt-3" />
      <p>
        {remark || (
          <>
            Thanks for reading. Feel free to follow me on <a href="https://twitter.com/aunyks">Twitter</a> if you have any
          questions about this post or if you just wanna chat.
          </>
        )}
      </p>
      <p>
        Copyright &copy; {date && year} Gerald Nash
        </p>
    </section>
  )
}