import Post from 'components/Post'
import Hint from 'components/Hint'

export default function SoYouWannaBeCuttingEdge() {
  return (
    <Post
      title="So You Wanna Be Cutting Edge"
      description="Lots of us want to be aware of the latest science and technology. Here are a few resources to keep us there."
      date="2021-05-20">
      <p>
        Being aware of the latest science and technology that humans are discovering and developing always provides some insight and excitement.
        Aside from news articles, a lot of us who aren't very close to these new developments don't hear about them until they're pretty mature or solid
        in their field. While we can't always be on the bleeding edge without being in those spaces, there are resources we can use to get closer than usual.
        This is a living post, so I'll be adding new resources as I find them.
      </p>
      <p>
        <em>NOTE: At the time of this writing I'm not an academic researcher, so take my rating on the quality of these resources with a small grain of salt.</em>
      </p>
      <h3>Preprints</h3>
      <p>
        Preprints are scholarly articles that haven't yet been peer reviewed. While the lack of peer review may suggest that a paper
        isn't very "high quality", there are lots of amazing preprint papers.
      </p>
      <ul>
        <li>
          <a target="_blank" href="https://arxiv.org">Cornell arXiv</a> (lots of fields, pronounced like "archive")
        </li>
      </ul>
      <h3>Journals & Peer Reviewed Papers</h3>
      <p>
        Academic journals are a great way to find high quality articles. They also very often consist of peer reviewed papers.
      </p>
      <p>
        Lots of journals restrict access to papers behind a paywall or scholarly title. Try emailing the researchers asking for a copy of the paper
        or look for it on <a target="_blank" href="https://www.google.com/search?q=sci-hub">Sci-Hub</a> to read it for free.
      </p>
      <ul>
        <li>
          <a target="_blank" href="https://dl.acm.org/journals">Association for Computing Machinery (ACM) Journals</a> (Computing / Computer Science)
        </li>
      </ul>
      <h3>Watching National Defense Interests</h3>
      <p>
        For millenia, defense and intelligence have driven forward innovation in the public and private sector. Watching what
        the wealthiest and most capable nations focus their interests on can provide hints into people, institutions, and areas of research
        that have great amounts of funding and attention.
      </p>
      <p>
        Looking at journals in these fields or watching the research that program leaders' institutions are putting out may be insightful.
      </p>
      <ul>
        <li>
          <a target="_blank" href="https://darpa.mil">Defense Advanced Research Projects Agency</a> (US Defense R&D Agency)
        </li>
        <li>
          <a target="_blank" href="https://iarpa.gov">Intelligence Advanced Research Projects Activity</a> (US Intelligence R&D Organization)
        </li>
        <li>
          <a target="_blank" href="https://fpi.gov.ru">Russian Foundation for Advanced Research Projects</a> (Russian Defense R&D Organization)
        </li>
      </ul>
      <h3>Patents</h3>
      <p>
        Patents are inventors' and corporations' second best testament to true innovation, right behind trade secrets. Keeping an eye on the latest patents in a field can give you
        a pulse on the latest devices, systems, and processes.
      </p>
      <ul>
        <li>
          <a target="_blank" href="https://patents.google.com">Google Patents</a> (Patents in almost all jurisdictions)
        </li>
        <li>
          <a target="_blank" href="https://patentscope.wipo.int">World Intellectual Property Organization (WIPO) Patentscope</a> (International patents)
        </li>
        <li>
          <a target="_blank" href="https://patents.justia.com">Justia Patents</a> (US Patents)
        </li>
      </ul>
      <h3>Catching Up</h3>
      <p>
        Trying to start from 0 and get to the cutting edge in a field? Of course there's stuff for that!
      </p>
      <ul>
        <li>
          <a target="_blank" href="https://1lib.us">zlibrary</a> (Free E-Book PDFs, consider paying for a copy of a book if you like it to support the author)
        </li>
      </ul>
    </Post>
  )
}