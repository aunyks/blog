import Post from 'components/Post'
import Hint from 'components/Hint'

export default function BuildModernDSPSystem() {
  return (
    <Post
      title="Building a Modern DSP System"
      description="On the new digital signal processing I'm building"
      date="2020-11-18">
      <p>
        As I <a href="/2020/11/learning-rf-signal-processing">learn about digital signal processing</a>, I'm motivated to use the knowledge
        for <a href="/2020/10/why-i-care-about-radio">some interesting applications</a>. To do this, I often need to find software that does what I
        need. The problem, though, is that a lot of the software I've found either has a very limited feature set,
        is deprecated, or simply doesn't reliably build or run on <Hint msg="I use a Macbook.">my machine</Hint>. That's
        not to mention that the vast majority of signal processing software is written in C and C++, which makes them harder
        to read and modify <em>than I'd like</em>.
        </p>
      <p>
        <a href="https://www.gnuradio.org">GNURadio</a>, for example, doesn't reliably function on my machine, and its core is written in C, so it becomes
        difficult for me to modify some of the code to run better for me. <a href="https://github.com/wb2osz/direwolf">Direwolf</a> and other smaller projects either have obscure documentation
        or don't have features I'd like for some projects.
      </p>
      <p>
        With this being said, I'm making a new <Hint msg="Digital Signal Processing">DSP</Hint> system. This system will be written in <a href="https://www.w3schools.com/Js/">JavaScript</a> for
        the <a href="https://nodejs.org/en/">Node.js</a> runtime. This way I can take advantage of Node's <a href="https://nodejs.dev/learn/nodejs-streams">Stream APIs</a> to build reasonably intuitive signal processing
        pipelines.
      </p>
      <h3>Why JavaScript?</h3>
      <p>
        I wanted to use a popular interpreted language like Python or JavaScript, but Node's Stream API provides a good model for these pipelines that Python doesn't have.
      </p>
      <h3>What about performance?</h3>
      <p>
        Effective signal processing often requires low latency systems, and for this reason compiled languages like C, C++, and Rust are favorable.
        Knowing this, I can plug in <a href="https://webassembly.org/">WASM</a> code in performance bottlenecks to reduce latency in some processing blocks. This is another reason why I've
        chosen JavaScript as the language of choice: it has one of the most mature WASM-interfacing APIs.
      </p>
      <h2>Build Log</h2>
      <ol>
        <li><a href="/2020/11/sigproc-build-log-1">First Blocks</a></li>
      </ol>
    </Post>
  )
}