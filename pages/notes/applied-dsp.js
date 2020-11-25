import NotesPost from 'components/NotesPost'
import Hint from 'components/Hint'

export default function AppliedDSP() {
  return (
    <NotesPost
      title="Applied Digital Signal Processing"
      description="Making sense of the radio signals around us"
    >
      <h2>Intro</h2>
      <p>
        Radio waves are literally everywhere always passing through us. FM/AM radio, HAM radio, WiFi, Bluetooh, car keys, garage door openers,
      and so much more all use radio waves to transmit information across space. Radio waves help comprise the <a href="https://en.wikipedia.org/wiki/Electromagnetic_spectrum">EM spectrum</a>,
      so they travel at the speed of light.
    </p>
      <h2>Signal Basics</h2>
      <p>
        Being related to light, a radio wave is an analog signal which means we can model it mathematically using a <a href="https://en.wikipedia.org/wiki/Sine_wave">sine wave</a>. With this being said,
    the wave's attributes include its <Hint msg="Frequency is often measured in cycles per second, using a unit called a Hertz (Hz).">frequency</Hint>, amplitude, and phase.
    In most radio systems, we communicate information by changing the signal's frequency or amplitude over time, called <a href="https://en.wikipedia.org/wiki/Frequency_modulation">frequency modulation</a> and <a href="https://en.wikipedia.org/wiki/Amplitude_modulation">amplitude modulation</a>, respectively.
    For example, commercial radio stations are separated by FM and AM radio stations.
    </p>
      <h2>Getting Hands Dirty</h2>
      <p>
        We can use a <a href="https://www.amazon.com/s?k=software+defined+radio">Software Defined Radio (SDR)</a> dongle and attach an antenna to it in order to receive lots of radio signals.
      SDRs receive raw radio signals on a wide range of frequencies (often high kHZ to low GHz). The cool thing about them is that you use software to interpret the raw <a href="/2020/11/understanding-complex-signals">complex radio signals</a>, which means
      you can do all the signal processing entirely using software. You can use GNU Software like <a href="https://www.gnuradio.org/">GNU Radio</a> or other open source software like the
      &nbsp;<a href="https://github.com/osmocom/rtl-sdr">rtl-sdr</a> and its more approachable Python wrapper, <a href="https://github.com/roger-/pyrtlsdr">pyrtlsdr</a>. I found <a href="https://gqrx.dk/">GQRX</a>&nbsp;
       to be the easiest thing to get started using for beginners with a new SDR. It was easy to download and install, and you can immediately plug in your SDR dongle and start tuning it to nearby radio stations
      to listen to music.
    </p>
      <p>
        The vast majority of SDRs simply receive radio signals, but more expensive ones like the <a href="https://www.youtube.com/results?search_query=hackrf&page=&utm_source=opensearch">HackRF</a> can also transmit!
      There's even a little hack to get your <a href="https://www.raspberrypi.org/">Raspberry Pi</a> to <a href="https://www.youtube.com/results?search_query=raspberry+pi+fm+transmitter">transmit on some lower frequencies</a> and serve as a cheap radio station.
      It's very approachable since the Pi is cheap, but do NOT transmit before consulting the laws in jurisdiction.
    </p>
      {/* 
      <h2>Demodulation</h2>
      <p>
        
    </p>
    */}
      <h2>Decoding Digital Signals</h2>
      <p>
        WiFi, Bluetooth, digital satellites, and more using communicate using binary code. They prepare the bits in each message to be transmitted
        through radio waves by using digital modulating schemes that build on top of the analog modulating schemes like FM and AM.
    </p>
      <p>
        Most digital modulation schemes are based on <a href="https://tomroelandts.com/index.php/articles/how-does-phase-shift-keying-modulation-work" target="_blank">Phase Shift Keying</a> and <a href="https://www.tutorialspoint.com/digital_communication/digital_communication_frequency_shift_keying.htm" target="_blank">Frequency Shift Keying</a>.
    </p>
      <h2>Broader Signal Processing</h2>
      <p>
        Cool places to learn more about Digital Signal Processing include <a href="https://www.pythonforengineers.com/audio-and-digital-signal-processingdsp-in-python/">Audio and Digital Signal Processing (DSP) in Python</a>,
      &nbsp;<a href="https://dsp.stackexchange.com/">Digital Signal Processing Stack Exchange</a>, and <a href="https://sites.google.com/berkeley.edu/ee123-sp19/home">Cal's EE123 Course</a>.
    </p>
      <h2>Applications</h2>
      <p>
        There's a variety of applications for radio technology. I've talked about <a href="/2020/10/why-i-care-about-radio">why I care about radio</a>, and I have <a href="/notes/frequency-reference">a list of some easy-to-find radio stations</a> and bands you can tune yours to if
        you want to find some interesting stuff.
    </p>
      <h2>Extra Notes</h2>
      <ul>
        <li>Before <a target="_blank" href="https://pypi.org/project/pyrtlsdr/">pyrtlsdr</a> is installed, <a target="_blank" href="https://github.com/librtlsdr/librtlsdr">librtlsdr</a> needs to be installed. A one-liner command to install both on macOS is <code>brew install librtlsdr && python -m pip install pyrtlsdr</code>.</li>
      </ul>
    </NotesPost>
  )
}