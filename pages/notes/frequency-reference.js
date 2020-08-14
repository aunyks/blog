import NotesPost from 'components/NotesPost'

export default () => (
  <NotesPost
    title="Radio Frequency Reference"
    subtitle="Frequencies, Ranges and Their Uses"
    description="A quick reference for all kinds of radio frequencies and their uses"
  >
    <h2>FM</h2>
    <h3>145.800 MHz - ISS SSTV Downlink</h3>
    <p>
      The <a href="https://www.nasa.gov/mission_pages/station/main/index.html">International Space Station</a> constantly orbits the Earth and broadcasts pictures using <a href="https://en.wikipedia.org/wiki/Slow-scan_television">Slow Scan Television</a>.
      &nbsp;<a href="https://youtu.be/sG4UhlByFyw?t=39">Here's</a> an example of the eerie sound you hear as the image is received over the radio and rendered.
    </p>
    <h3>162.500 MHz - NOAA Weather Broadcast</h3>
    <p>
      The US <a href="https://www.noaa.gov/">National Oceanic and Atmospheric Administration</a> broadcasts local weather 24/7.
    </p>
    <h3>462 MHz - 467 MHz - Family Radio Service (Walkie-Talkies)</h3>
    <p>
      Consumer walkie-talkies operate on their frequencies. Scanning up and down this range should have you land on some walkie-talkies operating on a couple of channels.
    </p>
    <h2>AM</h2>
    <p>Nothing yet</p>
  </NotesPost>
)