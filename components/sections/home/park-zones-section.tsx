import Link from 'next/link';
import { parkZones } from '@/content/zones';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { FadeIn } from '@/components/animations/fade-in';
import { ArrowRightIcon, zoneIcons } from '@/components/ui/icons';

const colorMap: Record<string, string> = {
  brand: 'bg-brand text-white',
  accent: 'bg-accent text-white',
  teal: 'bg-teal text-white',
  ink: 'bg-ink text-white',
};

/**
 * "Strefy parku" — asymmetric card grid with custom SVG icons.
 *
 * The 6 zones are laid out on a 12-col grid with mixed column spans so the
 * layout breaks the typical 3×2 monotony: a wide hero card on the left,
 * two stacked cards on the right, then alternating widths in the second row.
 * Each card is offset vertically (`mt-*`) for a magazine-style staircase.
 */
const layout = [
  { col: 'lg:col-span-7', mt: 'lg:mt-0', tilt: '-rotate-1' },
  { col: 'lg:col-span-5', mt: 'lg:mt-12', tilt: 'rotate-1' },
  { col: 'lg:col-span-5', mt: 'lg:-mt-6', tilt: 'rotate-1' },
  { col: 'lg:col-span-7', mt: 'lg:mt-6', tilt: '-rotate-1' },
  { col: 'lg:col-span-7', mt: 'lg:-mt-2', tilt: '-rotate-1' },
  { col: 'lg:col-span-5', mt: 'lg:mt-10', tilt: 'rotate-1' },
];

export function ParkZonesSection() {
  return (
    <section
      id="strefy"
      aria-labelledby="zones-title"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      {/* Asymmetric background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
        <span className="absolute right-[8%] top-32 h-3 w-3 rotate-45 bg-accent" />
        <span className="absolute left-[6%] bottom-40 h-2 w-2 rounded-full bg-brand" />
      </div>

      <div className="container relative">
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-brand">
              Strefy parku
            </p>
            <h2
              id="zones-title"
              className="mt-2 font-display text-4xl font-extrabold text-ink md:text-5xl lg:text-6xl"
            >
              6 stref.
              <br />
              <span className="text-brand">Każda inna.</span>
              <br />
              Wszystkie pełne energii.
            </h2>
            <p className="mt-6 max-w-md text-lg text-ink/70">
              Free Jump, Foam Pit, Dodgeball, Ninja, Pixel Games i strefa dla
              najmłodszych — wybierz swój sposób na wyskok.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-12">
          {parkZones.map((zone, idx) => {
            const Icon = zoneIcons[zone.slug];
            const cfg = layout[idx] ?? layout[0];
            return (
              <FadeIn key={zone.slug} delay={idx * 0.08}>
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl ${cfg.col} ${cfg.mt} ${cfg.tilt}`}
                >
                  <div
                    className={`relative flex h-36 items-center justify-between overflow-hidden px-8 ${colorMap[zone.color]}`}
                  >
                    {/* Decorative offset ring */}
                    <span
                      aria-hidden="true"
                      className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-2 border-white/25"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-8 left-1/2 h-20 w-20 rounded-full bg-white/10"
                    />
                    {Icon ? (
                      <Icon className="relative h-16 w-16 transition duration-500 group-hover:scale-110 group-hover:rotate-6" />
                    ) : null}
                    <span className="relative font-display text-5xl font-extrabold text-white/15">
                      0{idx + 1}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl font-bold text-ink">
                      {zone.name}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-ink/70">
                      {zone.short}
                    </p>
                    <p className="mt-3 flex-1 text-sm text-ink/60">
                      {zone.description}
                    </p>
                    <Link
                      href={`/zajecia#${zone.slug}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand transition group-hover:gap-3"
                    >
                      Zobacz zajęcia w strefie
                      <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
