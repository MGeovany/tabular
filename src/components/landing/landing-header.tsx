import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="border-ink flex h-20 items-stretch border-b-[3px]">
      <div className="font-dela border-ink flex items-center border-r-[3px] px-6 text-2xl font-bold tracking-tight uppercase">
        Tabularis
      </div>
      <nav className="ml-auto flex h-full">
        <Link
          href="/login"
          className="border-ink hover:bg-ink hover:text-paper flex items-center border-l-[3px] px-8 font-bold uppercase transition-colors"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
