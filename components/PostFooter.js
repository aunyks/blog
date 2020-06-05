export default function PostFooter({ date, remark }) {
  const d = new Date(date)
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
  return (
    <section id="footer">
      <hr />
      <p>
        {remark || (
          <>
            Thanks for reading. Feel free to follow me on <a href="https://twitter.com/aunyks">Twitter</a> if you have any
          questions about this post.
          </>
        )}
      </p>
      <p>
        Copyright &copy; {year} Gerald Nash
        </p>
    </section>
  )
}