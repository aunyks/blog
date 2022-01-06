export default function Diagram({ alt, children }) {
  return (
    <>
      <style jsx>{`
      p {
        clip: rect(0 0 0 0);
        clip-path: ;inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        whiteSpace: nowrap;
        width: 1px;
      }

      .mermaid > svg {
        margin: auto;
        max-width: 100% !important;
        max-height: 100% !important;
      }
      `}</style>
      <div
        aria-hidden="true"
        className="mermaid max-w-full overflow-x-scroll"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: children.trim() }}></div>
      {/* 
      Hidden visually but still accessible
      to screen readers 
      */}
      {alt && <p>{alt}</p>}
    </>
  )
}
