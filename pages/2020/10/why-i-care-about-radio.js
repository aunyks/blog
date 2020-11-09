import Post from 'components/Post'
import Hint from 'components/Hint'

export default function WhyICareAboutRadio() {
  return (
    <Post
      title="Why I Care About Radio"
      description="Why I care about a seemingly old, boring technology."
      date="2020-10-20">
      <p>
        Another thing I do is study radio technologies. I sometimes laugh at myself when I think "I'm really working with a radio in 2020". Being 21, thinking about radios
        and stuff makes me sound like I'm just interested in antique technologies, but that's not quite the case.
      </p>
      <p>
        I'm interested in radio tech because of the resurgence it's undergoing with respect to modern technological innovation.
      I care about radio for four interrelated reasons: <em>security</em>, <em>space</em>, <em>grid-down</em>, and <em>the technical challenge</em>.
    </p>
      <h3>Security</h3>
      <p>
        Virtually everything we use that's wireless is so, because it's using radio waves to communicate without wires. Our cars, remotes,
        keyboards, traffic lights, home devices, drones, and so much more are all using radio to provide us experiences. With such a large footprint comes a large attack surface
      with respect to information security, which makes it appealing to hack some of these systems. <Hint msg="While respecting FCC laws...">There's a lot of security research to be done</Hint> where we can take apart and tinker with
      these wireless protocols in order to cause unintended effects and expose real, impactful security risks.
    </p>
      <strong>For Example</strong>
      <p>
        <a target="_blank" href="https://www.gearbrain.com/logitech-wireless-keyboard-mouse-hack-2639194989.html">A vulnerability in Logitech keyboards and mice that let attackers steal keystrokes or remotely control a machine</a>.
    </p>
      <p>
        <a target="_blank" href="https://www.usenix.org/system/files/conference/woot14/woot14-ghena.pdf">Researchers use radio hardware to control traffic lights</a>.
    </p>
      <h3>Space</h3>
      <p>
        The global superpowers are entering a new space race, and private businesses are beginning to inhabit space for various reasons. All of these machines, rockets, and satellites
      need to communicate with stations on the ground. And, just as you may be thinking, they use <Hint msg="Many also operate on microwave frequencies, but plenty of radios can operate there too.">radio waves</Hint> to
      get all of that done. Since all of those communications literally take place over the air, anyone with a radio is in a unique position to study and sometimes tinker with not only the signals they intercept
      but also with the space machines themselves <Hint msg="While respecting FCC laws, of course.">by transmitting signals back up to them</Hint>.
    </p>
      <strong>For Example</strong>
      <p>
        <a target="_blank" href="https://www.whitehouse.gov/wp-content/uploads/2020/10/National-Strategy-for-CET.pdf">The White House's National Strategy for Critical Emerging Technologies mentions "Space Technologies" and "Communication and Networking Technologies" as critical and emerging</a>.
    </p>
      <p>
        <a target="_blank" href="https://www.starlink.com/">SpaceX's Starlink satellite cluster intends to provide Internet access from Low Earth Orbit</a>.
    </p>
      <h3>Grid-Down Situations</h3>
      <p>
        In situations where the electrical grid or Internet infrastructure is down, radios are often the next mode of communication. Thinking about different methods <Hint msg="I often think about how we can transmit digital information in these scenarios.">of transmitting and receiving information in
      varying conditions</Hint> is very unique to every possible scenario and could potentially save lives.
    </p>
      <p>
        Radios can not only be used to communicate from the ground directly to other ground stations but also across extremely long distances using satellites.
    </p>
      <strong>For Example</strong>
      <p>
        <a target="_blank" href="https://youtu.be/7p-BAeWf0U0?t=213">Amateur radio operators communicate over extreme distances using a satellite orbiting near all of them</a>.
    </p>
      <p>
        Amateur radio operators were important for communication immediately following Hurricanes Katrina and Maria.
    </p>
      <h3>New Technical Challenges</h3>
      <p>
        I spend the vast majority of my time working with digital technology in the virtual space, where most of my engineering challenges are those of a computer scientist. Working with radios gives me a
        good reason to mix my software challenges with those of the electromagnetic spectrum and of an electrical engineer. New technical challenges are intellectually refreshing and offer a sea of new things to learn
        and apply.
    </p>
    </Post>
  )
}