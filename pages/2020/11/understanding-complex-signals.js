import { useState, useEffect } from 'react'
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory'

import Post from 'components/Post'
import Hint from 'components/Hint'
import Tex from 'components/Tex'

function lerp(start, end, progress) {
  return start * (1 - progress) + end * progress
}

const range = (a, b, step, inclusiveOfB = false) => {
  if (a > b) {
    throw new Error('[range()] Initial value greater than final value. Must be less than final value.')
  }
  if (a === b) {
    throw new Error('[range()] Initial value equal to final value. Must be less than final value')
  }
  let values = []
  for (let currentValue = a; inclusiveOfB ? currentValue <= b : currentValue < b; currentValue += step) {
    values.push(currentValue)
  }
  return values
}

function Phasor({ progress, width, tickLength, isDark }) {
  const rotation = lerp(0, 360, progress || 0)
  const length = lerp(52, 102, tickLength || 1)
  return (
    <svg className="mx-auto" width={width} viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="52" cy="52" r="47.5" stroke={isDark ? '#fff' : '#000'} strokeWidth="2" />
      <line x1="52" y1="0" x2="52" y2="100" stroke={isDark ? '#fff' : '#000'} strokeWidth="1" />
      <line x1="0" y1="52" x2="104" y2="52" stroke={isDark ? '#fff' : '#000'} strokeWidth="1" />
      <line x1="52" y1="52" x2={length} y2="52" stroke="#FF0000" strokeWidth="3"
        transform={`rotate(-${rotation} 52 52)`} />
    </svg>
  )
}

function PhasorWSlider({ isDark }) {
  const [angle, setAngle] = useState(0)
  const [amplitude, setAmplitude] = useState(1)
  return (
    <div className="mx-auto w-full">
      <Phasor isDark={isDark} width={150} progress={angle} tickLength={amplitude} />
      <section className="flex flex-col mx-auto w-3/4 lg:w-1/2">
        <span className="block">Phase Angle: {(angle * 360).toFixed(2)}&#176;</span>
        <input className="mx-auto w-full" type="range" min="0" max="1" step="0.01" value={angle} onChange={e => setAngle(e.target.value)} />
        <span className="block">Amplitude: {Number(amplitude).toFixed(2)}</span>
        <input className="mx-auto w-full" type="range" min="0" max="1" step="0.01" value={amplitude} onChange={e => setAmplitude(e.target.value)} />
      </section>
    </div>
  )
}

function RFWPhasor({ isDark }) {
  const [amplitude, setAmplitude] = useState(1)
  const [angle, setAngle] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      if (angle >= 1) {
        setAngle(0)
      } else {
        setAngle(angle + 0.02)
      }
    }, 350)
  })
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <VictoryChart>
          <VictoryAxis dependentAxis domain={[-1.1, 1.1]} tickLabelComponent={<></>} />
          <VictoryLine
            data={range(-4, 0, 0.01).map((x) => ({ x }))}
            style={{ data: { stroke: isDark ? '#fff' : '#000', strokeWidth: 3 } }}
            y={({ x }) => amplitude * -1 * Math.sin(x - angle * (2 * Math.PI / 1))}
          />
        </VictoryChart>
        <Phasor isDark={isDark} width={250} progress={angle} tickLength={amplitude} />
      </div>
      <div className="mx-auto w-3/4 lg:w-1/2">
        <span className="block">Amplitude: {Number(amplitude).toFixed(2)}</span>
        <input className="mx-auto w-full" type="range" min="0" max="1" step="0.01" value={amplitude} onChange={e => setAmplitude(e.target.value)} />
      </div>
    </>
  )
}

