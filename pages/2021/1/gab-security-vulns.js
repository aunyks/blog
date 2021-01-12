import Post from 'components/Post'

export default function GabSecurityVulns() {
  return (
    <Post
      title="Gab Security Vulnerabilities"
      description="[PRIVATE] Covering my recently discovered vulns in the Gab web app."
      date="2021-01-11"
      remark={<></>}>
      {/*
Timestamped on Twitter (https://twitter.com/aunyks/status/1348799236809383936)

hash_string('I (@aunyks) have found two low severity and one high severity security vulnerabilities in the gab.com web app.')
=
'c1e7853f3023e1361fc96e322f9b0d16c59a48eaa646f00d928ecd8bf698d11a'
      */}
      <p>
        Curious, huh? I would be, too. Hopefully I'll get the ability to share the
        details of this sometime soon. No promises, though, so we'll see.
      </p>
    </Post>
  )
}