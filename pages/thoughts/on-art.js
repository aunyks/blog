import ThoughtsPost from 'components/ThoughtsPost'
import Thought from 'components/Thought'

const Separator = () => <hr className="w-full my-2" />

export default function ThoughtsOnArt() {
  return (
    <ThoughtsPost
      title="Thoughts On Art"
      description="Miscellaneous thoughts on art."
      noFooter>
      <Thought date="2021-03-24">
        I've been severely underestimating the importance of reference in the
        creative process. Maybe knowing this now means I'm approaching my next
        level as an artist.
      </Thought>
      <Thought date="2020-08-30">
        Higher fidelity media for entertainment provide better detail at the
        expense of abstraction. It sounds obvious, but in many cases it has an
        impact on the quality of storytelling, especially when creators use this
        fact to their advantage.
      </Thought>
      <Thought date="2020-08-16">
        You don't need to be "creative" to create art.
      </Thought>
      <Thought date="2020-07-28">
        All business interests have negative impacts on pure creative
        expression.
      </Thought>
      <Thought date="2020-07-28">
        Horror film's idea of leaving the true horror up to the viewer is an
        excellent application of creative abstraction. The mind will naturally
        apply detail in the most terrifying ways imaginable.
      </Thought>
      <Thought date="2020-07-28">
        Artistic abstraction doesn't eliminate detail from the work. It moves
        the detail from the work itself into the mind of the viewer. You could
        even say it shifts the responsibility of applying detail from the artist
        to the viewer.
      </Thought>
      <Thought date="2020-07-28">
        Many artists are system designers. Rather than making a piece just to
        express themselves and leaving it at that, they envision how their work
        influences the viewer and how it can invoke thought or feelings about a
        subject or concept in the viewer. The artists, artwork, viewer(s), and
        subject(s) are all components in the system.
      </Thought>
    </ThoughtsPost>
  )
}
