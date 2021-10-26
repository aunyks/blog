export default function PostBody({ wide, lang, textDirection, children }) {
  return (
    <>
      <style jsx>{`
        @media print {
          article {
            padding-top: 0;
          }
        }
      `}</style>
      <main
        lang={lang || 'en'}
        style={{ textDirection: textDirection || 'ltr' }}
        className={`post-body mx-auto px-3 lg:px-0 w-full ${
          !!wide ? 'lg:px-24' : 'lg:w-1/2'
        } pt-16 lg:pt-16`}>
        {children}
      </main>
    </>
  )
}
