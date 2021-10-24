import SecretPostv1 from 'components/SecretPostv1'

export default function SecretPost({
  version,
  ...restOfProps
}) {
  switch (version) {
    case '1':
      return <SecretPostv1 {...restOfProps} />
    default:
      return null
      break
  }
}