import NotesPost from 'components/NotesPost'

const Station = ({ title, freq, children }) => {
  return (
    <>
      <h3 className="text-2xl leading-none mb-2">{title}</h3>
      <h4 className="text-xl">{freq}</h4>
      {children}
    </>
  )
}

export default () => (
  <NotesPost
    title="Radio Frequency Reference"
    subtitle="Frequencies, Ranges and Their Uses"
    description="A quick reference for all kinds of radio frequencies and their uses"
  >
    <h2 className="text-3xl">FM</h2>
    <Station title="CB Radio" freq="26.965 MHz - 27.405 MHz">
      <p>
        Citizens Band Radio is a radio service that used to be very popular. Transmissions often travel for tens of miles.
      </p>
      <p>
        <a target="_blank" href="https://www.fcc.gov/wireless/bureau-divisions/mobility-division/citizens-band-radio-service-cbrs">More info</a>
      </p>
    </Station>
    <Station title="ISS SSTV Downlink" freq="145.800 MHz">
      <p>
        The <a href="https://www.nasa.gov/mission_pages/station/main/index.html">International Space Station</a> constantly orbits the Earth and broadcasts pictures using <a href="https://en.wikipedia.org/wiki/Slow-scan_television">Slow Scan Television</a>.
        &nbsp;<a href="https://youtu.be/sG4UhlByFyw?t=39">Here's</a> an example of the eerie sound you hear as the image is received over the radio and rendered.
      </p>
    </Station>
    <Station title="Multi-Use Radio Service (MURS)" freq="151 MHz - 154 MHz">
      <p>
        Some consumer walkie-talkies operate on these frequencies. Scanning up and down this range should have you land on some walkie-talkies operating on a couple of channels. Transmitting on these frequencies typically doesn't require a license.
      </p>
      <p>
        <a target="_blank" href="https://www.fcc.gov/wireless/bureau-divisions/mobility-division/multi-use-radio-service-murs">More info</a>
      </p>
    </Station>
    <Station title="NOAA Weather Broadcast" freq="162.500 MHz">
      <p>
        The US <a href="https://www.noaa.gov/">National Oceanic and Atmospheric Administration</a> broadcasts local weather 24/7.
      </p>
    </Station>
    <Station title="General Mobile Radio Service (GMRS)" freq="462 MHz - 467 MHz">
      <p>
        Some consumer walkie-talkies operate on these frequencies, but transmitting on these require an FCC license in the US.
      </p>
      <p>
        <a target="_blank" href="https://www.fcc.gov/general-mobile-radio-service-gmrs">More info</a>
      </p>
    </Station>
    <Station title="Family Radio Service (FRS)" freq="462 MHz - 467 MHz">
      <p>
        Most consumer walkie-talkies operate on these frequencies. Scanning up and down this range should have you land on some walkie-talkies operating on a couple of channels. Transmitting on these frequencies typically doesn't require a license.
      </p>
      <p>
        <a target="_blank" href="https://www.fcc.gov/wireless/bureau-divisions/mobility-division/family-radio-service-frs">More info</a>
      </p>
    </Station>
    <h2>AM</h2>
    <p>Nothing yet</p>
  </NotesPost>
)