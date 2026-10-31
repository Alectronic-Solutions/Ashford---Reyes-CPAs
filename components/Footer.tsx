export function Footer() {
  return (
    <footer className="bg-ink px-5 pb-8 pt-24 text-bg md:px-8 md:pb-10 md:pt-40">
      <p className="font-display text-display font-semibold">Ashford and Reyes CPAs</p>
      <div className="mt-16 grid gap-10 text-small md:mt-24 md:grid-cols-3 md:gap-8">
        <p className="max-w-[32ch]">
          Tax, bookkeeping, advisory and succession planning in Lodi, California.
        </p>
        <div className="space-y-1">
          <p className="font-medium">Photo and video credits</p>
          <p>
            Video:{' '}
            <a
              href="https://www.pexels.com/@rdne-stock-project/"
              className="underline underline-offset-4 hover:no-underline"
            >
              RDNE Stock project on Pexels
            </a>
          </p>
          <p>The hero still is a frame from that video.</p>
        </div>
        <p className="md:text-right">
          Website by{' '}
          <a
            href="https://alectronicsolutions.com"
            className="underline underline-offset-4 hover:no-underline"
          >
            Alectronic Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}
