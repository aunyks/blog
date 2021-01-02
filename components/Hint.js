export default function Hint({ msg, children }) {
  const onInteraction = e => {
    alert(msg)
    e.preventDefault()
  }
  return (
    <a href="#" className="hint" title={msg} onClick={onInteraction}>
      {children}
    </a>
  )
}