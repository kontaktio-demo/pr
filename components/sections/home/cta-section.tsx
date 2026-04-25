import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { MagneticButton } from '@/components/animations/magnetic-button';
import { PinIcon, PhoneIcon } from '@/components/ui/icons';

/**
 * Końcowe CTA na home — duże pomarańczowe wezwanie do akcji.
 */
export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="bg-brand py-20 text-white md:py-28"
    >
      <div className="container text-center">
        <ScrollReveal>
          <h2
            id="cta-title"
            className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight md:text-6xl"
          >
            Gotowy na pierwszy wyskok?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/95">
            Kup bilet online i miej pewne miejsce. Pierwsza wizyta zwykle kończy
            się drugą — sprawdź sam.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MagneticButton>
              <Link
                href="/rezerwacje"
                className="inline-block rounded-full bg-ink px-8 py-4 text-base font-bold uppercase tracking-wide text-white shadow-lg transition hover:bg-ink-muted"
              >
                Kup bilet online
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/urodziny"
                className="inline-block rounded-full border-2 border-white px-8 py-4 text-base font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-brand"
              >
                Zarezerwuj urodziny
              </Link>
            </MagneticButton>
          </div>
          <p className="mt-8 text-sm text-white/85">
            <PinIcon className="mr-1 inline-block h-4 w-4 -translate-y-0.5" />{' '}
            {siteConfig.contact.address.street},{' '}
            {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
            {' • '}
            <PhoneIcon className="mr-1 inline-block h-4 w-4 -translate-y-0.5" />{' '}
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="underline hover:no-underline"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
