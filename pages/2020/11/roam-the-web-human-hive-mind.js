import Post from 'components/Post'
import Hint from 'components/Hint'

export default function RoamResearchWebHumanHiveMind() {
  return (
    <Post
      title="Roam Research, The Web, and The Human Hive Mind"
      description="How a note-taking app and the worldwide web may echo the human state of mind."
      date="2020-11-11">
      <p>
        Roam Research's allure as a note-taking app comes from the ability to
        link notes together as a two-way link. This lets notetakers more closely
        model the human mind and encourage creativity and knowledge-based
        insight.
      </p>
      <p>
        This reminds me of an early idea for the web, where{' '}
        <a target="_blank" href="https://www.w3.org/DesignIssues/Topology.html">
          some hyperlinks were meant to be two-way
        </a>
        . Although that didn't reach fruition, it makes me wonder whether the
        one-way links achieve similar results.
      </p>
      <p>
        That is, through the exabytes of knowledge on the web and billions of
        links between thoughts, ideas, and other content, has the web developed
        to become a knowledge graph of magnificent scale? A grand hive mind that
        captures the state of human consciousness? And by corollary, is
        creating, editing, deleting, or consuming web content participating in
        the largest{' '}
        <a href="https://en.wikipedia.org/wiki/Zettelkasten" target="_blank">
          Zettelkasten
        </a>{' '}
        system in history?
      </p>
      <p>
        My take is <em>yes</em>, to all of it.
      </p>
      <h3>Update</h3>
      <p>
        As of early 2021, I've been using simple HTML pages to take my notes and
        help with my personal knowledge management. With HTML being a document
        format, the web having built in linking, and web browsers being
        incredibly powerful scripting and formatting engines, this workflow has
        been incredibly robust and flexible. I'll probably continue with it
        until I run into any debilitating issues. It's also pretty cool that the
        workflow uses an open standard, so I don't have to worry about some
        company going out of business and ruining it.
      </p>
    </Post>
  )
}
