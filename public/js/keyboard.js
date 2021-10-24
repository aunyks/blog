window.onload = () => {
  const synth = new Tone.AMSynth().toMaster()
  const noteMap = [
    { 'class': 'a3', 'note': 'A3' },
    { 'class': 'a-sh3', 'note': 'A#3' },
    { 'class': 'b3', 'note': 'B3' },
    { 'class': 'c4', 'note': 'C4' },
    { 'class': 'c-sh4', 'note': 'C#4' },
    { 'class': 'd4', 'note': 'D4' },
    { 'class': 'd-sh4', 'note': 'D#4' },
    { 'class': 'e4', 'note': 'E4' },
    { 'class': 'f4', 'note': 'F4' },
    { 'class': 'f-sh4', 'note': 'F#4' },
    { 'class': 'g4', 'note': 'G4' },
    { 'class': 'g-sh4', 'note': 'G#4' },
    { 'class': 'a4', 'note': 'A4' },
    { 'class': 'a-sh4', 'note': 'A#4' },
    { 'class': 'b4', 'note': 'B4' },
    { 'class': 'c5', 'note': 'C5' },
    { 'class': 'c-sh5', 'note': 'C#5' },
    { 'class': 'd5', 'note': 'D5' },
    { 'class': 'd-sh5', 'note': 'D#5' },
    { 'class': 'e5', 'note': 'E5' }
  ]

  noteMap.forEach(k => {
    Array.from(document.getElementsByClassName(k['class'])).forEach(c => {
      c.addEventListener('mousedown', () => {
        synth.triggerAttack(k['note'])
        c.classList.add('pressed')
      })

      c.addEventListener('mouseup', () => {
        synth.triggerRelease()
        c.classList.remove('pressed')
      })

      c.addEventListener('touchstart', () => {
        synth.triggerAttack(k['note'])
        c.classList.add('pressed')
      })

      c.addEventListener('touchend', () => {
        synth.triggerRelease()
        c.classList.remove('pressed')
      })
    })
  })

  window.playMelody = notes => {
    const synthPart = new Tone.Sequence(
      function (time, note) {
        synth.triggerAttackRelease(note, '8n', time);
      },
      notes,
      '4n'
    )
    synthPart.loop = 1
    synthPart.start()
    Tone.Transport.start()
  }
}