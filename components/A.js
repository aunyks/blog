import NextLink from 'next/link'

export default function A({
  href,
  className = '',
  style = {},
  children,
  ...props
}) {
  return (
    <NextLink href={href} passHref {...props}>
      <a className={className} style={style} {...props}>
        {children}
      </a>
    </NextLink>
  )
}