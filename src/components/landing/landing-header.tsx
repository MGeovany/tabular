import Link from "next/link";
import Image from "next/image";

export function LandingHeader() {
  return (
    <header className="border-ink flex h-16 items-stretch border-b-[3px] md:h-20">
      <Link
        href="/"
        className="font-dela border-ink flex min-w-0 items-center gap-2 border-r-[3px] px-4 text-xl font-bold tracking-tight uppercase md:gap-3 md:px-6 md:text-3xl"
      >
        <Image
          src="/favicon.png"
          alt="tabularis logo"
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 object-contain md:h-12 md:w-12"
        />
        <span className="truncate">Tabularis</span>
      </Link>
      <nav className="ml-auto flex h-full">
        <Link
          href="/pricing"
          className="border-ink hover:bg-ink hover:text-paper flex items-center border-l-[3px] px-4 text-sm font-bold uppercase transition-colors md:px-8"
        >
          Pricing
        </Link>
        <Link
          href="/login"
          className="border-ink hover:bg-ink hover:text-paper flex items-center border-l-[3px] px-4 text-sm font-bold uppercase transition-colors md:px-8"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
