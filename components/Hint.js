export default function Hint({ msg, children }) {
  const onInteraction = () => alert(msg)
  return (
    <span className="hint" title={msg} onClick={onInteraction}>
      {children}
    </span>
  )
}