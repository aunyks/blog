import Post from 'components/Post'
import Hint from 'components/Hint'

export default function LastMinuteDownlink() {
  return (
    <Post
      title="Last Minute Downlink"
      subtitle="Getting a Picture from the ISS"
      description="When I got a picture from the International Space Station"
      date="2020-10-10">
      <p>
        Earlier this week, I was procrastinating from studying for my Chinese midterm looking for
      something to occupy the time. I remembered that the <a href="https://en.wikipedia.org/wiki/International_Space_Station" target="_blank">ISS</a> was flying over me last weekend,
      so I thought I'd try my hand at using the <a href="https://en.wikipedia.org/wiki/Slow-scan_television" target="_blank">SSTV Downlink</a> to get a picture from it. I double-checked the flyover
      time and got my radio.
      </p>
      <p>
        Near flyover time, I went outside and started orienting my radio in random directions to catch the signal
        above. I quickly heard the eerie whirring of the modulated SSTV signal and recorded <Hint msg="A typical image takes about 3 minutes to transmit and receive, so I only got a part of the image.">about a minute's worth of
        audio</Hint> before the flyover ended. Then, I went outside to recover the image.
      </p>
      <div dangerouslySetInnerHTML={{ __html: '<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Tonight I received a picture from the International Space Station up in orbit above us. What you can see and hear is the signal that it beams down via the radio at 145.8MHz. Here’s a thread on how it works (with the image I got) <a href="https://t.co/qXPnpEJ8yN">https://t.co/qXPnpEJ8yN</a> <a href="https://t.co/ZssXHUFwsQ">pic.twitter.com/ZssXHUFwsQ</a></p>&mdash; Nash (刘光瑞） (@aunyks) <a href="https://twitter.com/aunyks/status/1313276464817635328?ref_src=twsrc%5Etfw">October 6, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>' }} />
      <p>
        I used <a href="https://www.blackcatsystems.com/software/sstv.html" target="_blank">Black Cat SSTV</a> on my Mac
        as the decoding software. It was my first time using it, but after some quick web searches I was able to get it working.
      </p>
      <p>
        With a couple of passes through Black Cat, I was finally able to get an image that appeared to have correct spacing and coloring.
      </p>
      <figure className="my-5">
        <img className="w-full" src="/img/tech/first-sstv-pic.jpg"
          alt="The decoded image that I received from the ISS. A satellite and a man wearing a red shirt are visible." />
        <figcaption className="text-xs text-center w-full lg:w-3/4 mx-auto">The image I got from the station. Notice a man and part of a satellite are visible.</figcaption>
      </figure>
      <p>
        That picture came <em>directly</em> from a giant satellite moving at thousands of miles per hour in space. Next time, I'll have more time for the downlink and a higher quality image. If you want more detail on what I did and how it works, follow <a href="https://twitter.com/aunyks/status/1313276464817635328" target="_blank">this thread</a>.
      If you have a radio and want to discover interesting stuff that you can receive or transmit, check out my <a href="/notes/frequency-reference">radio frequency reference</a>.
    </p>
    </Post>
  )
}
