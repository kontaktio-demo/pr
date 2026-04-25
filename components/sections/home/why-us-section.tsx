import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { FadeIn } from '@/components/animations/fade-in';
import {
  ShieldIcon,
  CoachIcon,
  CakeIcon,
  SchoolIcon,
} from '@/components/ui/icons';
import type { ComponentType, SVGProps } from 'react';

type Value = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
  color: string;
};

const values: Value[] = [
  {
    Icon: ShieldIcon,
    title: 'Certyfikowane bezpieczeństwo',
    desc: 'Profesjonalne trampoliny olimpijskie, miękkie krawędzie, regularne przeglądy i animatorzy na każdej strefie.',
    color: 'text-brand',
  },
  {
    Icon: CoachIcon,
    title: 'Trenerzy z licencją',
    desc: 'Zajęcia akrobatyki, fitness i ninja prowadzą certyfikowani instruktorzy z wieloletnim doświadczeniem.',
    color: 'text-teal',
  },
  {
    Icon: CakeIcon,
    title: 'Niezapomniane urodziny',
    desc: 'Dedykowana sala, animator, tort, dekoracje. Pakiety BASIC, PREMIUM i VIP — Ty się bawisz, my robimy resztę.',
    color: 'text-accent',
  },
  {
    Icon: SchoolIcon,
    title: 'Lekcje WF i grupy szkolne',
    desc: 'Specjalne ceny dla szkół (Pon–Pt 10:00–14:00), własna strefa, scenariusze zajęć dostosowane do wieku.',
    color: 'text-brand',
  },
];

/** Asymmetric staircase layout — each card lands at a slightly different
 *  vertical offset so the row feels alive instead of grid-locked. */
const cardOffsets = ['lg:mt-0', 'lg:mt-12', 'lg:-mt-4', 'lg:mt-20'];

export function WhyUsSection() {
  return (
    <section
      aria-labelledby="why-title"
      className="relative overflow-hidden bg-ink py-20 text-white md:py-28"
    >
      {/* Asymmetric glow accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-teal/20 blur-3xl" />
        <span className="absolute right-[10%] top-16 h-24 w-24 rotate-12 rounded-3xl border border-white/10" />
        <span className="absolute left-[8%] bottom-24 h-3 w-3 rounded-full bg-accent" />
      </div>

      <div className="container relative">
        <ScrollReveal>
          <div className="grid items-end gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">
                Dlaczego SALTOS
              </p>
              <h2
                id="why-title"
                className="mt-2 font-display text-4xl font-extrabold leading-[1.05] md:text-5xl lg:text-6xl"
              >
                4 powody, dla których wracają do nas{' '}
                <span className="text-brand">tysiące osób</span>
              </h2>
            </div>
            <div className="md:col-span-5">
              <div className="ml-auto max-w-sm rounded-2xl border-l-4 border-brand bg-ink-light/30 p-5 text-sm text-white/80">
                Bezpieczeństwo, jakość i atmosfera — w każdej strefie i o każdej
                porze dnia.
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, idx) => (
            <FadeIn key={v.title} delay={idx * 0.08}>
              <div
                className={`group relative h-full overflow-hidden rounded-3xl bg-ink-light/40 p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-2 hover:bg-ink-light/60 ${cardOffsets[idx]}`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/[0.04] transition duration-500 group-hover:scale-125"
                />
                <span className="relative inline-flex font-display text-xs font-bold tracking-widest text-white/40">
                  0{idx + 1}
                </span>
                <v.Icon className={`relative mt-3 h-12 w-12 ${v.color}`} />
                <h3 className="relative mt-4 font-display text-lg font-bold">
                  {v.title}
                </h3>
                <p className="relative mt-2 text-sm text-white/75">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <ScrollReveal>
          <figure className="relative mt-20 max-w-2xl rounded-3xl border border-white/15 bg-ink-muted/60 p-8 md:ml-auto md:-rotate-1">
            <span
              aria-hidden="true"
              className="absolute -left-3 -top-3 h-8 w-8 rounded-full bg-brand"
            />
            <blockquote className="font-display text-xl text-white md:text-2xl">
              „Najlepsze urodziny mojego syna! Animator zajął się wszystkim, a my
              mogliśmy spokojnie poskakać razem z dziećmi. Wracamy regularnie.”
            </blockquote>
            <figcaption className="mt-4 text-sm text-white/70">
              — Magda, mama 9-letniego Antka
            </figcaption>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}
