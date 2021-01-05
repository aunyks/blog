export default function Hint({ msg, label, children }) {
  const onInteraction = e => {
    alert(msg)
    e.preventDefault()
  }
  return (
    <a href="#" className="hint" title={label || 'See more about this.'} onClick={onInteraction}>
      {children}
    </a>
  )
}