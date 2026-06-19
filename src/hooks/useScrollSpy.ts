import { useState, useEffect } from 'react';

/**
 * Custom hook to monitor scroll position and highlight the active section ID.
 * @param ids Array of section IDs to monitor.
 * @param offset Pixel offset from top of the page (e.g. header height).
 */
export function useScrollSpy(ids: string[], offset: number = 80): string {
  const [activeId, setActiveId] = useState<string>('intro');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY + offset;
      let currentActive = 'intro';

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          if (el.offsetTop <= y) {
            currentActive = id;
          }
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ids, offset]);

  return activeId;
}
