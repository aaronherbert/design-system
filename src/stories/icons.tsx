// Tiny inline icon set used only by the stories (bring your own icon library in apps).
const base = { width: 16, height: 16, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const PlusIcon = () => (
  <svg {...base} aria-hidden="true"><path d="M8 3v10M3 8h10" /></svg>
);
export const ArrowRightIcon = () => (
  <svg {...base} aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);
export const SearchIcon = () => (
  <svg {...base} aria-hidden="true"><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></svg>
);
export const MailIcon = () => (
  <svg {...base} aria-hidden="true"><rect x="2" y="3.5" width="12" height="9" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
);
export const TrashIcon = () => (
  <svg {...base} aria-hidden="true"><path d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5" /></svg>
);
export const HomeIcon = () => (
  <svg {...base} aria-hidden="true"><path d="M2.5 7 8 2.5 13.5 7v6.5h-4v-4h-3v4h-4z" /></svg>
);
export const ChartIcon = () => (
  <svg {...base} aria-hidden="true"><path d="M2.5 13.5h11M4.5 11V8M8 11V4.5M11.5 11V6.5" /></svg>
);
export const UsersIcon = () => (
  <svg {...base} aria-hidden="true"><circle cx="6" cy="5.5" r="2.5" /><path d="M1.5 13.5c.5-2.5 2.3-3.5 4.5-3.5s4 1 4.5 3.5M10.5 3a2.5 2.5 0 0 1 0 5M12.5 10.3c1 .5 1.7 1.6 2 3.2" /></svg>
);
export const SettingsIcon = () => (
  <svg {...base} aria-hidden="true"><circle cx="8" cy="8" r="2" /><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" /></svg>
);
export const WaveLogo = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-grid',
      width: 24,
      height: 24,
      borderRadius: 7,
      backgroundColor: 'var(--ds-color-primary)',
      backgroundImage: 'var(--ds-gradient-primary, none)',
    }}
  >
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M4 14c2.5 0 2.5-3 5-3s2.5 3 5 3 2.5-3 5-3" fill="none" stroke="var(--ds-color-on-primary)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="17.5" cy="7.5" r="1.6" fill="var(--ds-color-accent)" />
    </svg>
  </span>
);
