import NotesPost from 'components/NotesPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Hint from 'components/Hint'

export default function ElectronicsNotes() {
  return (
    <NotesPost title="Electronics" description="">
      <style jsx>{`
        p {
          margin-bottom: 0.5em;
        }
      `}</style>
      <h2>Using a Multimeter</h2>
      <p>
        To measure voltage passing through a load, connect the leads in parallel
        to the load. To measure the voltage coming from the power source,
        connect the leads to their respective sides of the power source (+ to +,
        - to -).
      </p>
      <ul>
        <li>
          <a href="https://www.youtube.com/watch?v=GZX3MyBkMvA" target="_blank">
            How to Use a Multimeter: Measuring Voltage
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=q4SowtyJsDE" target="_blank">
            Measuring Voltage in a Series Circuit
          </a>
        </li>
      </ul>
      <p>
        To measure current going to a load, connect the leads in series with the
        load. To measure current coming from the power source, connect the leads
        in series next to the source.
      </p>
      <ul>
        <li>
          <a href="https://www.youtube.com/watch?v=7lwZkl0yBqA" target="_blank">
            How to Use a Multimeter: Measuring Current
          </a>
        </li>
      </ul>
      <h2>Soldering</h2>
      <h3>Preparing the Iron</h3>
      <p>
        When you get a new iron or put on a new tip, you need to tin the iron.
        To tin it, you need some soldering flux, solder, and a damp sponge.
      </p>
      <ol>
        <li>
          With the iron OFF, apply a thin coat of flux to the tip of the iron.
        </li>
        <li>Coil some solder around the tip of the iron.</li>
        <li>Turn on the iron and let it heat up.</li>
        <li>Wait for the flux to burn and solder to melt off.</li>
        <li>
          Continue rotating the iron while applying solder to any needed areas.
        </li>
        <li>Wipe excess solder off of the iron using the sponge.</li>
        <li>Turn off the iron and let it cool down.</li>
      </ol>
    </NotesPost>
  )
}
