import NotesPost from 'components/NotesPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Hint from 'components/Hint'

export default function ElectronicsNotes() {
  return (
    <NotesPost
      title="Electronics"
      description=""
    >
      <style jsx>{`
      p {
        margin-bottom: 0.5em;
      }
      ul {
        margin: 0em 0 1em 0;
      }
        li {
          list-style-type: disc;
          margin-left: 1rem;
        }
      `}</style>
      <h2>Using a Multimeter</h2>
      <p>
        To measure voltage passing through a load, connect the leads in parallel to the load.
        To measure the voltage coming from the power source, connect the leads to their respective sides of the power source (+ to +, - to -).
      </p>
      <ul>
        <li>
          <a href="https://www.youtube.com/watch?v=GZX3MyBkMvA" target="_blank">How to Use a Multimeter: Measuring Voltage</a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=q4SowtyJsDE" target="_blank">Measuring Voltage in a Series Circuit</a>
        </li>
      </ul>
      <p>
        To measure current going to a load, connect the leads in series with the load.
        To measure current coming from the power source, connect the leads in series next to the source.
      </p>
      <ul>
        <li>
          <a href="https://www.youtube.com/watch?v=7lwZkl0yBqA" target="_blank">How to Use a Multimeter: Measuring Current</a>
        </li>
      </ul>
    </NotesPost>
  )
}