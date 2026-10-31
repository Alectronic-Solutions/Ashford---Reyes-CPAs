import { buttonClass } from './Button';

export function Navbar() {
  return (
    <header className="bg-bg">
      <nav
        aria-label="Primary"
        className="flex items-center justify-between gap-6 px-5 py-4 md:px-8 md:py-5"
      >
        <a href="/" className="font-display text-statement font-semibold tracking-tight">
          Ashford and Reyes CPAs
        </a>
        <div className="flex items-center gap-8">
          <a href="#what-we-do" className="hidden text-body font-medium hover:underline sm:inline">
            What we do
          </a>
          <a href="#contact" className={`${buttonClass} hidden py-3 md:inline-flex`}>
            Book a consultation
          </a>
        </div>
      </nav>
    </header>
  );
}
