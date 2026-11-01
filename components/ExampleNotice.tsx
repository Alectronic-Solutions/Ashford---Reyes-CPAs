'use client';

import { forwardRef, useId, useImperativeHandle, useRef } from 'react';
import { buttonClass } from './Button';

export type ExampleNoticeHandle = { open: () => void };

/**
 * Shown in place of a real send while site.formsLive is false. A native dialog keeps
 * focus inside, closes on Escape, and hands focus back to the submit button afterwards.
 */
export const ExampleNotice = forwardRef<ExampleNoticeHandle, { onClose?: () => void }>(function ExampleNotice(
  { onClose },
  ref,
) {
  const dialog = useRef<HTMLDialogElement>(null);
  // Contact and the footer signup each render a notice, so the ids must be unique per instance.
  const uid = useId();
  const titleId = `${uid}-title`;
  const textId = `${uid}-text`;
  useImperativeHandle(ref, () => ({ open: () => dialog.current?.showModal() }));

  return (
    <dialog
      ref={dialog}
      aria-labelledby={titleId}
      aria-describedby={textId}
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === dialog.current) dialog.current.close();
      }}
      className="m-auto w-[calc(100%-2.5rem)] max-w-lg overflow-hidden rounded-3xl bg-bg p-0 text-ink shadow-lift backdrop:bg-ink/70"
    >
      <div className="p-6 md:p-10">
        <h2 id={titleId} className="font-display text-h3">
          Nothing was sent
        </h2>
        <p id={textId} className="mt-4">
          This is an example site for a fictional firm, so forms are switched off. Your message did not leave this
          page and nobody will reply to it.
        </p>
        <form method="dialog" className="mt-8">
          <button type="submit" className={buttonClass} autoFocus>
            Got it
          </button>
        </form>
      </div>
    </dialog>
  );
});
