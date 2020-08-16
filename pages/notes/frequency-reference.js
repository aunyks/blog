import NotesPost from 'components/NotesPost'

export default () => (
  <NotesPost
    title="Radio Frequency Reference"
    subtitle="Frequencies, Ranges and Their Uses"
    description="A quick reference for all kinds of radio frequencies and their uses"
  >
    <h2>FM</h2>
    <h3>26.965 MHz - 27.405 MHz - CB Radio</h3>
    <p>
      Citizens Band Radio is a radio service that used to be very popular. Transmissions often travel for tens of miles.
    </p>
    <p>
      <a target="_blank" href="https://www.fcc.gov/wireless/bureau-divisions/mobility-division/citizens-band-radio-service-cbrs">Frequencies ("Data" tab)</a>
    </p>
    <h3>145.800 MHz - ISS SSTV Downlink</h3>
    <p>
      The <a href="https://www.nasa.gov/mission_pages/station/main/index.html">International Space Station</a> constantly orbits the Earth and broadcasts pictures using <a href="https://en.wikipedia.org/wiki/Slow-scan_television">Slow Scan Television</a>.
      &nbsp;<a href="https://youtu.be/sG4UhlByFyw?t=39">Here's</a> an example of the eerie sound you hear as the image is received over the radio and rendered.
    </p>
    <h3>151 MHz - 154 MHz - Multi-Use Radio Service (MURS)</h3>
    <p>
      Some consumer walkie-talkies operate on these frequencies. Scanning up and down this range should have you land on some walkie-talkies operating on a couple of channels. Transmitting on these frequencies typically doesn't require a license.
    </p>
    <p>
      <a target="_blank" href="https://www.fcc.gov/wireless/bureau-divisions/mobility-division/multi-use-radio-service-murs">Frequencies ("Data" tab)</a>
    </p>
    <h3>162.500 MHz - NOAA Weather Broadcast</h3>
    <p>
      The US <a href="https://www.noaa.gov/">National Oceanic and Atmospheric Administration</a> broadcasts local weather 24/7.
    </p>
    <h3>462 MHz - 467 MHz - General Mobile Radio Service (GMRS)</h3>
    <p>
      Some consumer walkie-talkies operate on these frequencies, but transmitting on these require an FCC license in the US.
    </p>
    <p>
      <a target="_blank" href="https://www.fcc.gov/general-mobile-radio-service-gmrs">Frequencies ("Data" tab)</a>
    </p>
    <h3>462 MHz - 467 MHz - Family Radio Service (FRS)</h3>
    <p>
      Most consumer walkie-talkies operate on these frequencies. Scanning up and down this range should have you land on some walkie-talkies operating on a couple of channels. Transmitting on these frequencies typically doesn't require a license.
    </p>
    <p>
      <a target="_blank" href="https://www.fcc.gov/wireless/bureau-divisions/mobility-division/family-radio-service-frs">Frequencies ("Data" tab)</a>
    </p>
    <h2>AM</h2>
    <p>Nothing yet</p>
  </NotesPost>
)