export default function Navbar() {
  return (
    <div
      id="navbar"
      className="w-full fixed flex flex-row justify-between top-0 py-2 px-3 lg:px-48 z-10">
      <section className="navbar-left">
        <a href="/" className="no-underline" style={{
          fontSize: '1.5em'
        }}>⚡️</a>
      </section>
    </div>
  )
}