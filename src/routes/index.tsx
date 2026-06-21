import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroImg from "@/assets/nova-hero.jpg";
import linenImg from "@/assets/nova-linen.jpg";
import coastalImg from "@/assets/nova-coastal.jpg";
import businessImg from "@/assets/nova-business.jpg";
import eveningImg from "@/assets/nova-evening.jpg";
import ctaImg from "@/assets/nova-cta.jpg";
import limitedImg from "@/assets/nova-limited.jpg";
import catCamisas from "@/assets/cat-camisas.jpg";
import catPolos from "@/assets/cat-polos.jpg";
import catPantalones from "@/assets/cat-pantalones.jpg";
import catBlazers from "@/assets/cat-blazers.jpg";
import catCalzado from "@/assets/cat-calzado.jpg";
import catAccesorios from "@/assets/cat-accesorios.jpg";

const WHATSAPP_URL = "https://wa.me/5491100000000?text=Hola%20NOVA%2C%20me%20interesa%20conocer%20la%20colecci%C3%B3n";

export const Route = createFileRoute("/")({
  component: NovaLanding,
});

// --- Reveal on scroll ---
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

// --- Nav ---
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[color:var(--cream)]/90 backdrop-blur-md border-b hairline" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="font-serif text-2xl tracking-[0.18em] text-[color:var(--ink)]">
          NOVA
        </a>
        <nav className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-editorial text-[color:var(--ink)]/80 md:flex">
          <a href="#colecciones" className="nova-link">Colecciones</a>
          <a href="#categorias" className="nova-link">Categorías</a>
          <a href="#nosotros" className="nova-link">Nosotros</a>
          <a href="#faq" className="nova-link">FAQ</a>
        </nav>
        <a href="#colecciones" className="hidden text-[11px] font-semibold uppercase tracking-editorial text-[color:var(--ink)] md:inline-flex">
          Comprar
          <span className="ml-2">→</span>
        </a>
      </div>
    </header>
  );
}

// --- Hero ---
function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Hombre elegante caminando frente al mar Mediterráneo con camisa de lino"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/30 via-[#1A1A1A]/10 to-[#1A1A1A]/55" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex-1" />
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-10 md:pb-28">
          <Reveal>
            <p className="mb-6 text-[11px] font-medium uppercase tracking-luxury text-[color:var(--cream)]/80">
              NOVA — Maison de Elegancia Atemporal
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="max-w-4xl font-serif text-[44px] leading-[1.05] text-[color:var(--cream)] md:text-[76px] lg:text-[88px]">
              Elegancia que Habla<br />
              <span className="italic font-light">Sin Decir una Palabra.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[color:var(--cream)]/85 md:text-lg">
              Prendas diseñadas para hombres que entienden que el verdadero lujo está en los detalles.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#colecciones" className="btn-nova btn-nova-primary">Descubrir Colección</a>
              <a href="#colecciones" className="btn-nova btn-nova-light">Ver Nuevos Lanzamientos</a>
            </div>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-3 text-[11px] uppercase tracking-editorial text-[color:var(--cream)]/75">
              <span className="flex items-center gap-2"><Dot /> Calidad Premium</span>
              <span className="flex items-center gap-2"><Dot /> Envíos a Todo Brasil</span>
              <span className="flex items-center gap-2"><Dot /> Cambios Garantizados</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="inline-block h-[6px] w-[6px] rounded-full bg-[color:var(--sand)]" />;
}

