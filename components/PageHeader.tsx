import { Rise, RiseGroup } from './Reveal';
import { DepthPhoto } from './Depth';

/**
 * The opening of an inner page: its h1, one sentence, an optional sample-content note, and an optional
 * wide photograph that stands up into place as it scrolls in.
 */
export function PageHeader({
  title,
  lede,
  note,
  photo,
}: {
  title: string;
  lede: string;
  note?: string;
  photo?: { src: string; alt: string; position?: string };
}) {
  return (
    <header className="mx-auto max-w-page px-5 pb-14 pt-16 md:px-8 md:pb-24 md:pt-28">
      <RiseGroup>
        <Rise mask>
          <h1 className="max-w-[14ch] text-display">{title}</h1>
        </Rise>
        <div className="mt-8 grid md:mt-12 md:grid-cols-12 md:gap-8">
          <Rise className="md:col-span-7 md:col-start-6">
            <p className="max-w-[36ch] text-statement">{lede}</p>
            {note && <p className="mt-4 max-w-[46ch] text-small">{note}</p>}
          </Rise>
        </div>
      </RiseGroup>
      {photo && (
        <DepthPhoto
          src={photo.src}
          alt={photo.alt}
          sizes="(min-width: 1504px) 1440px, 100vw"
          priority
          imageClassName={photo.position}
          className="mt-14 h-[44svh] md:mt-24 md:h-[68svh]"
        />
      )}
    </header>
  );
}
