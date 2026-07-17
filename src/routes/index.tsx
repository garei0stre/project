import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { Phone, MapPin, Clock, Star, Wrench, Droplets, Flame, Send, CheckCircle2, Sparkles } from "lucide-react";
import logoAsset from "@/assets/lsz-logo.webp.asset.json";
import heroImg from "@/assets/hero.jpg";
import bath1 from "@/assets/bathroom-1.jpg";
import bath2 from "@/assets/bathroom-2.jpg";
import bath3 from "@/assets/bathroom-3.jpg";
import bath4 from "@/assets/bathroom-4.jpg";
import bath5 from "@/assets/bathroom-5.jpg";
import bath6 from "@/assets/bathroom-6.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:image", content: "https://lszplomberie.fr/og.jpg" },
    ],
  }),
});

const PHONE = "06 32 71 33 54";
const PHONE_TEL = "+33632713354";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={visible ? "animate-fade-up" : "opacity-0"}
    >
      {children}
    </div>
  );
}

function Index() {
  const [sent, setSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    (e.currentTarget as HTMLFormElement).reset();
  };

  const services = [
    {
      icon: Sparkles,
      title: "Rénovation salle de bain",
      desc: "Conception clé en main, douche à l'italienne, robinetterie haut de gamme, éclairage LED.",
      features: ["Conception 3D", "Douche italienne", "Robinetterie premium"],
    },
    {
      icon: Wrench,
      title: "Dépannage urgent",
      desc: "Recherche de fuite, débouchage, réparation de chauffe-eau. Intervention rapide.",
      features: ["Recherche de fuite", "Débouchage", "Chauffe-eau"],
    },
    {
      icon: Flame,
      title: "Plomberie & Chauffage",
      desc: "Installation, entretien et mise aux normes de vos équipements de plomberie et chauffage.",
      features: ["Installation", "Entretien annuel", "Mise aux normes"],
    },
  ];

  const gallery = [bath1, bath2, bath3, bath4, bath5, bath6];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-3 min-w-0">
            <img
              src={logoAsset.url}
              alt="LSZ Plomberie logo"
              width={48}
              height={48}
              className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-white/95 p-1 shadow-card shrink-0"
            />
            <div className="min-w-0 hidden sm:block">
              <div className="font-display text-lg leading-tight tracking-tight">LSZ Plomberie</div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-[0.2em]">Voiron · 38500</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#services" className="hover:text-foreground transition">Services</a>
            <a href="#realisations" className="hover:text-foreground transition">Réalisations</a>
            <a href="#contact" className="hover:text-foreground transition">Contact</a>
          </nav>
          <a
            href={`tel:${PHONE_TEL}`}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 sm:px-5 py-2.5 text-primary-foreground text-sm font-semibold shadow-glow transition hover:scale-[1.03] active:scale-95"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Appeler</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-[100svh] flex items-center pt-24 pb-20 bg-hero-gradient">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Salle de bain moderne anthracite LSZ Plomberie Voiron"
            width={1920}
            height={1200}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 w-full">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-primary mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-glow-pulse" />
                Artisan plombier · Voiron
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">
                Plombier chauffagiste
                <span className="block text-gradient-gold">& rénovation</span>
                <span className="block text-muted-foreground text-3xl sm:text-4xl md:text-5xl mt-2">
                  de salles de bains à Voiron
                </span>
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Un savoir-faire artisanal pour des salles de bains contemporaines, un dépannage rapide et une plomberie irréprochable.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href={`tel:${PHONE_TEL}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-primary-foreground font-semibold shadow-glow transition hover:scale-[1.03] active:scale-95"
                >
                  <Phone className="h-5 w-5" />
                  Appeler le {PHONE}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur px-6 py-3.5 font-semibold hover:bg-card transition"
                >
                  Demander un devis
                </a>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <TrustBadge className="mt-10" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Nos services</div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
                Un artisan, <span className="text-gradient-gold">trois expertises</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                De la rénovation complète au dépannage express, LSZ Plomberie intervient à Voiron et dans tout le Pays Voironnais.
              </p>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <article className="group relative h-full rounded-2xl border border-border bg-card p-8 shadow-card transition duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <s.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                  <ul className="mt-6 space-y-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Realisations */}
      <section id="realisations" className="py-24 sm:py-32 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Réalisations</div>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
                  Des salles de bains <span className="text-gradient-gold">signature</span>
                </h2>
              </div>
              <p className="text-muted-foreground max-w-sm">
                Miroirs LED rétroéclairés, vasques minimalistes, douches à l'italienne — chaque projet est pensé sur mesure.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:gap-5 grid-cols-2 lg:grid-cols-3">
            {gallery.map((img, i) => (
              <Reveal key={i} delay={i * 80}>
                <div
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card ${
                    i === 0 ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`Réalisation LSZ Plomberie ${i + 1}`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className={`w-full ${i === 0 ? "aspect-square lg:aspect-[4/5]" : "aspect-square"} object-cover transition duration-700 group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Contact</div>
                <h2 className="font-display text-4xl sm:text-5xl font-semibold leading-tight">
                  Parlons de <span className="text-gradient-gold">votre projet</span>
                </h2>
                <p className="mt-4 text-muted-foreground max-w-lg">
                  Devis gratuit sous 24h. Appelez-nous ou remplissez le formulaire — nous revenons vers vous rapidement.
                </p>

                <div className="mt-10 space-y-6">
                  <InfoRow icon={Phone} label="Téléphone" value={PHONE} href={`tel:${PHONE_TEL}`} />
                  <InfoRow icon={MapPin} label="Atelier" value="7 Chemin de la Croix Rousse, 38500 Voiron" />
                  <InfoRow
                    icon={Clock}
                    label="Horaires atelier"
                    value={
                      <>
                        Lun – Ven : 8h00 – 18h00
                        <br />
                        Sam : 9h00 – 12h00
                        <br />
                        <span className="text-primary">Urgences 7j/7 par téléphone</span>
                      </>
                    }
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-elegant"
              >
                <h3 className="font-display text-2xl font-semibold mb-6">Demande de devis rapide</h3>

                <div className="space-y-5">
                  <Field label="Nom">
                    <input
                      required
                      maxLength={100}
                      type="text"
                      name="name"
                      className="w-full rounded-lg border border-input bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      placeholder="Votre nom"
                    />
                  </Field>
                  <Field label="Téléphone">
                    <input
                      required
                      maxLength={20}
                      type="tel"
                      name="phone"
                      className="w-full rounded-lg border border-input bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      placeholder="06 XX XX XX XX"
                    />
                  </Field>
                  <Field label="Votre message">
                    <textarea
                      required
                      maxLength={1000}
                      rows={4}
                      name="message"
                      className="w-full rounded-lg border border-input bg-background/50 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                      placeholder="Décrivez brièvement votre projet ou votre urgence…"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-primary-foreground font-semibold shadow-glow transition hover:scale-[1.02] active:scale-95"
                  >
                    {sent ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Message envoyé
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Envoyer ma demande
                      </>
                    )}
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Vos données ne sont utilisées que pour vous recontacter.
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="LSZ Plomberie" width={32} height={32} className="h-8 w-8 rounded-full bg-white/95 p-0.5" />
            <span>© {new Date().getFullYear()} LSZ Plomberie — Voiron</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-primary" />
            Artisan plombier chauffagiste
          </div>
        </div>
      </footer>

      {/* Mobile sticky call */}
      <a
        href={`tel:${PHONE_TEL}`}
        className="lg:hidden fixed bottom-4 inset-x-4 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-primary-foreground font-bold shadow-glow animate-glow-pulse"
      >
        <Phone className="h-5 w-5" />
        Appeler maintenant
      </a>
    </div>
  );
}

function TrustBadge({ className = "" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-4 rounded-2xl border border-border bg-card/60 backdrop-blur px-5 py-4 shadow-card ${className}`}>
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-5 w-5 fill-[color:var(--gold)] text-[color:var(--gold)]" />
        ))}
      </div>
      <div className="text-sm leading-tight">
        <div className="font-semibold">
          <span className="text-gradient-gold">5,0 / 5</span> sur Google
        </div>
        <div className="text-muted-foreground text-xs">29 avis clients vérifiés</div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const Content = (
    <div className="flex items-start gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="mt-1 text-foreground leading-relaxed">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:text-primary transition">
      {Content}
    </a>
  ) : (
    Content
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