// --- Marquee strip ---
function Marquee() {
  const items = ["Loro Piana DNA", "Quiet Luxury", "Crafted in Italy", "Old Money", "Coastal Elegance", "Edición Limitada"];
  return (
    <div className="border-y hairline bg-[color:var(--cream)] py-5 overflow-hidden">
      <div className="flex animate-[marquee_38s_linear_infinite] gap-16 whitespace-nowrap text-[11px] uppercase tracking-luxury text-[color:var(--cocoa)]">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="flex items-center gap-16">
            {it}
            <span className="text-[color:var(--bronze)]">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}

// --- Benefits ---
const BENEFITS = [
  { t: "Materiales Premium", d: "Seleccionamos tejidos de alta calidad para garantizar elegancia y durabilidad en cada prenda.", icon: IconLeaf },
  { t: "Diseño Atemporal", d: "Piezas que trascienden tendencias. Pensadas para vestirte hoy y dentro de una década.", icon: IconCompass },
  { t: "Confort Absoluto", d: "Lujo que se siente desde el primer uso. Patrones cuidados al milímetro.", icon: IconFeather },
  { t: "Detalles Exclusivos", d: "Acabados cuidados en cada costura. La diferencia que solo se nota de cerca.", icon: IconDiamond },
];

function Benefits() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <Reveal className="mb-20 max-w-2xl">
        <p className="mb-5 text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">— Filosofía</p>
        <h2 className="font-serif text-[34px] leading-[1.1] text-[color:var(--ink)] md:text-[54px]">
          Creado para Hombres que<br />
          <span className="italic font-light">Valoran la Diferencia.</span>
        </h2>
      </Reveal>
      <div className="grid gap-px bg-[color:var(--border)] md:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.t} delay={i * 100}>
            <div className="group h-full bg-[color:var(--cream)] p-8 transition-colors duration-500 hover:bg-[color:var(--card)] md:p-10">
              <b.icon />
              <h3 className="mt-8 font-serif text-2xl text-[color:var(--ink)]">{b.t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)]">{b.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function IconLeaf() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[color:var(--cocoa)]">
      <path d="M3 21c0-9 6-15 18-18-1 12-7 18-18 18Z" />
      <path d="M3 21 14 10" />
    </svg>
  );
}
function IconCompass() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[color:var(--cocoa)]">
      <circle cx="12" cy="12" r="10" />
      <path d="m16 8-5 3-3 5 5-3 3-5Z" />
    </svg>
  );
}
function IconFeather() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[color:var(--cocoa)]">
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76Z" />
      <path d="M16 8 2 22M17.5 15H9" />
    </svg>
  );
}
function IconDiamond() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[color:var(--cocoa)]">
      <path d="M6 3h12l4 6-10 12L2 9l4-6Z" />
      <path d="M2 9h20M12 3v18" />
    </svg>
  );
}

// --- Collections ---
const COLLECTIONS = [
  { name: "Colección Lino", desc: "Tejidos respirables para el verano mediterráneo.", img: linenImg, tag: "Edición Verano" },
  { name: "Colección Coastal", desc: "Inspirada en las costas italianas y el sol dorado.", img: coastalImg, tag: "Atemporal" },
  { name: "Colección Business", desc: "Sastrería contemporánea para el hombre moderno.", img: businessImg, tag: "Sastrería" },
  { name: "Colección Evening", desc: "Elegancia nocturna con acabados refinados.", img: eveningImg, tag: "Black Tie" },
];

function Collections() {
  return (
    <section id="colecciones" className="bg-[color:var(--card)] py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">— Colecciones Destacadas</p>
            <h2 className="font-serif text-[34px] leading-[1.1] text-[color:var(--ink)] md:text-[54px]">
              Cuatro Universos.<br />
              <span className="italic font-light">Un Solo Estilo.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[color:var(--muted-foreground)]">
            Cada colección NOVA es una conversación silenciosa entre el material, el corte y la luz del Mediterráneo.
          </p>
        </Reveal>

        <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.name} delay={i * 120}>
              <a href="#" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--muted)]">
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="image-hover h-full w-full object-cover"
                  />
                  <span className="absolute left-5 top-5 bg-[color:var(--cream)]/90 px-3 py-1 text-[10px] uppercase tracking-luxury text-[color:var(--cocoa)] backdrop-blur-sm">
                    {c.tag}
                  </span>
                </div>
                <div className="mt-6 flex items-end justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[color:var(--ink)] md:text-3xl">{c.name}</h3>
                    <p className="mt-2 max-w-md text-sm text-[color:var(--muted-foreground)]">{c.desc}</p>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-editorial text-[color:var(--cocoa)] nova-link">
                    Explorar →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Categories ---
