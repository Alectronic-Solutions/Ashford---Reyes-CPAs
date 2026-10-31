import { buttonCompactClass } from './Button';

export function Navbar() {
  return (
    <header className="bg-bg">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-4 px-5 py-4 md:gap-6 md:px-8 md:py-5"
      >
        <a
          href="/"
          className="-my-2.5 min-w-0 py-2.5 font-display text-statement font-semibold leading-tight tracking-tight"
        >
          Ashford and Reyes CPAs
        </a>
        <div className="flex shrink-0 items-center gap-8">
          <a
            href="#what-we-do"
            className="-my-3 hidden py-3 text-body font-medium hover:underline sm:inline-block"
          >
            What we do
          </a>
          <a href="#contact" className={buttonCompactClass}>
            Talk to us
          </a>
        </div>
      </nav>
    </header>
  );
}