function RFPhasorRF({ isDark }) {
  const [amplitude, setAmplitude] = useState(1)
  const [angle, setAngle] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      if (angle >= 1) {
        setAngle(0)
      } else {
        setAngle(angle + 0.02)
      }
    }, 350)
  })
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <VictoryChart>
          <VictoryAxis dependentAxis domain={[-1.1, 1.1]} tickLabelComponent={<></>} />
          <VictoryLine
            data={range(-4, 0, 0.01).map((x) => ({ x }))}
            style={{ data: { stroke: isDark ? '#fff' : '#000', strokeWidth: 3 } }}
            y={({ x }) => amplitude * -1 * Math.sin(x - angle * (2 * Math.PI / 1))}
          />
        </VictoryChart>
        <Phasor isDark={isDark} width={250} progress={angle} tickLength={amplitude} />
        <VictoryChart>
          <VictoryAxis dependentAxis domain={[-1.1, 1.1]} tickLabelComponent={<></>} />
          <VictoryLine
            data={range(0, 4, 0.01).map((x) => ({ x }))}
            style={{ data: { stroke: isDark ? '#fff' : '#000', strokeWidth: 3 } }}
            y={({ x }) => amplitude * -1 * Math.sin(x - angle * (2 * Math.PI / 1))}
          />
        </VictoryChart>
      </div>
      <div className="mx-auto w-3/4 lg:w-1/2">
        <span className="block">Amplitude: {Number(amplitude).toFixed(2)}</span>
        <input className="mx-auto w-full" type="range" min="0" max="1" step="0.01" value={amplitude} onChange={e => setAmplitude(e.target.value)} />
      </div>
    </>
  )
}

