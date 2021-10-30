import Post from 'components/Post'
import Hint from 'components/Hint'

function Matrix({ role = 'img', ariaLabel, className, children }) {
  return (
    <>
      <style jsx>{`
        .bg-rect {
          fill: var(--yellow);
        }

        .border-rect,
        line {
          stroke: var(--black);
        }

        @media (prefers-color-scheme: dark) {
          .bg-rect {
            fill: var(--indigo);
          }

          .border-rect,
          line {
            stroke: var(--white);
          }
        }
      `}</style>
      <svg
        role={role}
        aria-label={ariaLabel}
        className={className}
        viewBox="0 0 1920 1080"
        xmlns="http://www.w3.org/2000/svg">
        <rect className="bg-rect" x="0" y="0" width="1920" height="1080" />
        <line x1="960" x2="960" y2="1920" stroke="white" strokeWidth="10" />
        <line y1="540" x2="1920" y2="540" stroke="white" strokeWidth="10" />
        {children}
        <rect
          className="border-rect"
          x="5"
          y="5"
          width="1910"
          height="1070"
          fill="none"
          strokeWidth="10"
        />
      </svg>
    </>
  )
}

export default function ClassifyingInnovation() {
  return (
    <Post
      title="Classifying Innovation"
      description="The Four Quadrants"
      date="2021-10-23">
      <style jsx>{`
        text {
          fill: var(--black);
          font-size: 96px;
        }

        @media (prefers-color-scheme: dark) {
          text {
            fill: var(--white);
          }
        }
      `}</style>
      <p>
        I was reading someone's blog when I came across the term{' '}
        <a href="https://en.wikipedia.org/wiki/Pasteur%27s_quadrant">
          "Pasteur's Quadrant"
        </a>
        . When looking up what it is, I found that Donald Stokes, who coined the
        term in{' '}
        <Hint
          id="book-modal"
          title="Disclaimer"
          linkLabel="Disclaimer"
          msg={
            <>
              I haven't yet read{' '}
              <a
                target="_blank"
                href="https://www.amazon.com/Pasteurs-Quadrant-Science-Technological-Innovation/dp/0815781776">
                the book
              </a>
              , so please excuse me if I'm repeating what he said!
            </>
          }>
          his book of the same name
        </Hint>
        , used it in the context of classifying different types of research
        based on their motives and discoveries.
      </p>
      <h2>The Quadrants</h2>
      <p>
        Stokes devised a matrix with four quadrants. Three of the quadrants were
        assigned to different types of scientific research: purely basic
        research, which seeks fundamental understanding; purely applied
        research, which seeks to solve immediate problems; and basic applied
        research, which balances the two by both solving immediate problems and
        increasing fundamental understanding.
      </p>
      <figure className="my-5">
        <Matrix>
          <text x="360" y="300">
            Bohr
          </text>
          <text x="1300" y="300">
            Pasteur
          </text>
          <text x="1300" y="830">
            Edison
          </text>
          <text x="160" y="830">
            N/A (Tinkering)
          </text>
        </Matrix>
        <figcaption className="text-sm mt-2">
          The rows get more basic as they go up and more applied as they go to
          the right.
        </figcaption>
      </figure>
      <p>
        Stokes named each quadrant after individuals in recent history that best
        represent the type of research. Niels Bohr, known for his advancements
        in physics, performed research that significantly increased our
        understanding of the atoms among other concepts. His research increased
        our fundamental understanding of matter and its interactions, but the
        knowledge didn't have much application outside of academia for years.
      </p>
      <p>
        Louis Pasteur, known for his advancements in microbiology, performed
        research that significantly increased our understanding of bacteria and
        other microorganisms. His research not only increased our fundamental
        understanding of microorganisms, it also gave way to the creation of
        vaccination and <em>pasteur</em>ization, which had immediate
        applications.
      </p>
      <p>
        Thomas Edison, known for his many inventions, performed research that
        lead to the creation of the record player and motion camera, among many
        others. His research led to products that were almost immediately
        commercialized, but many of his creations didn't advance our fundamental
        understanding of a field.
      </p>
      <p>
        The matrix is a pretty simple framework in which all forms of innovation
        can be classified. My only update would be to "blur" the lines dividing
        each quadrant, as not all types of innovation are as cut-and-dry as the
        examples above. There are instances, like many of Nikola Tesla's
        studies, where the motive for research was exclusively applied, but
        fundamental insights of the world were discovered. The inverse also
        holds true: there are instances where the motives of research were
        exclusively basic, but a solution to an immediate problem was found as a
        result.
      </p>
      <h2>Using Literature</h2>
      <p>
        An interesting result of Stokes' matrix is that you can also classify
        the types of innovation by the types of formal documents they can
        produce. Basic research often produces peer reviewed research papers,
        and applied research produces often produces patents. Of course, this
        means that basic applied research can produce both research papers{' '}
        <em>and</em> patents.
      </p>
      <p>
        For example, Bohr published{' '}
        <a target="_blank" href="https://philpapers.org/s/Niels%20Bohr">
          several papers
        </a>{' '}
        but{' '}
        <a
          target="_blank"
          href="https://patents.google.com/?inventor=Niels+Bohr&oq=inventor:(Niels+Bohr)">
          no patents
        </a>
        . Louis Pasteur published{' '}
        <a
          target="_blank"
          href="https://scholar.google.com/scholar?hl=en&as_ylo=1800&as_yhi=1960&q=author%3A%28Louis+Pasteur%29">
          several papers
        </a>{' '}
        <em>and</em>{' '}
        <a
          target="_blank"
          href="https://patents.google.com/?inventor=Louis+Pasteur&before=priority:19700101">
          several patents
        </a>
        . Edison published{' '}
        <a
          target="_blank"
          href="https://patents.google.com/?inventor=Thomas+Edison&before=priority:19700101&oq=inventor:(Thomas+Edison)+before:priority:19700101">
          numerous patents
        </a>{' '}
        but no research papers.
      </p>
      <h2>You and I</h2>
      <p>
        If I were to put myself on the matrix, I'd say I'm in the bottom left
        quadrant right now, where I'm tinkering and it's not clear that I'm
        making or discovering anything new. But, I think I'm slowly moving into
        Edison's quadrant with some projects that I'm working on right now. Only
        time will tell, though!
      </p>
      <p>Where do you lie on the matrix?</p>
    </Post>
  )
}
