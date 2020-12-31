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
        <li>Before <a target="_blank" href="https://pypi.org/project/pyrtlsdr/">pyrtlsdr</a> is installed, <a target="_blank" href="https://github.com/librtlsdr/librtlsdr">librtlsdr</a> needs to be installed. A one-liner command to install both on macOS is <code>brew install librtlsdr && python -m pip install pyrtlsdr</code>.</li>
        <li><a target="_blank" href="https://pysdr.org">PySDR</a> is a great resource for learning the basics of applying DSP in Python.</li>
      </ul>
      <h2>Code</h2>
      <CodeSnippet title="Animated Constellation Plot (Python)">
        <p>
          Using <a target="_blank" href="https://matplotlib.org">matplotlib</a> and <a target="_blank" href="https://numpy.org/">NumPy</a> to create an
          animated <a target="_blank" href="https://en.wikipedia.org/wiki/Constellation_diagram">Constellation Plot</a> visualization
          at a given frequency. Requires an RTL-SDR to be plugged in and matplotlib, numpy, and <a target="_blank" href="https://pypi.org/project/pyrtlsdr/">pyrtlsdr</a> to be installed.
      </p>
        <CodeBlock lang="python">{`
from matplotlib import mlab as mlab
from matplotlib import pyplot as plt
import numpy as np
import matplotlib.animation as animation
from rtlsdr import *

# Open SDR
sdr = RtlSdr()

# Configure SDR
sdr.sample_rate = 1.2e6
sdr.center_freq = 95.5e6 # 95.5 MHz
sdr.gain = 'auto'

# Create figure and first plot
fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)

# On each animation frame, do this
def animate(frame):
  raw_samples = sdr.read_samples(256*1024)
  ax.clear()
  # Get 5 random samples for performance
  randomly_chosen_samples = np.random.choice(raw_samples, size=5)
  X = [c_num.real for c_num in randomly_chosen_samples]
  Y = [c_num.imag for c_num in randomly_chosen_samples]

  blue_circle = plt.Circle((0, 0), radius=1.5, color='blue', fill=False)
  plt.gca().add_artist(blue_circle)

  ax.set_xlabel('I Amplitude')
  ax.set_ylabel('Q Amplitude')
  ax.set_title('Constellation Plot')
  # Plot complex numbers
  ax.scatter(X, Y, color='red')
  # Blue dot at center
  ax.plot(0, 0, 'bD')
  # Set X and Y axis limits to -6, 6
  ax.axis([-2, 2, -2, 2])
  # Make grid visible on plot
  ax.grid(True)

# Have animation show on our figure and call
# animate function every 10 milliseconds
ani = animation.FuncAnimation(fig, animate, interval=10)
plt.show()
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Listen to FM Radio (Python)">
        <p>
          Use <a target="_blank" href="https://numpy.org/">NumPy</a>, <a target="_blank" href="https://www.scipy.org/">SciPy</a>, and <a target="_blank" href="https://pypi.org/project/PyAudio/">PyAudio</a> to listen to demodulate FM radio
          and play the message signal through the device speakers. Modified
          from a <a target="_blank" href="https://gist.github.com/edy555/08284bcbd03cc59ea9b6c49c8dd733c3">GitHub Gist</a> made by <a target="_blank" href="https://github.com/edy555">@edy555</a>.
          Requires an RTL-SDR to be plugged in and numpy, scipy, pyaudio, and <a target="_blank" href="https://pypi.org/project/pyrtlsdr/">pyrtlsdr</a> to be installed.
      </p>
        <CodeBlock lang="python">{`
import numpy as np
import signal as process_signal
import scipy.signal as signal
import array
import rtlsdr
import pyaudio
from queue import Queue

# I'm not exactly sure when this gets
# executed so I'm scared to remove it
def signal_handler(signum, frame):
  print('sig handler called')
  exit(-1)
process_signal.signal(process_signal.SIGINT, signal_handler)

sample_rate = 1.2e6 # 1.2 MHz
num_samples = 1024 * 50

# Confugure SDR based on 
# the above parameters
sdr = rtlsdr.RtlSdr()
sdr.gain = 30 # Low Noise Amp gain
sdr.sample_rate = sample_rate
sdr.center_freq = 95.5e6 # Center Receiving Frequency (95.5 MHz)

# Init audio player object
pa = pyaudio.PyAudio()

# Init the I/Q sample queue
sample_queue = Queue()

def callback(in_data, frame_count, time_info, status):
  capture = sample_queue.get()
  # Decimate 1/5 from 1.2MHz to 240kHz
  sigif = signal.decimate(capture, 5, ftype='fir')
  # Convert to continuous phase angle
  # to help understand read: https://www.ljmu.ac.uk/~/media/files/ljmu/about-us/faculties-and-schools/fet/geri/onedimensionalphaseunwrapping_finalpdf.pdf
  phase = np.unwrap(np.angle(sigif))
  # Get the rate of change between each phase value
  # and the next to get the frequency
  pd = np.convolve(phase, [-1, 1], mode='valid')
  # Decimate 1/10 from 240kHz to 24kHz
  audio = signal.decimate(pd, 10, ftype='fir')
  # Make binary buffer from numpy array for pyaudio
  buf = array.array('f', audio).tostring()
  return (buf, pyaudio.paContinue)

# Audio rate is 1.2MHz / (5 * 10) = 24kHz
stream = pa.open(format=pyaudio.paFloat32,
                channels=1, rate=int(sample_rate/50), output=True, stream_callback=callback)
stream.start_stream()

# Get samples from the air and put them 
# into the sample_queue to be processed
def capture_callback(captured_samples, rtlsdr_obj):
  sample_queue.put(captured_samples)

sdr.read_samples_async(capture_callback, num_samples)

stream.stop_stream()
pa.close()
sdr.close()
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Animated PSD / FFT Plot (Python)">
        <p>
          Using <a target="_blank" href="https://matplotlib.org">matplotlib</a> to create an
          animated <a target="_blank" href="https://en.wikipedia.org/wiki/Spectral_density#Power_spectral_density">Power Spectral Density</a> / <a target="_blank" href="https://en.wikipedia.org/wiki/Fourier_transform">Fast Fourier Transform</a> visualization
          at a given frequency. Requires an RTL-SDR to be plugged in and matplotlib and <a target="_blank" href="https://pypi.org/project/pyrtlsdr/">pyrtlsdr</a> to be installed.
      </p>
        <CodeBlock lang="python">{`
from matplotlib import mlab as mlab
from matplotlib import pyplot as plt
import matplotlib.animation as animation
from rtlsdr import *

# Open SDR
sdr = RtlSdr()

# Configure SDR
sdr.sample_rate = 2.4e6
sdr.center_freq = 95.5e6 # 95.5 MHz
sdr.gain = 'auto'

# Create figure and first plot
fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)

# On each animation frame, do this
def animate(frame):
  samples = sdr.read_samples(256*1024)
  ax.clear()
  ax.set_ylim([-30, 10])
  ax.set_title('PSD / FFT')
  ax.psd(samples, NFFT=1024, Fs=sdr.sample_rate / 1e6)

# Have animation show on our figure and call
# animate function every 10 milliseconds
ani = animation.FuncAnimation(fig, animate, interval=10)
plt.show()
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Read From .iq File (Python)">
        <p>
          Use <a target="_blank" href="https://numpy.org/">NumPy</a> to import I/Q samples from a file and optionally use <a target="_blank" href="https://matplotlib.org">matplotlib</a> to
          visualize some of the samples. Modified from a <a target="_blank" href="https://pysdr.org/content/iq_files.html">PySDR page</a>.
      </p>
        <CodeBlock lang="python">{`
import numpy as np
import matplotlib.pyplot as plt

samples = np.fromfile('signal.iq', np.complex64)
print(samples)

# Plot constellation
plt.plot(np.real(samples), np.imag(samples), '.')
plt.grid(True)
plt.show()
`}</CodeBlock>
      </CodeSnippet>
      <CodeSnippet title="Write to .iq File (Python)">
        <p>
          Use <a target="_blank" href="https://numpy.org/">NumPy</a> to export I/Q samples to a file. Modified from a <a target="_blank" href="https://pysdr.org/content/iq_files.html">PySDR page</a>.
      </p>
        <CodeBlock lang="python">{`
import numpy as np

# Manually generate signal with some noise
num_symbols = 10000
x_symbols = np.random.randint(0, 2, num_symbols)*2-1 # -1 and 1's
n = (np.random.randn(num_symbols) + 1j*np.random.randn(num_symbols))/np.sqrt(2)
r = x_symbols + n * np.sqrt(0.01) # noise power of 0.01

# Save signal to an .iq file
print(type(r[0])) # NumPy complex is complex128 by default
r = r.astype(np.complex64) # Convert to 64
print(type(r[0])) # Verify it's 64
r.tofile('bpsk_in_noise.iq') # Save
`}</CodeBlock>
      </CodeSnippet>
    </NotesPost>
  )
}