const CATEGORIES = [
  { name: "Camisas", img: catCamisas },
  { name: "Polos", img: catPolos },
  { name: "Pantalones", img: catPantalones },
  { name: "Blazers", img: catBlazers },
  { name: "Calzado", img: catCalzado },
  { name: "Accesorios", img: catAccesorios },
];

function Categories() {
  return (
    <section id="categorias" className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <Reveal className="mb-16 max-w-2xl">
        <p className="mb-5 text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">— Categorías</p>
        <h2 className="font-serif text-[34px] leading-[1.1] text-[color:var(--ink)] md:text-[54px]">
          Compra por <span className="italic font-light">Categoría.</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 gap-px bg-[color:var(--border)] md:grid-cols-3">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.name} delay={i * 60}>
            <a
              href="#"
              className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden bg-[color:var(--cream)] p-6 md:p-8"
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/75 via-[#1A1A1A]/15 to-transparent transition-opacity duration-500 group-hover:from-[#1A1A1A]/85" />
              <span className="relative text-[11px] uppercase tracking-editorial text-[color:var(--cream)]/85">0{i + 1}</span>
              <div className="relative">
                <h3 className="font-serif text-3xl text-[color:var(--cream)] md:text-4xl">{c.name}</h3>
                <span className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial text-[color:var(--sand)] transition-all duration-500 group-hover:gap-4">
                  Ver pieza
                  <span>→</span>
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// --- Testimonials ---
const TESTIMONIALS = [
  { name: "Carlos M.", city: "Madrid", text: "La calidad supera ampliamente mis expectativas. NOVA se convirtió en mi marca favorita.", stars: 5 },
  { name: "Andrés V.", city: "Bogotá", text: "La camisa de lino es una obra maestra. Cae perfecto, se siente como una segunda piel.", stars: 5 },
  { name: "Lucas P.", city: "Buenos Aires", text: "Discreción, elegancia y materiales nobles. Lo que buscaba hace años.", stars: 4 },
  { name: "Rafael S.", city: "São Paulo", text: "Atención impecable y prendas que envejecen con dignidad. Vale cada peso.", stars: 5 },
  { name: "Mateo F.", city: "Ciudad de México", text: "El blazer de la colección Evening es de otro planeta. Recibo cumplidos cada vez que lo uso.", stars: 5 },
];

function Testimonials() {
  return (
    <section className="bg-[color:var(--ink)] py-28 text-[color:var(--cream)] md:py-40 relative overflow-hidden grain">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <Reveal className="mb-16 max-w-2xl">
          <p className="mb-5 text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">— Voces NOVA</p>
          <h2 className="font-serif text-[34px] leading-[1.1] md:text-[54px]">
            Lo Que Dicen <span className="italic font-light">Nuestros Clientes.</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="flex h-full flex-col justify-between border border-[color:var(--cream)]/15 p-8 transition-colors duration-500 hover:border-[color:var(--sand)]/60">
                <div>
                  <div className="flex gap-1 text-[color:var(--sand)]">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <span key={k} className={k < t.stars ? "" : "opacity-25"}>★</span>
                    ))}
                  </div>
                  <blockquote className="mt-6 font-serif text-xl leading-snug text-[color:var(--cream)]/95">
                    “{t.text}”
                  </blockquote>
                </div>
                <figcaption className="mt-10 flex items-center gap-3 text-[11px] uppercase tracking-editorial text-[color:var(--cream)]/60">
                  <span className="h-px w-6 bg-[color:var(--sand)]" />
                  {t.name} — {t.city}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Guarantee ---
function Guarantee() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
      <Reveal>
        <div className="grid items-center gap-16 border-y hairline py-16 md:grid-cols-[auto_1fr_auto] md:py-20">
          <Seal />
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">— Garantía NOVA</p>
            <h2 className="font-serif text-[32px] leading-[1.1] text-[color:var(--ink)] md:text-[44px]">
              Compra con <span className="italic">Total Confianza.</span>
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[color:var(--muted-foreground)] md:text-base">
              Si tu producto no cumple tus expectativas, puedes solicitar cambio o devolución dentro de los primeros 7 días, sin preguntas.
            </p>
          </div>
          <a href="#colecciones" className="btn-nova btn-nova-ghost">Empezar a Comprar</a>
        </div>
      </Reveal>
    </section>
  );
}

