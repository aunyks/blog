import Post from 'components/Post'

export default () => (
  <Post
    title="Applied Digital Signal Processing"
    date="2020-07-26"
    description="Making sense of the radio signals around us"
  >
    <p><i>This is more of a brain dump and may not be as easy to follow as a de facto blog post.</i></p>
    <h2>Intro</h2>
    <p>
      Radio waves are literally everywhere always passing through us. FM/AM radio, HAM radio, WiFi, Bluetooh, car keys, garage door openers,
      and so much more all use radio waves to transmit information across space. Radio waves help comprise the <a href="https://en.wikipedia.org/wiki/Electromagnetic_spectrum">EM spectrum</a>,
      so they travel at the speed of light.
    </p>
    <h2>Signal Basics</h2>
    <p>
      Being light, a radio wave is an analog signal which means we can model it using a <a href="https://en.wikipedia.org/wiki/Sine_wave">sine wave</a>. With this being said,
    the wave's attributes include its frequency, amplitude, and phase, the most important of which when modeling the wave in simple terms are its frequency and amplitude.
    We often communicate information by changing the signal's frequency or amplitude over time, called <a href="https://en.wikipedia.org/wiki/Frequency_modulation">frequency modulation</a> and <a href="https://en.wikipedia.org/wiki/Amplitude_modulation">amplitude modulation</a>, respectively.
    I'm not certain why, but FM is more popular than AM in nearly all radio communication.
    </p>
    <h2>Getting Hands Dirty</h2>
    <p>
      We can use a <a href="https://www.amazon.com/s?k=software+defined+radio">Software Defined Radio (SDR)</a> dongle and attach an antenna to it in order to receive lots of radio signals.
      SDRs receive raw radio signals on a wide range of frequencies (often high kHZ to low GHz). The cool thing about them is that you use software to interpret the raw radio signals, which means
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
    <h2>FM Demod</h2>
    <p>
      As previously stated, FM is more common than AM, so knowing how to demodulate FM signals is probably more desirable than doing so for AM signals. <a href="https://wybiral.github.io/">Davy Wybiral's</a>
      <a href="https://github.com/wybiral/spirit-box">spirit-box</a> project has a very clear example of FM demodulation to playable sound using pyrtlsdr. Another good page for demodulation using
      Python is <a href="https://witestlab.poly.edu/blog/capture-and-decode-fm-radio/">this post</a> by <a href="http://witestlab.poly.edu/~ffund/">Fraida Fund</a>.
    </p>
    <h2>Decoding Digital Signals</h2>
    <p>
      Protocols like WiFi and GSM encode purely digital information using FM, so decode the binary information from the signals we need to convert raw radio signal to FM and then FM to binary.
      The signal to FM is can be done using tools from the previous section, but FM to binary (often via <a href="https://en.wikipedia.org/wiki/Square_wave">square waves</a>) can be done by demodulating <a href="https://www.allaboutcircuits.com/technical-articles/fsk-explained-with-python/">Frequency Shift Keyed</a>
      &nbsp; waves and then converting the resulting square waves into bits. Knowing a bit about <a href="https://en.wikipedia.org/wiki/Phase-locked_loop">Phase-Locked Loops (PLLs)</a> may help in understanding FSK.
    </p>
    <h2>Broader Signal Processing</h2>
    <p>
      Cool places to learn more about Digital Signal Processing include <a href="https://www.pythonforengineers.com/audio-and-digital-signal-processingdsp-in-python/">Audio and Digital Signal Processing (DSP) in Python</a>,
      &nbsp;<a href="https://dsp.stackexchange.com/">Digital Signal Processing Stack Exchange</a>, and <a href="https://sites.google.com/berkeley.edu/ee123-sp19/home">Cal's EE123 Course</a>.
    </p>
    <h2>Security</h2>
    <p>
      Information security related to radio signals is pretty low level. Radio is layer 1 and layer 2 of the <a href="https://en.wikipedia.org/wiki/OSI_model">OSI</a> and <a href="https://en.wikipedia.org/wiki/Internet_protocol_suite">Internet</a> networking models.
      This means that attacks on protocols on those two layers are possible using radio waves, which includes WiFi, Bluetooth, and GSM/CDMA cell signal attacks. Replay attacks are also common against devices
      like garage door openers and car keys.
    </p>
    <p>
      You can do cool things like sniff WiFi traffic on insecure (read: WEP) networks and get a feed of all phones nearby and their IDs and carrier as if you were a cell tower, like a passive version of the
      &nbsp;<a href="https://en.wikipedia.org/wiki/IMSI-catcher">IMSI Catchers</a> that law enforcement and militaries use. <a href="https://harrisonsand.com/imsi-catcher/">This</a> is a good post to follow for that.
    </p>
  </Post>
)