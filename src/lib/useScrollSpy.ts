import { useEffect, useRef, useState } from 'react';

type Section = { id: string; label: string };

export function useScrollSpy(sections: Section[]) {
  const [active, setActive] = useState(sections[0]?.id ?? '');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.current?.observe(el);
    });
    return () => observer.current?.disconnect();
  }, [sections]);

  return active;
}
