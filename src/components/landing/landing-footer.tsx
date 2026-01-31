export function LandingFooter() {
  return (
    <footer className="border-ink mt-auto flex flex-wrap items-end justify-between border-t-[3px] p-8">
      <div className="flex flex-col gap-2 text-xs font-bold uppercase">
        <span>© Tabularis</span>
        <span className="opacity-80">Privacy / Terms</span>
      </div>
      <div className="border-ink mt-4 flex h-12 w-12 items-center justify-center rounded-full border-2 md:mt-0">
        <div className="bg-ink h-4 w-4 rounded-sm" />
      </div>
    </footer>
  );
}
