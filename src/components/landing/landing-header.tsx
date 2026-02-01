import Link from "next/link";
import Image from "next/image";

export function LandingHeader() {
  return (
    <header className="border-ink flex h-20 items-stretch border-b-[3px]">
      <Link
        href="/"
        className="font-dela border-ink flex items-center gap-3 border-r-[3px] px-6 text-2xl font-bold tracking-tight uppercase"
      >
        <Image
          src="/tabularis-logo.png"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        Tabularis
      </Link>
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
