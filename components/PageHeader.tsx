import { Rise, RiseGroup } from './Reveal';

/** The opening of an inner page: its h1, one sentence, and an optional sample-content note. */
export function PageHeader({ title, lede, note }: { title: string; lede: string; note?: string }) {
  return (
    <header className="mx-auto max-w-page px-5 pb-14 pt-16 md:px-8 md:pb-24 md:pt-28">
      <RiseGroup>
        <Rise>
          <h1 className="max-w-[14ch] text-display">{title}</h1>
        </Rise>
        <div className="mt-8 grid md:mt-12 md:grid-cols-12 md:gap-8">
          <Rise className="md:col-span-7 md:col-start-6">
            <p className="max-w-[36ch] text-statement">{lede}</p>
            {note && <p className="mt-4 max-w-[46ch] text-small">{note}</p>}
          </Rise>
        </div>
      </RiseGroup>
    </header>
  );
}
