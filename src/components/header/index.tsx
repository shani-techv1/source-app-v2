export default function Header() {
  return (
    <header className={`flex items-center justify-between border-b border-black px-6 py-4`}>

  <div className="flex items-center gap-4">

    <img src="logo.png" alt="Logo" className="w-12 h-12" />
  </div>


  <div className="flex flex-col items-end">

    <h1 className="text-[64px] font-bold leading-none tracking-tight">
      Sourced.
    </h1>


    <nav className="mt-2 space-x-6 text-lg">
      <a href="/about">How it works</a>
      <a href="/work">Company</a>
      <a href="/careers">Legal</a>

    </nav>
  </div>
</header>
  )
}