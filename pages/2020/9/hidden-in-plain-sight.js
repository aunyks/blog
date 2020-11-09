import Post from 'components/Post'
import Hint from 'components/Hint'

export default function HiddenInPlainSight() {
  return (
    <Post
      title="Hidden in Plain Sight"
      subtitle="Adding Secret Posts to the Blog"
      description="And a little bit on how they work!"
      date="2020-09-08"
      cardImage="https://blog.aunyks.com/img/misc/hips.png">
      <p>
        From now on some of my posts will be encrypted! These "secret posts" give me the opportunity to help manage the privacy of some of my posts. With secret posts, I can not only
        use this blog as a personal "diary" that gets immortalized on the Internet but also keep track of exactly who gets to see each post, in case I only want certain family or friends to read a post.
      </p>
      <h2>Try it for yourself!</h2>
      <p>
        If you want to see an example of a secret post and try the workflow for decrypting one, check out my first <a href="/2020/9/test-secret-post">test secret post</a>. Just follow the instructions on each page to see the
        original message. The password for that post is <em className="font-bold">password</em>.
      </p>
      <h2>How it works</h2>
      <p>
        For <Hint msg="version 1">this version</Hint> of secret posts, the plaintext is encrypted using the <a href="https://en.wikipedia.org/wiki/Advanced_Encryption_Standard">AES</a> symmetric key algorithm with
        the <a href="https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Cipher_block_chaining_(CBC)">CBC</a> mode of operation and a 256 bit key size. The encryption key is derived from a password using <a href="https://en.wikipedia.org/wiki/PBKDF2">PBKDF2</a>.
        At the moment, all of this is done in <Hint msg={'Check out the test secret post above and click "here" to see the exact command being used.'}>an OpenSSL command</Hint>.
      </p>
      <h2>Limitations and future improvements</h2>
      <p>
        Using an OpenSSL command that has to be run in a terminal isn't really the best experience to have for a web-native blog like this. Using Repl.it as a sort of terminal in the web is a decent solution for this, but ideally a secret post would prompt you for a password and decrypt the ciphertext
        without your needing to leave the page. That's top of mind when I think of secret posts, but I'm not sure that I feel like putting in the engineering time to do that just yet.
        </p>
      <p>
        Another marginal improvement is to use the <a href="https://en.wikipedia.org/wiki/Galois/Counter_Mode">GCM</a> mode of operation instead of CBC, but, again, the development time
        needed to make such a change functional doesn't meet the security payoff at this point in time, so it'll have to wait.
      </p>
      <h2>To wrap up</h2>
      <p>
        I think more personal blogs should add secret posts. As a feature, they're not useful at first glance, but you can get really creative with them. Honestly, I expect influencers and creators to use private and "walled garden" style features as a whole much more often to help
        enrich the experiences that they provide their communities. But, that's a topic for another post. Thanks for your time!
      </p>
    </Post>
  )
}