export default function UnderstandCSignals() {
  const [isDark, setDark] = useState(false)

  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    try {
      // For Chrome / FireFox
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
        setDark(matches)
      })
    } catch (e) {
      // For Safari
      window.matchMedia('(prefers-color-scheme: dark)').addListener(({ matches }) => {
        setDark(matches)
      })
    }
  }, [])

  return (
    <Post
      title="Understanding Complex Signals"
      subtitle="Complex isn't always complicated"
      description="In this post I try to demystify what complex signals are and how they're useful in Digital Signal Processing."
      date="2020-11-10"
      remark={<></>}
      hasMath>
      <p>
        While learning about digital signal processing (DSP), one thing that's been confusing me is talk about complex signals. Complex signals
        are complex in the mathematical sense, so they're composed of a real and imaginary part. Let's talk
        about what that means.
        </p>
      <p>
        Imagine a simple signal represented by a sinusoidal wave and transmitted over radio frequency (RF). We need to effectively
        model this signal as we receive it over the air. Our receiving circuit can find the amplitude and <a href="https://www.eeeguide.com/phase-of-sine-wave/" target="_blank">phase angle</a> of the signal.
        With that, we can plot these two parameters on a <a href="https://www.mathsisfun.com/algebra/complex-plane.html" target="_blank">complex plane</a> as polar coordinates. This model is called a phasor.
        </p>
      <figure className="mx-auto w-full my-5">
        <PhasorWSlider isDark={isDark} />
        <figcaption className="text-xs text-center">Move the sliders to change the phasor's phase angle and amplitude.</figcaption>
      </figure>
      <p>
        With these two parameters, we can model the incoming signal using Euler's formula, <Tex tex="Ae^{ i\theta } = A\cos \theta + iA\sin \theta" />.
        That's some tricky math, and it came quickly, so let's take some time to understand what it means and why we need it.
        </p>
      <p>
        Remember that our incoming signal is a simple sinusoid. Let's look at how that signal affects our phasor.
        </p>
      <figure>
        <RFWPhasor isDark={isDark} />
      </figure>
      <p>
        Notice that, as the signal reaches our antenna, our phasor's phase angle changes according to the signal's phase.
        Ultimately, our circuit will be processing what the phasor does, so let's look at the signal that the phasor itself
        produces for our circuit.
        </p>
      <figure>
        <RFPhasorRF isDark={isDark} />
      </figure>
      <p>
        Looks the same as the RF signal, right? For the most part, it is. The resulting signal is <em>in-phase</em> with
          the RF signal, which means that they're essentially synchronized. This is how the vast majority of analog radio
          receivers work, and the signal received over the air can be used for later signal processing.
          For DSP, however, we can't make many assumptions about how the computer will be processing the data, and some
          processing systems may find it difficult just to process the one original signal.
        </p>
      <p>
        Luckily, it's pretty easy for us to create two useful signals from the one original. With these two, we can make
        tasks that are usually complicated with one signal much simpler for the computer: tasks like demodulation.
        </p>
      <p>
        Put simply, our phasor gives us two signals: the <em>in-phase</em> signal that we saw previously and the <em>quadrature</em> signal
          that's produced at a 90&#176; offset from the in-phase signal. Because this offset in phase is a quarter-rotation off of the in-phase
          signal, it's called the <em className="underline">quad</em>rature signal.
        </p>
      <figure className="mb-3">
        <img src="/img/tech/complex-phasor.gif" alt="A GIF showing a phasor with corresponding in-phase and quadrature signals." style={{ transform: 'rotate(90deg)' }} />
        <figcaption className="text-xs mx-auto w-3/4">The in-phase signal is to the bottom, and the quadrature signal is to the right. Source: <a href="https://www.physicsforums.com/threads/two-waves-moving-at-right-angles-go-in-circles.933112/">Physics Forums</a></figcaption>
      </figure>
      <p>
        The quadrature signal has an interesting property here in that it's imaginary. Recall that we're on a complex plane, so the vertical axis
        consists of imaginary numbers. Because the quadrature signal oscillates on this axis, the signal is also imaginary.
        </p>
      <h3>Making sense of the math</h3>
      <p>
        We can model the simple sinusoid of our RF signal mathematically using the cosine function, <Tex tex="\cos (\theta)" />. And, because the in-phase
        signal is essentially identical, we can also use cosine to model it, as well.
      </p>
      <p>
        How do we model the quadrature signal, then? Well, the quadrature signal is out of phase with the in-phase signal by 90&#176;, which means it can be
        modeled by <Tex tex="\cos (90^{\circ} - \theta)" />, which is equal to <Tex tex="\sin (\theta)" />.
      </p>
      <p>
        With <Tex tex="\cos (\theta)" /> being our <Hint msg="Or, real signal">in-phase signal</Hint> and <Tex tex="\sin (\theta)" /> being
        our <Hint msg="Or, imaginary signal">quadrature signal</Hint>, we can mathematically represent both signals together using Euler's formula.
      </p>
      <figure className="mx-auto w-full">
        <Tex isFigure tex="Ae^{ i\theta } = A\cos \theta + iA\sin \theta" />
      </figure>
      <p>
        Here, we're saying that the two parameters we receive from the RF signal, <Tex tex="A" /> and <Tex tex="\theta" />, can be equally
        represented using two signals: one that's in-phase with the RF signal and one that a quarter-rotation out of phase with it. The RF side of
        the equation is the left-hand side, <Tex tex="Ae^{ i\theta }" />, and the side that's processed by the computer is the right-hand side, <Tex tex="\cos \theta + i\sin \theta" />.
        Of course, our equation shows us that both sides are equivalent, so the information we're processing is the same as the information we received over the air.
      </p>
      <p>
        In reality, the signal that we're receiving over the air isn't a basic sinusoid, but this exercise helps us build some intuition about
        the use of complex signals in DSP.
      </p>
      <h3>In Practice, the I and Q</h3>
      <p>
        In practical DSP, you may not always hear about processing a real and imaginary signal, but the odds are that you've heard of them or have been using them without knowing!
        Many DSP applications require processing of I/Q data. I/Q data is the data that we use to process signals received over the air, and we get them by <a href="https://en.wikipedia.org/wiki/Sampling_(signal_processing)" target="_blank">sampling</a> the complex signals we've been
        talking about. Specifically, <em>I</em> refers to the <em className="font-bold">i</em>n-phase signal, and the <em>Q</em> refers to the <em className="font-bold">q</em>uadrature signal.
      </p>
      <h3>Why is this called "complex"?</h3>
      <p>
        This is because the right-hand side of our equation is one part real and one part imaginary, and it follows the form
        of all two-dimensional <a href="https://en.wikipedia.org/wiki/Complex_number" target="_blank">complex values</a>: <Tex tex="a + bi" />.
      </p>
      <h3>Why do this?</h3>
      <p>
        As stated before, converting the RF signal into two signals to be processed like this makes tasks like demodulation
        much simpler and more robust.
      </p>
      <h3>How does this make demodulation easier?</h3>
      <p>
        I cover this briefly in <a href="/2020/11/demodulating-iq-data">the next post</a>.
      </p>
      <h3>To wrap up</h3>
      <p>
        I hope this made the concept of complex signals easier for you to understand. If you have any questions or would like to offer
        ways that I can improve this post, feel free to <a href="https://aunyks.com/contact">contact me</a>.
      </p>
    </Post>
  )
}