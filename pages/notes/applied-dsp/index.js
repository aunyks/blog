import NotesPost from 'components/NotesPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Hint from 'components/Hint'

export default function AppliedDSP() {
  return (
    <NotesPost
      title="Applied Digital Signal Processing"
      description="Making sense of the radio signals around us"
      hasCodeSnippet
    >
      <h2>Overview</h2>
      <h3>Intro</h3>
      <p>
        Radio waves are literally everywhere always passing through us. FM/AM radio, HAM radio, WiFi, Bluetooh, car keys, garage door openers,
      and so much more all use radio waves to transmit information across space. Radio waves help comprise the <a href="https://en.wikipedia.org/wiki/Electromagnetic_spectrum">EM spectrum</a>,
      so they travel at the speed of light.
    </p>
      <h3>Signal Basics</h3>
      <p>
        Being related to light, a radio wave is an analog signal which means we can model it mathematically using a <a href="https://en.wikipedia.org/wiki/Sine_wave">sine wave</a>. With this being said,
    the wave's attributes include its <Hint msg="Frequency is often measured in cycles per second, using a unit called a Hertz (Hz).">frequency</Hint>, amplitude, and phase.
    In most radio systems, we communicate information by changing the signal's frequency or amplitude over time, called <a href="https://en.wikipedia.org/wiki/Frequency_modulation">frequency modulation</a> and <a href="https://en.wikipedia.org/wiki/Amplitude_modulation">amplitude modulation</a>, respectively.
    For example, commercial radio stations are separated by FM and AM radio stations.
    </p>
      <h3>Getting Hands Dirty</h3>
      <p>
        We can use a <a target="_blank" href="https://www.amazon.com/s?k=software+defined+radio">Software Defined Radio (SDR)</a> dongle and attach an antenna to it in order to receive lots of radio signals.
      SDRs receive raw radio signals on a wide range of frequencies (often high kHZ to low GHz). The cool thing about them is that you use software to interpret the raw <a href="/2020/11/understanding-complex-signals">complex radio signals</a>, which means
      you can do all the signal processing entirely using software. You can use GNU Software like <a target="_blank" href="https://www.gnuradio.org/">GNU Radio</a> (<code>brew install gnuradio</code> on macOS) or other open source software like the
      &nbsp;<a target="_blank" href="https://github.com/osmocom/rtl-sdr">rtl-sdr</a> and its more approachable Python wrapper, <a target="_blank" href="https://github.com/roger-/pyrtlsdr">pyrtlsdr</a>. I found <a target="_blank" href="https://gqrx.dk/">GQRX</a>&nbsp;
       to be the easiest thing to get started using for beginners with a new SDR. It was easy to download and install, and you can immediately plug in your SDR dongle and start tuning it to nearby radio stations
      to listen to music.
    </p>
      <p>
        The vast majority of SDRs simply receive radio signals, but more expensive ones like the <a target="_blank" href="https://www.youtube.com/results?search_query=hackrf&page=&utm_source=opensearch">HackRF</a> can also transmit!
      There's even a little hack to get your <a target="_blank" href="https://www.raspberrypi.org/">Raspberry Pi</a> to <a target="_blank" href="https://www.youtube.com/results?search_query=raspberry+pi+fm+transmitter">transmit on some lower frequencies</a> and serve as a cheap radio station.
      It's very approachable since the Pi is cheap, but do NOT transmit before consulting the laws in jurisdiction.
    </p>
      <h3>Demodulation</h3>
      <p>
        We can demodulate the incoming signal in a <em>relatively</em> simple manner, if we're given the <a href="/2020/11/understanding-complex-signals">complex signal</a> in I/Q format. See <a href="/2020/11/demodulating-iq-data">this post</a> for more information.
    </p>
      <h3>Decoding Digital Signals</h3>
      <p>
        WiFi, Bluetooth, digital satellites, and more using communicate using binary code. They prepare the bits in each message to be transmitted
        through radio waves by using digital modulating schemes that build on top of the analog modulating schemes like FM and AM.
    </p>
      <p>
        Most digital modulation schemes are based on <a target="_blank" href="https://tomroelandts.com/index.php/articles/how-does-phase-shift-keying-modulation-work" target="_blank">Phase Shift Keying</a> and <a href="https://www.tutorialspoint.com/digital_communication/digital_communication_frequency_shift_keying.htm" target="_blank">Frequency Shift Keying</a>.
    </p>
      <h3>Broader Signal Processing</h3>
      <p>
        Cool places to learn more about Digital Signal Processing include <a target="_blank" href="https://www.pythonforengineers.com/audio-and-digital-signal-processingdsp-in-python/">Audio and Digital Signal Processing (DSP) in Python</a>,
      &nbsp;<a target="_blank" href="https://dsp.stackexchange.com/">Digital Signal Processing Stack Exchange</a>, and <a href="https://sites.google.com/berkeley.edu/ee123-sp19/home">Cal's EE123 Course</a>.
    </p>
      <h3>Applications</h3>
      <p>
        There's a variety of applications for radio technology. I've talked about <a href="/2020/10/why-i-care-about-radio">why I care about radio</a>, and I have <a href="/notes/frequency-reference">a list of some easy-to-find radio stations</a> and bands you can tune yours to if
        you want to find some interesting stuff.
    </p>
      <h2>Extra Notes</h2>
      <ul className="mb-4">
        <li><a target="_blank" href="https://pysdr.org">PySDR</a> is a great resource for learning the basics of applying DSP in Python.</li>
      </ul>
      <h2>Installing Software</h2>
      <p className="mb-3">
        On <Hint msg="My current operating system.">macOS</Hint>:
      </p>
      <h3>Librtlsdr and assorted tools</h3>
      <ol>
        <li>Install <a target="_blank" href="https://brew.sh">Homebrew</a></li>
        <li>Run <code>brew install librtlsdr</code></li>
        <li>[DONE] <code>librtlsdr</code> and the <code>rtl_*</code> CLI tools should be installed and available</li>
      </ol>
      <p className="my-3">
        OR
      </p>
      <ol className="mb-5">
        <li>Install a version of MacPorts for your OS version <a href="https://github.com/macports/macports-base/releases/tag/v2.6.4">from GitHub</a></li>
        <li>Run <code>sudo port install rtl-sdr</code></li>
        <li>[DONE] <code>librtlsdr</code> and the <code>rtl_*</code> CLI tools should be installed and available</li>
      </ol>
      <h3>GNURadio</h3>
      <p className="mb-3">
        Adapting <a target="_blank" href="http://aaronscher.com/wireless_com_SDR/MacOSX_install_gnu_radio.html">Aaron Scher's tutorial</a>:
      </p>
      <ol className="mb-5">
        <li>Install the macOS X11 window manager, <a target="_blank" href="https://www.xquartz.org/">XQuartz</a></li>
        <li>Install a version of MacPorts for your OS version <a href="https://github.com/macports/macports-base/releases/tag/v2.6.4">from GitHub</a></li>
        <li>
          Add <code>/opt/local/bin</code> and <code>/opt/local/sbin</code> to your <code>$PATH</code> environment variable so that executables in those directories
        can be found
        </li>
        <li>Open up a new terminal session and run <code>sudo port install gnuradio</code></li>
        <li>Run <code>sudo port install rtl-sdr</code> (or <code>brew install librtlsdr</code> with <a target="_blank" href="https://brew.sh">Homebrew</a> if that doesn't work)</li>
        <li>Run <code>sudo port install gr-osmosdr</code></li>
        <li>[DONE] Run <code>gnuradio-companion</code> to see the GNURadio GUI!</li>
      </ol>
      <h3>Pyrtlsdr</h3>
      <ol className="mb-5">
        <li>Install <code>librtlsdr</code> (see above)</li>
        <li>In the terminal, run <code>python -m pip install pyrtlsdr</code></li>
      </ol>
      <h2>Code</h2>
      <p>
        See <a href="/notes/applied-dsp/code">code snippets and GNURadio flows</a>.
      </p>
    </NotesPost>
  )
}