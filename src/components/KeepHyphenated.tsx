import { Fragment } from 'react';

/**
 * Indonesian copy is full of hyphenated words ("benar-benar", "ke-11", "Kabar-mu"), and browsers
 * may break a line right after the hyphen, splitting the word. This keeps each such word on one
 * line. (The brand face has no non-breaking hyphen glyph, so U+2011 would borrow another font's.)
 */
export function KeepHyphenated({ text }: { text: string }) {
  return text.split(/(\S+-\S+)/).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="nowrap">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
