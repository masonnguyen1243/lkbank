import React from 'react';

interface HighlightTextProps {
  text: string;
  highlight: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight }) => {
  const trimmed = highlight.trim();
  if (!trimmed) return <>{text}</>;

  // Escape special regex characters to prevent runtime crashes
  const escaped = trimmed.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  
  // Split the text by match segments and wrap matching parts with <mark> tags
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="sb-hl">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};