function Seal() {
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin_28s_linear_infinite] text-[color:var(--cocoa)]">
        <defs>
          <path id="circle" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
        </defs>
        <text fontSize="13" letterSpacing="6" fill="currentColor" fontFamily="Inter">
          <textPath href="#circle">NOVA · QUIET LUXURY · ATEMPORAL · CRAFTED · </textPath>
        </text>
      </svg>
      <div className="absolute inset-6 flex items-center justify-center rounded-full border border-[color:var(--cocoa)] font-serif text-2xl italic text-[color:var(--cocoa)]">
        N
      </div>
    </div>
  );
}

// --- Limited Offer ---
function Limited() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const target = Date.now() + 1000 * 60 * 60 * 72;
    const i = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setT({ d, h, m, s });
    }, 1000);
    return () => clearInterval(i);
  }, []);
  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center">
      <span className="font-serif text-5xl text-[color:var(--cream)] md:text-7xl">{String(v).padStart(2, "0")}</span>
      <span className="mt-2 text-[10px] uppercase tracking-luxury text-[color:var(--sand)]">{l}</span>
    </div>
  );
  return (
    <section className="relative overflow-hidden bg-[color:var(--ink)]">
      <img src={limitedImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-[#1A1A1A]/85 to-transparent" />
      <div className="relative mx-auto grid max-w-[1400px] gap-16 px-6 py-28 md:grid-cols-2 md:px-10 md:py-40">
        <Reveal>
          <p className="mb-5 text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">— Edición Limitada</p>
          <h2 className="font-serif text-[36px] leading-[1.05] text-[color:var(--cream)] md:text-[60px]">
            Ediciones <span className="italic font-light">Limitadas.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[color:var(--cream)]/75">
            Producciones reducidas para preservar la exclusividad de cada colección. Una vez agotadas, no vuelven.
          </p>
          <a href="#colecciones" className="btn-nova btn-nova-light mt-10">Comprar Ahora</a>
        </Reveal>
        <Reveal delay={150} className="flex flex-col justify-center">
          <div className="grid grid-cols-4 gap-4 border-y border-[color:var(--cream)]/15 py-10 md:gap-8">
            <Box v={t.d} l="Días" />
            <Box v={t.h} l="Horas" />
            <Box v={t.m} l="Min" />
            <Box v={t.s} l="Seg" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// --- FAQ ---
const FAQS = [
  { q: "¿Cuánto tarda el envío?", a: "Despachamos en 24h. Los envíos a Brasil llegan entre 3 y 7 días hábiles según ciudad. Envío exprés disponible." },
  { q: "¿Realizan cambios?", a: "Sí. Tienes 7 días desde la recepción para solicitar un cambio o devolución sin preguntas." },
  { q: "¿Cómo elegir mi talla?", a: "Cada ficha de producto incluye una guía de tallas exclusiva NOVA. Si tienes dudas, nuestro concierge te asesora por WhatsApp." },
  { q: "¿Qué métodos de pago aceptan?", a: "Tarjeta crédito y débito, PIX, transferencia bancaria y pago en hasta 6 cuotas sin interés." },
  { q: "¿Los productos tienen garantía?", a: "Todas las prendas NOVA cuentan con garantía de confección de 6 meses." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-[1100px] px-6 py-28 md:px-10 md:py-40">
      <Reveal className="mb-14 text-center">
        <p className="mb-5 text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">— Preguntas Frecuentes</p>
        <h2 className="font-serif text-[34px] leading-[1.1] text-[color:var(--ink)] md:text-[52px]">
          Lo que <span className="italic font-light">necesitas saber.</span>
        </h2>
      </Reveal>
      <div className="border-t hairline">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between border-b hairline py-7 text-left transition-colors duration-400 hover:text-[color:var(--cocoa)]"
              >
                <span className="font-serif text-xl text-[color:var(--ink)] md:text-2xl">{f.q}</span>
                <span className={`ml-6 text-2xl text-[color:var(--cocoa)] transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              <div
                className={`grid overflow-hidden border-b hairline transition-all duration-500 ease-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl py-6 text-[15px] leading-relaxed text-[color:var(--muted-foreground)]">{f.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// --- Final CTA ---
function FinalCTA() {
  return (
    <section className="relative h-[92svh] min-h-[620px] w-full overflow-hidden">
      <img src={ctaImg} alt="Hombre elegante frente al mar Mediterráneo" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-[#1A1A1A]/20" />
      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col items-center justify-center px-6 text-center md:px-10">
        <Reveal>
          <p className="mb-6 text-[11px] uppercase tracking-luxury text-[color:var(--cream)]/80">— NOVA</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="max-w-4xl font-serif text-[36px] leading-[1.08] text-[color:var(--cream)] md:text-[70px]">
            Tu Mejor Versión Comienza con<br />
            <span className="italic font-light">Cómo Te Presentas al Mundo.</span>
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[color:var(--cream)]/85">
            Descubre la colección diseñada para hombres que entienden el valor de la elegancia auténtica.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <a href="#colecciones" className="btn-nova btn-nova-light mt-10">Explorar NOVA</a>
        </Reveal>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer id="nosotros" className="border-t hairline bg-[color:var(--cream)]">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-serif text-3xl tracking-[0.18em] text-[color:var(--ink)]">NOVA</div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[color:var(--muted-foreground)]">
              Maison de moda masculina inspirada en el lujo silencioso del Mediterráneo. Piezas atemporales, materiales nobles, vida con propósito.
            </p>
          </div>
          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">Menú</h4>
            <ul className="space-y-3 text-sm text-[color:var(--ink)]/80">
              <li><a href="#top" className="nova-link">Inicio</a></li>
              <li><a href="#colecciones" className="nova-link">Colecciones</a></li>
              <li><a href="#categorias" className="nova-link">Categorías</a></li>
              <li><a href="#nosotros" className="nova-link">Nosotros</a></li>
              <li><a href="#faq" className="nova-link">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">Sigue NOVA</h4>
            <ul className="space-y-3 text-sm text-[color:var(--ink)]/80">
              <li><a href="#" className="nova-link">Instagram</a></li>
              <li><a href="#" className="nova-link">TikTok</a></li>
              <li><a href="#" className="nova-link">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t hairline pt-8 text-[11px] uppercase tracking-editorial text-[color:var(--muted-foreground)] md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} NOVA — Elegancia Atemporal.</span>
          <span>Crafted with quiet care · Mediterranean Spirit</span>
        </div>
      </div>
    </footer>
  );
}

function NovaLanding() {
  return (
    <main className="bg-[color:var(--cream)] text-[color:var(--ink)]">
      <Nav />
      <Hero />
      <HeroCarousel />
      <Marquee />
      <Benefits />
      <Collections />
      <Categories />
      <Testimonials />
      <Guarantee />
      <Limited />
      <FAQ />
      <FinalCTA />
      <ClosingCarousel />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}

// --- Image carousel (marquee of clothing photos) ---
function ImageMarquee({ images, reverse = false, speed = 50 }: { images: { src: string; alt: string }[]; reverse?: boolean; speed?: number }) {
  const loop = [...images, ...images];
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-6 py-2"
        style={{
          animation: `${reverse ? "img-marquee-rev" : "img-marquee"} ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {loop.map((img, i) => (
          <div key={i} className="relative h-[260px] w-[200px] shrink-0 overflow-hidden md:h-[420px] md:w-[320px]">
            <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes img-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes img-marquee-rev { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

function HeroCarousel() {
  const imgs = [
    { src: linenImg, alt: "Colección Lino" },
    { src: coastalImg, alt: "Colección Coastal" },
    { src: businessImg, alt: "Colección Business" },
    { src: eveningImg, alt: "Colección Evening" },
    { src: catBlazers, alt: "Blazers" },
    { src: catCamisas, alt: "Camisas" },
    { src: catPantalones, alt: "Pantalones" },
    { src: catCalzado, alt: "Calzado" },
  ];
  return (
    <section className="bg-[color:var(--cream)] py-10 md:py-14">
      <div className="mx-auto mb-6 max-w-[1400px] px-6 md:px-10">
        <p className="text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">— Lo que vestimos</p>
      </div>
      <ImageMarquee images={imgs} speed={55} />
    </section>
  );
}

function ClosingCarousel() {
  const imgs = [
    { src: catAccesorios, alt: "Accesorios" },
    { src: eveningImg, alt: "Evening" },
    { src: catPolos, alt: "Polos" },
    { src: coastalImg, alt: "Coastal" },
    { src: catBlazers, alt: "Blazers" },
    { src: linenImg, alt: "Lino" },
    { src: catCalzado, alt: "Calzado" },
    { src: businessImg, alt: "Business" },
  ];
  return (
    <section className="bg-[color:var(--card)] py-16 md:py-24">
      <div className="mx-auto mb-8 max-w-[1400px] px-6 md:px-10">
        <p className="text-[11px] uppercase tracking-luxury text-[color:var(--bronze)]">— Universo NOVA</p>
        <h2 className="mt-3 font-serif text-[28px] leading-[1.1] text-[color:var(--ink)] md:text-[44px]">
          Una mirada al <span className="italic font-light">vestidor.</span>
        </h2>
      </div>
      <ImageMarquee images={imgs} reverse speed={60} />
    </section>
  );
}

// --- Floating WhatsApp ---
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 hover:scale-110 md:h-16 md:w-16"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 md:h-8 md:w-8" fill="currentColor" aria-hidden="true">
        <path d="M19.11 17.27c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.35-1.61-1.5-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34s-.96.94-.96 2.29.99 2.66 1.13 2.84c.14.18 1.95 2.98 4.73 4.18.66.29 1.18.46 1.58.59.66.21 1.26.18 1.74.11.53-.08 1.59-.65 1.82-1.27.23-.62.23-1.16.16-1.27-.07-.11-.25-.18-.52-.32zM16.02 5.33c-5.89 0-10.67 4.78-10.67 10.67 0 1.88.49 3.72 1.43 5.34L5 27l5.78-1.51a10.6 10.6 0 0 0 5.24 1.34h.01c5.88 0 10.67-4.78 10.67-10.67s-4.79-10.67-10.68-10.67zm0 19.55h-.01a8.86 8.86 0 0 1-4.51-1.24l-.32-.19-3.43.9.92-3.34-.21-.34a8.85 8.85 0 0 1-1.36-4.72c0-4.89 3.98-8.87 8.88-8.87 2.37 0 4.6.93 6.27 2.6a8.79 8.79 0 0 1 2.6 6.28c0 4.89-3.98 8.88-8.83 8.88z" />
      </svg>
    </a>
  );
}