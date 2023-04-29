import cx from 'classnames'

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
        className={cx(
          'post-body',
          'mx-auto',
          'px-3',
          'lg:px-0',
          'w-full',
          'pt-16',
          'lg:pt-16',
          {
            'lg:px-24': !!wide,
            'lg:w-1/2': !wide
          }
        )}>
        {children}
      </main>
    </>
  )
}
