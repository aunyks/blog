import ThoughtsPost from 'components/ThoughtsPost'
import Thought from 'components/Thought'

const Separator = () => <hr className="w-full my-2" />

export default () => (
  <ThoughtsPost
    title="Thoughts On Socialism"
    description="Miscellaneous thoughts on socialism."
    noFooter
  >
    {/*
      <Thought date="2020-07-28">
        Attending university hasn't convinced me to become a socialist, but it's enabled a much better understanding of it and
        sparked more suspicion of the non-neutral, anti-socialist education system I grew up in.
      </Thought>
      <Thought date="2020-07-27">
        Do American universities cause people to shift politically left because they're socialist brainwashing machines or simply because they
        show other perspectives of the world and leave conclusions to the student?
      </Thought>
    */}
    <Thought date="2020-07-26">
      It's pretty interesting to see the rise of leftist thought (particularly among youth) and a desire for socialism in the USA juxtapose
      a growing middle class and therefore more stratification in China.
    </Thought>
    <Thought id="socialist-company" date="2020-07-26">
      <p className="my-1">
        <del>If socialism is when workers own the means of production and capture the value they create,
        then, in the context of a corporation, isn't an employee-owned company <em>by definition</em> socialist? Where
        employees have shares of the company with voting rights and all.</del>
      </p>
      <del>I imagine the employees would be reaping all the benefits of their value creation and would also
        be owning the capital goods.</del> Edit: Thinking too microeconomically.
    </Thought>
  </ThoughtsPost>
)