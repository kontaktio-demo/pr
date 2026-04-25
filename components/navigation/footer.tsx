import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { footerNav } from '@/config/navigation';
import { SaltosLogo } from '@/components/ui/saltos-logo';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import { JumpIcon, PhoneIcon, PinIcon, socialIcons } from '@/components/ui/icons';

/**
 * Footer + pasek kontaktowy w granacie.
 *  - Pasek na samej górze: nazwa parku, adres, godziny, e-mail, telefon, CTA
 *  - Główny footer z linkami i custom social icons (Instagram/Facebook/TikTok/YouTube)
 *  - Subtelne reveal-on-scroll całych grup linków
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      {/* Decorative blob accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />
      </div>

      {/* Pasek kontaktowy (górna część footera) */}
      <div className="relative border-b border-white/10">
        <div className="container grid items-center gap-6 py-6 lg:grid-cols-6 lg:gap-4">
          <div className="lg:col-span-2">
            <p className="font-display text-base font-bold uppercase tracking-wide">
              SALTOS Srebrzyńska <span className="text-brand">POLESIE</span>
            </p>
          </div>
          <div className="text-sm text-white/85">
            <p className="flex items-start gap-2 font-medium">
              <PinIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
              <span>
                {siteConfig.contact.address.street}
                <span className="block font-normal text-white/70">
                  {siteConfig.contact.address.postalCode} {siteConfig.contact.address.city}
                </span>
              </span>
            </p>
          </div>
          <div className="text-sm text-white/85">
            <p>{siteConfig.contact.hours.weekdays}</p>
            <p>{siteConfig.contact.hours.weekend}</p>
          </div>
          <div className="text-sm text-white/85">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="block font-medium hover:text-white"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
          <div className="flex gap-3 lg:justify-end">
            <Link
              href="/rejestracja"
              className="rounded-full border-2 border-white px-5 py-2 text-sm font-bold uppercase tracking-wide transition hover:bg-white hover:text-ink"
            >
              rejestracja
            </Link>
            <Link
              href="/rezerwacje"
              className="rounded-full bg-brand px-5 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark"
            >
              kup bilet
            </Link>
          </div>
        </div>
      </div>

      {/* Główny footer */}
      <ScrollReveal>
        <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <SaltosLogo className="h-9 w-9 text-white" />
              <span className="font-display text-xl font-bold tracking-wide">
                SALTOS
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {Object.entries(siteConfig.social).map(([name, url]) => {
                const Icon = socialIcons[name];
                if (!Icon) return null;
                return (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 font-semibold uppercase tracking-wide text-white">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center text-sm text-white/70 transition hover:text-white"
                    >
                      <span className="mr-0 h-px w-0 bg-brand transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <div className="relative border-t border-white/10 py-6">
        <div className="container flex flex-col items-center justify-between gap-2 text-center text-xs text-white/60 md:flex-row md:text-left">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Wszystkie prawa zastrzeżone.
          </p>
          <p className="flex items-center gap-2">
            Zaprojektowane z myślą o bezpieczeństwie i dobrej zabawie
            <JumpIcon className="h-4 w-4 text-brand" />
          </p>
        </div>
      </div>
    </footer>
  );
}
