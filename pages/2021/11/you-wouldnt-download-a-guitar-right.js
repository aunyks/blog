import Post from 'components/Post'
import Hint from 'components/Hint'
import A from 'components/A'

export default function DownloadAGuitar() {
  return (
    <Post
      title="You Wouldn't Download a Guitar, Right?"
      description="The Four Quadrants"
      date="2021-11-16"
      remark={
        <>
          Thanks for reading. Email me or DM me on{' '}
          <a href="https://twitter.com/intent/follow?screen_name=aunyks">
            Twitter
          </a>{' '}
          if you have any questions or want the files for this project.
        </>
      }
      cardImage="https://blog.aunyks.com/img/tech/3d-printed-guitar-flat-render-indigo.jpg">
      <p>
        As you may know, I got a{' '}
        <Hint
          id="printer-type-modal"
          msg={
            <>
              I got a{' '}
              <a
                target="_blank"
                href="https://www.creality3dofficial.com/products/ender-3-v2-3d-printer">
                Creality Ender 3 V2
              </a>
              .
            </>
          }>
          3D printer
        </Hint>{' '}
        back in March. Since then, I've printed all kinds of small and medium
        sized items, like{' '}
        <A href="/2021/4/making-a-dual-ps5-controller-stand">
          a controller stand for my PlayStation
        </A>
        . Now that I have some experience with the printer after hours of
        calibrating and troubleshooting, it's time for me to move onto larger,
        more challenging prints. I figured making an instrument would be a cool
        project, and I later discovered{' '}
        <a target="_blank" href="https://www.thingiverse.com/solstie/designs">
          Solstie's
        </a>{' '}
        <a href="https://www.thingiverse.com/thing:486731" target="_blank">
          acoustic guitar design
        </a>
        . Let's see how it turned out.
      </p>
      <h2 id="design">Design</h2>
      <figure className="my-3">
        <img
          className="w-full"
          src="/img/tech/3d-printed-guitar-render.jpg"
          alt="A render of the expected guitar after making some of my design tweaks."
        />
      </figure>
      <p>
        Solstie already did most of the heavy lifting with this design: each
        part is designed to print without supports and with great tolerances for
        parts integrating with{' '}
        <Hint msg="The strings and tuning machines.">
          other, non-printed parts
        </Hint>
        . I noticed in the Thingiverse comments that people were mentioning
        small but noticeable issues with the design, like warping of the neck
        and head after prolonged use, though.
      </p>
      <p>
        I set out to fix this before printing specifically by filling the cavity
        in the neck to make it more rigid. As you probably expected, I also
        added my signature bolt to the design.
      </p>
      <h2 id="printing">Printing</h2>
      <figure className="my-3">
        <video controls className="w-full mb-2">
          <source
            src="/img/tech/3d-printed-guitar-lower-printing.mp4"
            type="video/mp4"
          />
          A video of the printer printing the lower body part of the guitar
          should be here, but it seems your browser doesn't support embedded
          videos.
        </video>
      </figure>
      <p>
        Even though the guitar is smaller than most acoustic guitars, it's still
        much too big for my machine to print all at once. The body is split into
        three parts, the neck into two, and the head remaining one part. Most
        pieces printed between 12 and 18 hours, with the neck parts and head
        taking more than 26 hours to print all at once. Slicing and printing
        were generally straight forward up until some issues.
      </p>
      <h2 id="failures-n-mishaps">Failures & Mishaps</h2>
      <figure className="my-3">
        <img
          className="w-full"
          src="/img/tech/3d-printed-guitar-initial-print.jpg"
          alt="A photo of the originally printed guitar, with some of the flaws visible."
        />
      </figure>
      <p>
        Most of the parts printed well despite small failures in the first few
        layers of some, but those were the least of my worries. I underestimated
        the amount of plastic each part needed, so I woke up one morning to an
        empty spool of filament and a half-printed part. There was also a time
        when a corner of the soundhole part for the middle of the body lifted
        off of the print bed, ultimately ruining the entire print of the body
        since it prevented good assembly.
      </p>
      <p>
        These two issues, in addition to questionable print quality in some
        parts, led me to reprint the entire body, this time with a{' '}
        <a
          href="https://www.amazon.com/OVERTURE-Filament-Clog-Free-Consumables-Dimensional/dp/B087QBDWV5?th=1"
          target="_blank">
          silky gray filament
        </a>{' '}
        that I wanted to try out. That filament ended up printing in much higher
        quality than the original parts printed in black. It also worked out
        because the body could be gray and the neck and head could be black,
        giving it a pretty good two-tone look.
      </p>
      <h2 id="assembly">Assembly</h2>
      <p>
        Putting the pieces together was very straightforward. All the printed
        pieces were{' '}
        <Hint
          id="superglue-modal"
          msg={
            <>
              I used Gorilla Glue with{' '}
              <a
                target="_blank"
                href="https://www.homedepot.com/p/Gorilla-12-g-Super-Glue-Brush-and-Nozzle-7501201/303508684">
                the brush and nozzle applicators
              </a>
              .
            </>
          }>
          superglued
        </Hint>{' '}
        together, and inserting the strings and tuning machines was as easy as
        assembling any other guitar.
      </p>
      <h2 id="how-does-it-sound">How Does It Sound?</h2>
      <p>
        It has trouble staying tuned, but when it <em>is</em> tuned it sounds
        pretty good. It's pretty quiet since it's small and made of plastic, but
        it gets the job done! See for yourself.
      </p>
      <figure className="my-3">
        <video controls className="w-full mb-2">
          <source
            src="/img/tech/3d-printed-guitar-playing.mp4"
            type="video/mp4"
          />
          A video of me playing a short lick on the guitar should be here, but
          it seems your browser doesn't support embedded videos.
        </video>
      </figure>
      <h2 id="conclusion">Conclusion</h2>
      <figure className="my-3">
        <img
          className="w-full"
          src="/img/tech/3d-printed-guitar-finished.jpg"
          alt="A photo of the finished guitar, resembling the initial render and differing mostly in color."
        />
      </figure>
      <p>
        This was a multi-week effort, largely because I started working full
        time this year, but I'm very satisfied with the result. The guitar is
        high quality for some $30 worth of plastic. Now I have an apetite for
        more challenging projects.
      </p>
      <p>Here's to the spirit of making.</p>
    </Post>
  )
}
