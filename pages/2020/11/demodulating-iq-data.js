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

function RFPhasor({ isDark }) {
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
            data={range(0, 4, 0.01).map((x) => ({ x }))}
            style={{ data: { stroke: isDark ? '#fff' : '#000', strokeWidth: 3 } }}
            y={({ x }) => amplitude * -1 * Math.sin(x - angle * (2 * Math.PI / 1))}
          />
        </VictoryChart>
        <Phasor isDark={isDark} width={250} progress={angle} tickLength={amplitude} />
      </div>
      <div className="mx-auto w-3/4 lg:w-1/2">
        <span className="block">Phase Angle: {(angle * 360).toFixed(2)}&#176;</span>
        <span className="block">Amplitude: {Number(amplitude).toFixed(2)}</span>
        <input className="mx-auto w-full" type="range" min="0" max="1" step="0.01" value={amplitude} onChange={e => setAmplitude(e.target.value)} />
      </div>
    </>
  )
}

export default function DemodulatingIQData() {

  const [isDark, setDark] = useState(false)

  useEffect(() => {
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({ matches }) => {
      setDark(matches)
    })
  }, [])

  return (
    <Post
      title="Demodulating I/Q Data"
      subtitle="Messages In The Air"
      description="Covering the theory behind I/Q demodulation and how it works in practice."
      date="2020-11-15"
      remark={<></>}
      hasMath>
      <p>
        In <a href="/2020/11/understanding-complex-signals">the last post</a>, we covered the basics of complex signals and how they work in
        digital signal processing (DSP) systems. The next question is how do we demodulate these
        signals and find the messages in them? To answer that, we need to update our model of the incoming
        signal.
      </p>
      <p>
        Previously, we used Euler's formula as the basis for our model of complex signals. While this is great to
        keep in mind, it was only correct given a pure sinusoid as the incoming signal. In reality, we can't make many
        assumptions about the signal, so modeling it as a simple sinusoid isn't always accurate. We need a more abstract
        way to model more realistic signals.
      </p>
      <figure>
        <Tex isFigure tex="Ae^{ i\theta } = A\cos (\theta) + iA\sin (\theta)" />
      </figure>
      <p>
        Recall that <Tex tex="\cos (\theta)" /> represented the in-phase, or <Tex tex="I" />, portion of our complex signal and <Tex tex="\sin (\theta)" /> represented
        the quadrature, or <Tex tex="Q" />, portion. Since we're not sure that our I and Q functions will be simple sinusoids like sine and
        cosine, we can use abstract functions like <Tex tex="I(t)" /> and <Tex tex="Q(t)" />. This way, we arrive at a new, more abstract way to model
        any signal we'll be receiving over the air.
      </p>
      <figure className="mb-2">
        <Tex isFigure tex="s(t) = I(t) + jQ(t)" />
        <figcaption className="text-xs mx-auto w-5/6 lg:w-3/4">Where <Tex tex="s" /> is the incoming signal, <Tex tex="j" /> is our <a href="https://en.wikipedia.org/wiki/Imaginary_unit" target="_blank">imaginary unit</a>, and <Tex tex="t" /> is some point in time.</figcaption>
      </figure>
      <p>
        How do we demodulate our signal with this formula? Well, to modulate a signal is to change one of its properties according
        to the message it encodes. So, to demodulate the signal we must be able to extract these properties from our new signal formula.
      </p>
      <p>
        Remember the phasor from <a href="/2020/11/understanding-complex-signals">our last post</a> and how it modeled our wave. We can use it to help calculate how we can get properties
        like amplitude, phase, and more using our formula. Finding these properties lets us demodulate the signal.
      </p>
      <figure className="mb-2">
        <RFPhasor isDark={isDark} />
        <figcaption className="text-xs mx-auto w-5/6 lg:w-3/4">Move the slider to change the amplitude.</figcaption>
      </figure>
      <p>
        To help us better understand the math and visuals for these concepts, notice that our phasor is always
        making a triangle.
      </p>
      <figure className="mb-2">
        <svg className="mb-1 mx-auto w-1/2 lg:w-1/3" viewBox="0 0 104 104" fill="none" >
          <g clipPath="url(#clip0)">
            <circle cx="-2.5" cy="99.5" r="98.5" stroke={isDark ? 'white' : 'black'} strokeWidth="2" />
            <path d="M15.2807 103C16.5368 99.8571 17.0393 93.2571 9 92" stroke={isDark ? 'white' : 'black'} />
            <line x1="61.5" y1="25" x2="61.5" y2="103" stroke={isDark ? 'white' : 'black'} strokeDasharray="2 1" />
            <line x1="2.19502" y1="102.456" x2="61.195" y2="22.4067" stroke="#FF0000" strokeWidth="2" />
            <line x1="1" y1="-6" x2="0.999991" y2="209" stroke={isDark ? 'white' : 'black'} strokeWidth="2" />
            <line x1="-108" y1="103" x2="95" y2="103" stroke={isDark ? 'white' : 'black'} strokeWidth="2" />
            <path d="M24 94.0294C24 95.3168 23.7435 96.3015 23.2304 96.9833C22.7174 97.6611 21.9761 98 21.0065 98C20.0543 98 19.3196 97.6671 18.8022 97.0013C18.2848 96.3356 18.0174 95.385 18 94.1497V92.9164C18 91.6451 18.2565 90.6745 18.7696 90.0047C19.2826 89.3349 20.0239 89 20.9935 89C21.9587 89 22.6956 89.3249 23.2043 89.9746C23.7174 90.6243 23.9826 91.5648 24 92.7961V94.0294ZM19.2065 93.0608H22.7869V92.73C22.7869 91.8195 22.6348 91.1237 22.3304 90.6424C22.0304 90.1571 21.5848 89.9144 20.9935 89.9144C20.4109 89.9144 19.9674 90.1571 19.663 90.6424C19.3587 91.1237 19.2065 91.8195 19.2065 92.73V93.0608ZM22.7869 93.9753H19.2065V94.2099C19.2065 95.1283 19.3652 95.8382 19.6826 96.3396C20 96.8409 20.4413 97.0916 21.0065 97.0916C21.5717 97.0916 22.0065 96.8509 22.3109 96.3697C22.6196 95.8884 22.7783 95.1925 22.7869 94.2821V93.9753Z" fill="black" />
            <path d="M31.0928 56.917C31.0283 57.5996 30.7764 58.1328 30.3369 58.5166C29.8975 58.8975 29.313 59.0879 28.5835 59.0879C28.0737 59.0879 27.624 58.9678 27.2344 58.7275C26.8477 58.4844 26.5488 58.1401 26.3379 57.6948C26.127 57.2495 26.0171 56.7324 26.0083 56.1436V55.5459C26.0083 54.9424 26.1152 54.4106 26.3291 53.9507C26.543 53.4907 26.8491 53.1362 27.2476 52.8872C27.6489 52.6382 28.1118 52.5137 28.6362 52.5137C29.3423 52.5137 29.9106 52.7056 30.3413 53.0894C30.772 53.4731 31.0225 54.0151 31.0928 54.7153H29.9854C29.9326 54.2554 29.7979 53.9243 29.5811 53.7222C29.3672 53.5171 29.0522 53.4146 28.6362 53.4146C28.1528 53.4146 27.7808 53.5918 27.52 53.9463C27.2622 54.2979 27.1304 54.8149 27.1245 55.4976V56.0645C27.1245 56.7559 27.2476 57.2832 27.4937 57.6465C27.7427 58.0098 28.106 58.1914 28.5835 58.1914C29.02 58.1914 29.3481 58.0933 29.5679 57.897C29.7876 57.7007 29.9268 57.374 29.9854 56.917H31.0928Z" fill="black" />
            <path d="M64.3115 71V64.6016H66.5044C67.228 64.6016 67.7788 64.7466 68.1567 65.0366C68.5347 65.3267 68.7236 65.7588 68.7236 66.333C68.7236 66.626 68.6445 66.8896 68.4863 67.124C68.3281 67.3584 68.0967 67.54 67.792 67.6689C68.1377 67.7627 68.4043 67.9399 68.5918 68.2007C68.7822 68.4585 68.8774 68.769 68.8774 69.1323C68.8774 69.7329 68.6841 70.1943 68.2974 70.5166C67.9136 70.8389 67.3628 71 66.645 71H64.3115ZM65.4233 68.1128V70.1123H66.6582C67.0068 70.1123 67.2793 70.0259 67.4756 69.853C67.6719 69.6802 67.77 69.4399 67.77 69.1323C67.77 68.4673 67.4302 68.1274 66.7505 68.1128H65.4233ZM65.4233 67.2954H66.5132C66.8589 67.2954 67.1284 67.2178 67.3218 67.0625C67.5181 66.9043 67.6162 66.6816 67.6162 66.3945C67.6162 66.0781 67.5254 65.8496 67.3438 65.709C67.165 65.5684 66.8853 65.498 66.5044 65.498H65.4233V67.2954Z" fill="black" />
            <path d="M42.7349 99.5103H40.2563L39.7378 101H38.582L40.999 94.6016H41.9966L44.418 101H43.2578L42.7349 99.5103ZM40.5684 98.6138H42.4229L41.4956 95.9595L40.5684 98.6138Z" fill="black" />
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="104" height="104" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <figcaption className="mx-auto text-xs w-3/4">Here, <Tex tex="A" />, <Tex tex="B" />, and <Tex tex="C" /> are sides of a triangle formed by our phasor. <Tex tex="\theta" /> is an angle.</figcaption>
      </figure>
      <p>
        We can use algebra and trigonometry to find certain values when given others, which will ultimately give us characteristics of our signal.
      </p>
      <h3>Amplitude</h3>
      <figure className="mb-2">
        <Tex isFigure tex="A(t) = \sqrt {I^2 (t) + Q^2 (t)}" />
        <figcaption className="text-xs mx-auto w-5/6 lg:w-3/4">Where <Tex tex="A(t)" /> is the amplitude of the signal at a point in time, or instantaneous amplitude.</figcaption>
      </figure>
      <p>
        The <a href="https://en.wikipedia.org/wiki/Pythagorean_theorem" target="_blank">Pythagorean Theorem</a> concludes that <Tex tex="A^2 + B^2 = C^2" />. With that in mind, we can get <Tex tex="C" />, the hypotenuse of our triangle above, with just <Tex tex="A" />, on the horizontal axis, and <Tex tex="B" />, on the vertical axis, by rearranging the
        equation into <Tex tex="C = \sqrt {A^2 + B^2}" />. Applying this formula to our signal function with <Tex tex="I(t)" /> being on the horizontal axis and <Tex tex="Q(t)" /> being on the verical axis yields a formula that gives
        us the amplitude of the signal at a certain point in time.
      </p>
      <h3>Phase</h3>
      <figure className="mb-2">
        <Tex isFigure tex="\phi (t) = tan^{-1} \left( \frac {Q(t)} {I(t)}\right)" />
        <figcaption className="text-xs mx-auto w-5/6 lg:w-3/4">Where <Tex tex="\phi(t)" /> is the phase of the signal at a point in time, or instantaneous phase.</figcaption>
      </figure>
      <p>
        In our triangle above, we can get <Tex tex="\theta" /> from <Tex tex="A" /> and <Tex tex="B" /> using <a href="https://www.softschools.com/math/trigonometry/inverse_tangent_function_arctangent" target="_blank">the inverse tangent function</a>. That is, <Tex tex="\theta = tan^{-1} \left( \frac {B} {A} \right)" />.
        Applying this formula to our signal function yields a formula that gives us the phase of the signal at a certain point in time.
      </p>
      <h3>Frequency</h3>
      <figure className="mb-2">
        <Tex isFigure tex="f(t) = \left( \frac {1} {\Delta t} \right) tan^{-1} \left( \frac {I(t) Q(t-1) + Q(t)I(t-1)} {I(t)I(t-1) - Q(t)Q(t-1)} \right)" />
        <figcaption className="text-xs mx-auto w-5/6 lg:w-3/4">Where <Tex tex="f(t)" /> is the frequency at a point in time.</figcaption>
      </figure>
      <p>
        Quite frankly, I'm not going to try and explain this formula. Just know that we can calculate the signal's instantaneous frequency
        by calculating the instantaneous change in the signal's phase.
      </p>
      <h3>But why this way?</h3>
      <p>
        Using this I/Q model in our DSP system gives us a relatively easy way to process signals with low or negative frequencies. In my
        opinion, it also happens to make modeling signal properties easier and more robust, thus making demodulation easier.
      </p>
      <h3>To wrap up</h3>
      <p>
        I hope this made the concept of RF signal demodulation a bit easier to understand. If you have any questions or would like to offer
        ways that I can improve this post, feel free to <a href="https://aunyks.com/contact">contact me</a>.
      </p>
    </Post>
  )
}