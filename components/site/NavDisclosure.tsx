'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

export default function NavDisclosure({
  label,
  current,
  children,
}: {
  label: string;
  current?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="nav-disclosure" ref={ref}>
      <button
        type="button"
        className="nav-disclosure-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        aria-current={current ? 'true' : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <span aria-hidden="true">▾</span>
      </button>
      <div id={panelId} className="nav-panel" hidden={!open} onClick={() => setOpen(false)}>
        {children}
      </div>
    </div>
  );
}
