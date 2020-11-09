import Post from 'components/Post'
import SecretPost from 'components/SecretPost'

export default function TestSecretPost() {
  return (
    <SecretPost
      version="1"
      title="A Test Secret Post"
      subtitle="Try Decrypting It!"
      date="2020-09-08">
      U2FsdGVkX19Pp2vQ1ARuT1Yb8W590f/J8ypR8oRznSG2ClwARYO4+6DfCP5LdIIr
      nrUR+ZPek7gUtE63Pgym0vQdxaP4gNNXhTbDFTK7RnU=
    </SecretPost>
  )
}