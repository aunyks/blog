
export default function Video({
  src,
  poster,
  children
}) {
  return (
    <>
      <video
        src={src}
        poster={poster}
        preload="auto"
        controls
        className="w-full"
      >
        {children}
      </video>
    </>
  )
}