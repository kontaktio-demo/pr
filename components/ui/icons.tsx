/**
 * Saltos icon set — line-style SVG glyphs used across the site instead of
 * emoji. All icons inherit `currentColor`, accept any `className` for sizing,
 * and are tree-shake friendly (one named export each).
 *
 * Conventions:
 *  - 24x24 viewBox
 *  - 1.75 stroke width
 *  - rounded line caps/joins
 *  - decorative by default (`aria-hidden`); pass `aria-label` to expose
 */

import * as React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { title?: string };

function Svg({ children, title, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* ---------- Park zones ---------- */

export const JumpIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="4.5" r="1.6" />
    <path d="M9 9.5l3-2 3 2-1.5 4 2 6" />
    <path d="M10.5 13.5L8 19" />
    <path d="M5 21h14" />
  </Svg>
);

export const FoamIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 14c1.5 0 1.5-1.4 3-1.4S7.5 14 9 14s1.5-1.4 3-1.4S13.5 14 15 14s1.5-1.4 3-1.4S19.5 14 21 14" />
    <path d="M3 18c1.5 0 1.5-1.4 3-1.4S7.5 18 9 18s1.5-1.4 3-1.4S13.5 18 15 18s1.5-1.4 3-1.4S19.5 18 21 18" />
    <circle cx="8" cy="7" r="1.4" />
    <circle cx="13" cy="5.5" r="1.4" />
    <circle cx="17" cy="8" r="1.4" />
  </Svg>
);

export const DodgeballIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </Svg>
);

export const NinjaIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 14c1-4 4-7 8-7s7 3 8 7" />
    <path d="M3 14h18" />
    <path d="M7 14v2.5M12 14v3M17 14v2.5" />
    <path d="M9 11.5h6" />
  </Svg>
);

export const PixelIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.2" />
    <rect x="14" y="3" width="7" height="7" rx="1.2" />
    <rect x="3" y="14" width="7" height="7" rx="1.2" />
    <rect x="14" y="14" width="7" height="7" rx="1.2" fill="currentColor" stroke="none" />
  </Svg>
);

export const KidsIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="7" r="3.2" />
    <circle cx="7.5" cy="6" r="1.4" />
    <circle cx="16.5" cy="6" r="1.4" />
    <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" />
  </Svg>
);

/* ---------- Value props ---------- */

export const ShieldIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);

export const CoachIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="6.5" r="2.8" />
    <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
    <path d="M16 11l3-1.5M19 9.5V7" />
  </Svg>
);

export const CakeIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 20h16v-6H4z" />
    <path d="M4 17c1.5 0 1.5-1.5 3-1.5s1.5 1.5 3 1.5 1.5-1.5 3-1.5 1.5 1.5 3 1.5 1.5-1.5 3-1.5" />
    <path d="M8 11V8M12 11V7M16 11V8" />
    <circle cx="8" cy="6" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="12" cy="5" r="0.8" fill="currentColor" stroke="none" />
    <circle cx="16" cy="6" r="0.8" fill="currentColor" stroke="none" />
  </Svg>
);

export const SchoolIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 9l9-4 9 4-9 4-9-4z" />
    <path d="M7 11v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4" />
    <path d="M21 9v5" />
  </Svg>
);

/* ---------- Utility / inline ---------- */

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

export const PinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z" />
  </Svg>
);

export const StarIcon = (p: IconProps) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M12 2.5l2.9 6 6.6.6-5 4.5 1.5 6.5-6-3.5-6 3.5L7.5 13.6l-5-4.5 6.6-.6z" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12.5l4 4 10-10" />
  </Svg>
);

export const WarningIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l10 18H2L12 3z" />
    <path d="M12 10v5" />
    <circle cx="12" cy="18" r="0.9" fill="currentColor" stroke="none" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);

/* ---------- Lookup for park zones by slug ---------- */

export const zoneIcons: Record<string, React.ComponentType<IconProps>> = {
  'free-jump': JumpIcon,
  'foam-pit': FoamIcon,
  dodgeball: DodgeballIcon,
  ninja: NinjaIcon,
  'pixel-games': PixelIcon,
  kids: KidsIcon,
};
