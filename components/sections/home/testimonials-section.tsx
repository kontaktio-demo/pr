import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { FadeIn } from '@/components/animations/fade-in';
import { StarIcon } from '@/components/ui/icons';

const testimonials = [
  {
    name: 'Karolina',
    role: 'mama dwójki',
    text: 'Dzieci uwielbiają Pixel Games, a my mamy chwilę dla siebie w strefie fitness. Idealne miejsce dla całej rodziny!',
    rating: 5,
  },
  {
    name: 'Tomek',
    role: 'trener osiedlowej drużyny',
    text: 'Trampoline Dodgeball to nasza cotygodniowa tradycja. Świetna ekipa, profesjonalny sprzęt, jasne zasady.',
    rating: 5,
  },
  {
    name: 'Ola',
    role: 'studentka, karnet 10 wejść',
    text: 'Skaczę 2× w tygodniu po pracy. Lepsze niż siłownia — kardio, śmiech i wracam z głową na plus.',
    rating: 5,
  },
];

/** Tilt + vertical offset per testimonial card; cycles via modulo. */
const testimonialOffsets = [
  'md:mt-0 md:-rotate-1',
  'md:mt-10 md:rotate-1',
  'md:mt-2 md:-rotate-1',
];

/**
 * Sekcja opinii — proste karty (na MVP). W przyszłości można podpiąć
 * Google Reviews API lub feed z Supabase.
 */
export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="relative overflow-hidden bg-white py-20 md:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-[5%] top-12 h-48 w-48 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute left-[10%] bottom-10 h-56 w-56 rounded-full bg-teal/10 blur-3xl" />
      </div>

      <div className="container relative">
        <ScrollReveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-bold uppercase tracking-widest text-brand">
                Opinie
              </p>
              <h2
                id="testimonials-title"
                className="mt-2 font-display text-4xl font-extrabold text-ink md:text-5xl lg:text-6xl"
              >
                Tak mówią o nas goście
              </h2>
            </div>
            <div className="flex items-center gap-1 text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-5 w-5" />
              ))}
              <span className="ml-2 text-sm font-bold text-ink">
                4.9/5 · ponad 1200 opinii
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => {
            const offset = testimonialOffsets[idx % testimonialOffsets.length];
            return (
              <FadeIn key={t.name} delay={idx * 0.1}>
                <figure
                  className={`group relative h-full rounded-3xl border border-ink/10 bg-white p-6 shadow-sm transition duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl ${offset}`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-2 -top-3 font-display text-6xl font-extrabold leading-none text-brand/15"
                  >
                    “
                  </span>
                  <div className="relative flex gap-0.5 text-brand" aria-label={`${t.rating} z 5 gwiazdek`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="relative mt-4 text-base text-ink/85">
                    „{t.text}"
                  </blockquote>
                  <figcaption className="relative mt-4 flex items-center gap-3 text-sm font-bold text-ink">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 font-display text-base text-brand">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      {t.name}
                      <span className="block text-xs font-normal text-ink/60">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
