import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Code2,
  LayoutDashboard,
  ShoppingBag,
  Cpu,
  MessageCircle,
  Workflow,
  Plug,
  Palette,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Check,
  Star,
  Zap,
  Shield,
  Rocket,
  Brain,
  Instagram,
  Mail,
  Linkedin,
  Twitter,
  Globe,
} from "lucide-react";
import heroImg from "../assets/hero.jpg";
import automationImg from "../assets/automation.jpg";
import project1 from "../assets/project1.jpg";
import project2 from "../assets/project2.jpg";
import project3 from "../assets/project3.jpg";
import project4 from "../assets/project4.jpg";
import { LanguageProvider, useLang, type Lang } from "@/lib/i18n";

const WHATSAPP_URL = "https://wa.me/5491100000000?text=Hola%20GENESIS%2C%20quiero%20info";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GENESIS — Sistemas digitales inteligentes para marcas modernas" },
      {
        name: "description",
        content:
          "Agencia digital especializada en desarrollo web premium, automatizaciones con IA, bots de WhatsApp, funnels de venta y soluciones para negocios.",
      },
    ],
  }),
  component: Landing,
});

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a]">
        <span className="absolute inset-0 rounded-lg blur-md bg-[#3b82f6]/50" />
        <Sparkles className="relative h-4 w-4 text-white" />
      </span>
      <span className="font-display text-lg font-semibold tracking-[0.18em]">GENESIS</span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLang();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
            <a href="#servicios" className="hover:text-white transition">{t("nav.services")}</a>
            <a href="#por-que" className="hover:text-white transition">{t("nav.why")}</a>
            <a href="#proyectos" className="hover:text-white transition">{t("nav.projects")}</a>
            <a href="#ia" className="hover:text-white transition">{t("nav.automations")}</a>
            <a href="#contacto" className="hover:text-white transition">{t("nav.contact")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <LangSwitcher />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-medium px-4 py-2 hover:bg-white/90 transition"
            >
              {t("nav.whatsapp")} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  const opts: { code: Lang; label: string; flag: string }[] = [
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "en", label: "English", flag: "🇺🇸" },
  ];
  const current = opts.find((o) => o.code === lang)!;
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full glass-strong px-3 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition"
        aria-label="Change language"
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{current.flag}</span>
        <span className="uppercase tracking-wider">{current.code}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 min-w-[160px] rounded-xl glass-strong border border-white/10 overflow-hidden shadow-2xl">
          {opts.map((o) => (
            <button
              key={o.code}
              onClick={() => {
                setLang(o.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition ${
                o.code === lang ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{o.flag}</span>
              <span>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 -z-10 radial-glow" />
      <div className="absolute inset-0 -z-10 grid-bg" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] animate-pulse-glow" />
              {t("hero.badge")}
            </span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display mt-8 text-center text-5xl md:text-7xl lg:text-[88px] leading-[1.02] font-semibold tracking-tight">
            {t("hero.title.1")}
            <br className="hidden md:block" />{" "}
            {t("hero.title.2")}{" "}
            <span className="text-gradient-electric">{t("hero.title.3")}</span>{" "}
            <span className="text-gradient-gold">{t("hero.title.4")}</span>.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-base md:text-lg text-white/60 leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-7 py-3.5 text-sm font-medium transition hover:scale-[1.02] glow-electric"
            >
              <MessageCircle className="h-4 w-4" />
              {t("hero.cta.whatsapp")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 rounded-full glass-strong px-7 py-3.5 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              {t("hero.cta.projects")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="relative mt-20">
            <div className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[40px] bg-gradient-to-b from-[#3b82f6]/10 to-transparent blur-2xl" />
            <div className="relative mx-auto max-w-5xl rounded-3xl overflow-hidden glass-strong p-2">
              <img
                src={heroImg}
                alt="Dashboards e interfaces flotantes con IA"
                width={1600}
                height={1024}
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <FloatingCard
              className="absolute -left-2 md:left-4 top-10 animate-float-slow"
              icon={<Brain className="h-4 w-4 text-[#7dd3fc]" />}
              title={t("hero.card.ai")}
              value={t("hero.card.ai.value")}
            />
            <FloatingCard
              className="absolute -right-2 md:right-4 bottom-12 animate-float-slow"
              style={{ animationDelay: "1.5s" }}
              icon={<TrendingUp className="h-4 w-4 text-[#f5d76e]" />}
              title={t("hero.card.conv")}
              value="+342%"
            />
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.2em] text-white/30">
            <span>{t("hero.tag.1")}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{t("hero.tag.2")}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{t("hero.tag.3")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FloatingCard({
  className = "",
  style,
  icon,
  title,
  value,
}: {
  className?: string;
  style?: React.CSSProperties;
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div
      style={style}
      className={`hidden md:flex glass-strong rounded-2xl p-4 min-w-[180px] items-center gap-3 ${className}`}
    >
      <span className="grid place-items-center h-9 w-9 rounded-xl bg-white/5">{icon}</span>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-white/40">{title}</div>
        <div className="text-sm font-medium text-white">{value}</div>
      </div>
    </div>
  );
}

const SERVICES = [
  { icon: Code2, key: "web" },
  { icon: LayoutDashboard, key: "landing" },
  { icon: ShoppingBag, key: "store" },
  { icon: Cpu, key: "ai" },
  { icon: MessageCircle, key: "bot" },
  { icon: Workflow, key: "biz" },
  { icon: Plug, key: "int" },
  { icon: Palette, key: "ux" },
  { icon: TrendingUp, key: "funnel" },
  { icon: Zap, key: "opt" },
];

function Services() {
  const { t } = useLang();
  return (
    <section id="servicios" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeader
            eyebrow={t("services.eyebrow")}
            title={<>{t("services.title.1")} <span className="text-gradient-electric">{t("services.title.2")}</span> {t("services.title.3")}</>}
            subtitle={t("services.subtitle")}
          />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.key} delay={i * 60}>
              <div className="group relative glass rounded-2xl p-7 h-full transition hover:-translate-y-1 hover:bg-white/[0.06]">
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none"
                  style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(59,130,246,0.12), transparent 60%)" }} />
                <div className="relative">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-white/10 to-white/[0.02] border border-white/10 mb-5">
                    <s.icon className="h-5 w-5 text-[#7dd3fc] group-hover:text-[#f5d76e] transition" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-white">{t(`svc.${s.key}`)}</h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">{t(`svc.${s.key}.d`)}</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs text-white/50 group-hover:text-white transition">
                    {t("services.quote")} <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-white/70">
        <span className="h-1 w-1 rounded-full bg-[#f5d76e]" /> {eyebrow}
      </div>
      <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-white/55 text-base md:text-lg max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function Stat({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const v = useCountUp(value, 1800, start);
  return (
    <div className="text-center">
      <div className="font-display text-5xl md:text-6xl font-semibold tracking-tight">
        <span className="text-gradient-electric">{v}</span>
        <span className="text-white">{suffix}</span>
      </div>
      <div className="mt-2 text-sm text-white/50">{label}</div>
    </div>
  );
}

function WhyGenesis() {
  const ref = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setStart(true), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pillars = [
    { icon: Rocket, title: "Velocidad real", desc: "Procesos ágiles, sin vueltas. Entregas medidas en días, no en meses." },
    { icon: Brain, title: "IA aplicada", desc: "No vendemos buzzwords: implementamos IA que mueve la aguja." },
    { icon: Shield, title: "Calidad premium", desc: "Diseño cuidado al detalle y código pensado para escalar." },
    { icon: TrendingUp, title: "Foco en ventas", desc: "Cada decisión se toma para que tu negocio facture más." },
  ];

  return (
    <section id="por-que" className="relative py-28">
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Por qué GENESIS"
            title={<>No somos una agencia más.<br/>Somos tu <span className="text-gradient-gold">ventaja competitiva</span>.</>}
            subtitle="Combinamos diseño premium, ingeniería sólida e inteligencia artificial para construir empresas del futuro."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="glass rounded-2xl p-6 h-full hover:bg-white/[0.05] transition">
                <p.icon className="h-6 w-6 text-[#f5d76e]" />
                <h3 className="font-display text-lg mt-4 font-medium">{p.title}</h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div ref={ref} className="mt-20 rounded-3xl glass-strong p-10 md:p-14">
          <div className="grid gap-10 md:grid-cols-4">
            <Stat value={50} suffix="+" label="Proyectos entregados" start={start} />
            <Stat value={100} suffix="+" label="Automatizaciones activas" start={start} />
            <Stat value={1000} suffix="+" label="Horas ahorradas a clientes" start={start} />
            <Stat value={98} suffix="%" label="Clientes satisfechos" start={start} />
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  { img: project1, name: "Nova Store", cat: "E-commerce premium" },
  { img: project2, name: "Atlas Analytics", cat: "Dashboard SaaS" },
  { img: project3, name: "WhatsBot 24/7", cat: "Bot de WhatsApp + IA" },
  { img: project4, name: "Funnel Apex", cat: "Funnel de ventas" },
];

function Portfolio() {
  return (
    <section id="proyectos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeader
              eyebrow="Proyectos"
              title={<>Trabajo seleccionado.<br/>Resultados <span className="text-gradient-electric">reales</span>.</>}
            />
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition self-start md:self-auto">
              Quiero algo así <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                className="group block rounded-3xl glass overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={p.img} alt={p.name} width={1024} height={768} loading="lazy"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#f5d76e]/80">{p.cat}</div>
                    <h3 className="font-display text-xl md:text-2xl font-medium mt-1">{p.name}</h3>
                  </div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full glass-strong group-hover:bg-white group-hover:text-black transition">
                    <ArrowUpRight className="h-4 w-4" />
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

function AutomationsAI() {
  return (
    <section id="ia" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 radial-glow opacity-60" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 items-center">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-white/70">
                <span className="h-1 w-1 rounded-full bg-[#3b82f6]" /> Automatizaciones IA
              </div>
              <h2 className="font-display mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
                Automatizamos procesos para que tu negocio{" "}
                <span className="text-gradient-gold">trabaje incluso cuando dormís</span>.
              </h2>
              <p className="mt-6 text-white/60 text-lg leading-relaxed">
                Conectamos tus herramientas, datos y canales en flujos inteligentes. Lo que antes tomaba horas, ahora ocurre en segundos.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Captura y calificación automática de leads",
                  "Respuestas con IA en WhatsApp, Instagram y email",
                  "Reportes que se generan y envían solos",
                  "Integraciones con CRM, pagos, calendarios y más",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-white/75">
                    <span className="mt-0.5 grid place-items-center h-5 w-5 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/40">
                      <Check className="h-3 w-3 text-[#7dd3fc]" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:scale-[1.02] transition glow-gold">
                Automatizar mi negocio <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden glass-strong p-2">
                <img src={automationImg} alt="Flujos de automatización con IA" width={1400} height={900} loading="lazy" className="w-full h-auto rounded-2xl" />
              </div>
              <FlowDiagram />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FlowDiagram() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" fill="none" aria-hidden>
      <defs>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
          <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f5d76e" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[40, 130, 230].map((y, i) => (
        <path
          key={i}
          d={`M20,${y} C140,${y - 40} 260,${y + 40} 380,${y}`}
          stroke="url(#line)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
          className="animate-flow"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
    </svg>
  );
}

const TESTIMONIALS = [
  {
    name: "Lucía Fernández",
    role: "CEO · Atlas Studio",
    text: "GENESIS rediseñó nuestra web y automatizó la captación de leads. En 60 días triplicamos consultas calificadas.",
    initials: "LF",
  },
  {
    name: "Mateo Álvarez",
    role: "Founder · Nova Store",
    text: "El bot de WhatsApp atiende solo el 80% de las consultas. Recuperamos horas y vendemos más. Inversión recuperada en semanas.",
    initials: "MA",
  },
  {
    name: "Camila Rossi",
    role: "Marketing · Apex Group",
    text: "Trabajan con un nivel premium que rara vez se ve. Diseño, ejecución y estrategia, todo de primera.",
    initials: "CR",
  },
];

function Testimonials() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeader
            eyebrow="Testimonios"
            title={<>Lo que dicen las marcas que <span className="text-gradient-gold">eligieron evolucionar</span>.</>}
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="glass rounded-2xl p-7 h-full flex flex-col">
                <div className="flex gap-0.5 text-[#f5d76e]">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-5 text-white/80 leading-relaxed">"{t.text}"</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid place-items-center h-10 w-10 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1e3a8a] text-sm font-medium">
                    {t.initials}
                  </span>
                  <span>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contacto" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 radial-glow" />
        <div className="absolute inset-0 grid-bg opacity-50" />
      </div>
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.02]">
            Tu negocio necesita{" "}
            <span className="text-gradient-electric">evolucionar</span>.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-7 text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            La diferencia entre crecer o quedar atrás está en la tecnología.
            Empezá hoy y dejá que la próxima década te encuentre listo.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-7 py-4 text-base font-medium hover:scale-[1.02] transition glow-electric">
              <Code2 className="h-4 w-4" /> Quiero mi página web
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full glass-strong text-white px-7 py-4 text-base font-medium hover:bg-white/10 transition">
              <Cpu className="h-4 w-4" /> Automatizar mi negocio
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f5d76e] to-[#d4a418] text-black px-7 py-4 text-base font-medium hover:scale-[1.02] transition glow-gold">
              <MessageCircle className="h-4 w-4" /> Hablar por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-md text-sm text-white/55 leading-relaxed">
              GENESIS — Sistemas digitales inteligentes. Web premium, IA, automatización y soluciones para marcas modernas.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: MessageCircle, href: WHATSAPP_URL, label: "WhatsApp" },
                { Icon: Instagram, href: "#", label: "Instagram" },
                { Icon: Twitter, href: "#", label: "Twitter" },
                { Icon: Linkedin, href: "#", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:hola@genesis.agency", label: "Email" },
              ].map(({ Icon, href, label }) => (
                <a key={label} aria-label={label} href={href} target="_blank" rel="noreferrer"
                  className="grid place-items-center h-10 w-10 rounded-full glass hover:bg-white/10 transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40">Servicios</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href="#servicios" className="hover:text-white">Desarrollo web</a></li>
              <li><a href="#servicios" className="hover:text-white">Automatizaciones IA</a></li>
              <li><a href="#servicios" className="hover:text-white">Bots de WhatsApp</a></li>
              <li><a href="#servicios" className="hover:text-white">Funnels de venta</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40">Empresa</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><a href="#proyectos" className="hover:text-white">Proyectos</a></li>
              <li><a href="#por-que" className="hover:text-white">Por qué GENESIS</a></li>
              <li><a href="#contacto" className="hover:text-white">Contacto</a></li>
              <li><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40">
          <span>© {new Date().getFullYear()} GENESIS. Todos los derechos reservados.</span>
          <span>Diseñado para marcas que no se conforman.</span>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-black pl-3 pr-5 py-3 font-medium shadow-2xl shadow-[#25D366]/30 hover:scale-105 transition">
      <span className="grid place-items-center h-8 w-8 rounded-full bg-black/10">
        <MessageCircle className="h-4 w-4" />
      </span>
      <span className="hidden sm:inline text-sm">Hablemos</span>
    </a>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <main>
        <Hero />
        <Services />
        <WhyGenesis />
        <Portfolio />
        <AutomationsAI />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}