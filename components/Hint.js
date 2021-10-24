import {
  useState
} from 'react'
import Modal from 'components/Modal'

const slugify = str => {
  str = str.replace(/^\s+|\s+$/g, '')

  // Make the string lowercase
  str = str.toLowerCase()

  // Remove accents, swap ñ for n, etc
  var from = 'ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;'
  var to = 'AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  // Remove invalid chars
  str = str.replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '-')
  return str
}

export default function Hint({ msg, label, children }) {
  const [hintActive, setHintActive] = useState(false)
  const onInteraction = e => {
    setHintActive(true)
    e.preventDefault()
  }
  if (!msg) {
    throw new Error('Falsey \'msg\' value given to Hint component. Please provide a non-zero length string')
  }
  return (
    <>
      <Modal
        id={slugify(msg)}
        active={hintActive}
        title="Note"
        onClose={() => {
          setHintActive(false)
        }}>
        <p>
          {msg}
        </p>
      </Modal>
      <a href="#" className="hint" title={label || 'See more about this.'} onClick={onInteraction}>
        {children}
      </a>
    </>
  )
}