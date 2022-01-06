export default function PostFooter({ date, lang, textDirection, remark }) {
  let year = null
  // Calculated at build time, not render / request time
  let thisYear = new Intl.DateTimeFormat(lang || 'en', {
    year: 'numeric'
  }).format(new Date())
  if (date) {
    const d = new Date(date)
    year = new Intl.DateTimeFormat(lang || 'en', { year: 'numeric' }).format(d)
  }
  let yearString = year < thisYear ? `${year}-${thisYear}` : `${thisYear}`
  return (
    <footer
      id="footer"
      lang={lang || 'en'}
      style={{ textDirection: textDirection || 'ltr' }}>
      <hr className="mt-3" />
      <p>
        {remark || (
          <>
            Thanks for reading. Feel free to follow me on{' '}
            <a href="https://twitter.com/intent/follow?screen_name=aunyks">
              Twitter
            </a>{' '}
            if you have any questions about this post or just wanna chat.
          </>
        )}
      </p>
      <p className="select-none">
        Copyright &copy; {date && `${yearString}`} Gerald Nash
      </p>
    </footer>
  )
}
