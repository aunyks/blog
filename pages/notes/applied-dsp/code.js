import CodeSnippetPost from 'components/CodeSnippetPost'
import CodeBlock from 'components/CodeBlock'
import CodeSnippet from 'components/CodeSnippet'
import Diagram from 'components/Diagram'

export default function DSPCodeSnippets() {
  return (
    <CodeSnippetPost
      title="DSP Code Snippets"
      description="Useful code snippets that I use and reuse throughout my digital signal processing projects. Most of these apply to RF signal processing."
      hasDiagram
    >
      <CodeSnippet title="Listen to FM Radio (GNURadio)">
        <p>
          Using GNURadio to listen to FM Radio. To change the station frequency, set the Ch0 Frequency argument of the
          RTL-SDR Source block to the desired FM station frequency. Every block's arguments can stay on their default values,
          except for those specified below.
        </p>
        <figure>
          <Diagram
            alt="An RTL-SDR block connects to a Rational Resampler block. The Resampler block connects to a Low Pass Filter block. The Filter connects to a WBFM block, which, itself, connects to an Audio Sink block"
          >{`
      graph LR
        A[RTL-SDR Source<br/>Num Channels: 1<br/>Sample Rate: 1.2M<br/>Ch0 Frequency: 95.5M] --> B[Rational Resampler<br/>Interpolation: 1<br/>Decimation: 5]
        B --> C[Low Pass Filter<br/>Decimation: 1<br/>Sample Rate: 1.2M<br/>Cutoff Freq: 100K<br/>Transition Width: 1M]
        C --> D[WBFM Receive<br/>Quadrature Rate: 500K<br/>Audio Decimation: 10<br/>]
        D --> E[Audio Sink<br/>Sample Rate: 24K]
      `}</Diagram>
        </figure>
      </CodeSnippet>
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
    </CodeSnippetPost>
  )
}