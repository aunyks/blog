export default function Hint({ msg, children }) {
  const onInteraction = () => alert(msg)
  return (
    <span className="hint" onClick={onInteraction}>
      {children}
    </span>
  )
}