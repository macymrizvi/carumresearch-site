import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  ChevronDown,
  Cpu,
  Database,
  FileText,
  Globe,
  Mail,
  Menu,
  Microscope,
  Shield,
  Sparkles,
  Users,
  X,
} from "lucide-react";

/**
 * Carum Research — Sponsor-Focused Website
 * Single-file React component (Tailwind).
 *
 * Logo assets in this package:
 *  - /public/carum-logo.png
 *  - /public/carum-hero.jpg
 *  - /public/partner-nardi.png
 *  - /public/partner-ncd.png
 */

// -------------------------
// Brand + Copy
// -------------------------

const BRAND = {
  name: "Carum Research",
  short: "Carum",
  city: "Dallas, Texas",
  primary: "#2C6E59", // woodland green
  ink: "#051821", // deep navy
  mint: "#E1F0E5",
  // Uses your provided Carum branding (cropped from your banner image)
  logoSrc: "/carum-logo.png",
  email: "info@carumresearch.com",
};

const NAV = [
  { label: "Why Carum", id: "why" },
  { label: "Capabilities", id: "capabilities" },
  { label: "Quality", id: "quality" },
  { label: "Technology", id: "technology" },
  { label: "Leadership", id: "leadership" },
  { label: "Partners", id: "partners" },
  { label: "Contact", id: "contact" },
];

const PARTNERS = [
  {
    name: "NARDI — Neurology & Rare Disease Institute",
    logoSrc: "/partner-nardi.png",
  },
  {
    name: "Neurology Consultants of Dallas (NCD)",
    logoSrc: "/partner-ncd.png",
  },
];

// Sponsor-facing and QSBS-safer wording: avoid patient-directed marketing language.
const COPY = {
  heroKicker: "Sponsor-focused clinical operations",
  // Moved to the top (Hero), per your request:
  heroTitle: "Operationally disciplined, sponsor-aligned execution.",
  heroAccent: "", // keep empty to avoid the previous “wordy” second line
  heroSub:
    "A sponsor-focused research site built for predictable enrollment, clean data, and responsive communication.",
  ctas: {
    primary: "Request a capability deck",
    secondary: "Start a feasibility conversation",
  },
  valueProps: [
    {
      icon: Sparkles,
      title: "Sponsor-ready operations",
      desc: "SOP-driven workflows, clear communication, and predictable timelines from feasibility through closeout.",
    },
    {
      icon: Database,
      title: "Data integrity by design",
      desc: "Structured source workflows and monitoring-friendly documentation to support accurate, auditable datasets.",
    },
    {
      icon: Users,
      title: "Recruitment strength",
      desc: "Established neurology referral pathways and a disciplined pre-screening process to reduce screen failures.",
    },
  ],
  focus: [
    {
      title: "CNS & Neurology",
      desc: "Operational experience in neurologic populations, procedures, and longitudinal follow-up.",
    },
    {
      title: "Rare Disease",
      desc: "Infrastructure for complex protocols, caregiver coordination, and specialized assessments.",
    },
    {
      title: "Expanding scope",
      desc: "Open to additional therapeutic areas and digital health programs through aligned partnerships.",
    },
  ],
  capabilities: [
    {
      icon: Microscope,
      title: "Study startup",
      bullets: [
        "Feasibility + rapid feedback loops",
        "Budget / CTA collaboration support",
        "Site activation planning and readiness checklists",
      ],
    },
    {
      icon: Users,
      title: "Recruitment & retention",
      bullets: [
        "Pre-screening workflows",
        "Referral network coordination",
        "Visit cadence planning to reduce drop-off",
      ],
    },
    {
      icon: Shield,
      title: "Quality systems",
      bullets: [
        "SOP-based training approach",
        "Deviation prevention & documentation",
        "Monitoring-ready source organization",
      ],
    },
    {
      icon: Cpu,
      title: "Tech-enabled execution",
      bullets: [
        "Digital screening + scheduling workflows",
        "Secure data handling principles",
        "Automation where it improves speed and consistency",
      ],
    },
  ],
  standards: [
    {
      num: "01",
      title: "Feasibility & alignment",
      desc: "Fast feasibility responses with transparent operational constraints and enrollment assumptions.",
      details: [
        "Population fit, competing studies, and visit burden review",
        "Operational resourcing plan and start-up timeline",
        "Risk flags surfaced early (procedures, equipment, staffing)",
      ],
    },
    {
      num: "02",
      title: "Start-up readiness",
      desc: "Structured start-up checklists and role clarity before first subject in.",
      details: [
        "Protocol-specific training + documentation",
        "Source templates and visit workflow mapping",
        "Communication cadence established (weekly touchpoints as needed)",
      ],
    },
    {
      num: "03",
      title: "Execution & oversight",
      desc: "Tight visit execution, safety diligence, and rapid issue resolution.",
      details: [
        "Pre-visit confirmation + checklist-driven visits",
        "Deviation prevention mindset; immediate corrective actions",
        "Clear, timely sponsor/CRO communication",
      ],
    },
    {
      num: "04",
      title: "Clean data delivery",
      desc: "Monitoring-friendly documentation and audit-ready organization throughout the study lifecycle.",
      details: [
        "Source and essential document consistency",
        "Query responsiveness and documentation discipline",
        "Closeout planning from day one",
      ],
    },
  ],
  complianceNotes: [
    {
      icon: CheckCircle,
      label: "Built to support ICH-GCP workflows",
      sub: "Quality and documentation patterns designed to align with GCP expectations.",
    },
    {
      icon: Globe,
      label: "Digital compliance-aware systems",
      sub: "Tools and processes selected with security and auditability in mind.",
    },
    {
      icon: Shield,
      label: "Privacy-forward posture",
      sub: "Operational controls intended to support HIPAA-aligned handling of PHI.",
    },
  ],
  leadership: [
    { name: "Christina Howell", title: "CEO", note: "Strategy & Operations" },
    { name: "Puneet Gupta, MD", title: "CSIO", note: "Strategic Intelligence" },
    { name: "Duc Tran, MD", title: "CMO", note: "Medical Oversight" },
    { name: "Macym Rizvi, MD", title: "Treasurer", note: "Executive Board" },
  ],
};

// -------------------------
// UI Primitives
// -------------------------

const cx = (...classes) => classes.filter(Boolean).join(" ");

const Container = ({ children, className }) => (
  <div className={cx("max-w-7xl mx-auto px-4 md:px-6", className)}>{children}</div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-white/80">
    {children}
  </span>
);

const Button = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  href,
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 active:translate-y-[1px]";
  const variants = {
    primary:
      "bg-[#2C6E59] text-white shadow-lg shadow-[#2C6E59]/20 hover:bg-[#255a49]",
    secondary:
      "bg-white/10 text-white hover:bg-white/15 border border-white/10",
    ghost:
      "bg-transparent text-[#2C6E59] hover:bg-[#2C6E59]/10 border border-[#2C6E59]/25",
    dark:
      "bg-[#051821] text-white hover:bg-[#0a2530] border border-white/10",
    white:
      "bg-white text-[#051821] hover:bg-white/90 shadow-md",
  };

  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      onClick={onClick}
      className={cx(base, variants[variant], className)}
    >
      {children}
    </Comp>
  );
};

const Card = ({ icon: Icon, title, children, className = "" }) => (
  <div
    className={cx(
      "rounded-3xl border border-black/5 bg-white p-7 shadow-sm hover:shadow-xl transition-shadow",
      className
    )}
  >
    {Icon ? (
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#051821]/5 text-[#2C6E59]">
        <Icon size={22} />
      </div>
    ) : null}
    <h3 className="text-lg font-bold text-[#051821]">{title}</h3>
    <div className="mt-2 text-sm leading-relaxed text-gray-600">{children}</div>
  </div>
);

const SectionTitle = ({ kicker, title, sub, align = "center", dark = false }) => (
  <div className={cx(align === "left" ? "text-left" : "text-center", "mb-12")}>
    {kicker ? (
      <div
        className={cx(
          "mb-3 text-[11px] font-bold uppercase tracking-[0.25em]",
          dark ? "text-[#88cba9]" : "text-[#2C6E59]"
        )}
      >
        {kicker}
      </div>
    ) : null}
    <h2
      className={cx(
        "text-3xl md:text-4xl font-extrabold tracking-tight",
        dark ? "text-white" : "text-[#051821]"
      )}
    >
      {title}
    </h2>
    {sub ? (
      <p
        className={cx(
          "mt-4 max-w-3xl text-base md:text-lg leading-relaxed",
          align === "center" ? "mx-auto" : "",
          dark ? "text-white/70" : "text-gray-600"
        )}
      >
        {sub}
      </p>
    ) : null}
  </div>
);

const Divider = () => <div className="h-px w-full bg-black/5" />;

function ImageWithFallback({ src, alt, className, fallback }) {
  const [error, setError] = useState(false);
  if (!src || error) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

const CarumMarkFallback = ({ className = "" }) => (
  <div className={cx("flex items-center gap-3 select-none", className)}>
    <div className="relative flex h-10 w-10 items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <path
          d="M 70 30 A 35 35 0 1 0 70 70"
          fill="none"
          stroke="#2C6E59"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <text
          x="38"
          y="68"
          fontFamily="ui-sans-serif, system-ui"
          fontWeight="800"
          fontSize="45"
          fill="#2C6E59"
        >
          R
        </text>
      </svg>
    </div>
    <div className="leading-none">
      <div className="text-lg font-extrabold tracking-widest text-white">
        CARUM
      </div>
      <div className="mt-1 text-[10px] font-bold tracking-[0.35em] text-white/70">
        RESEARCH
      </div>
    </div>
  </div>
);

// -------------------------
// Accordion
// -------------------------

function Accordion({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={idx}
            className={cx(
              "rounded-2xl border",
              isOpen ? "border-[#2C6E59]/30" : "border-black/5",
              "bg-white"
            )}
          >
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black tracking-widest text-[#2C6E59]">
                  {it.num}
                </span>
                <span className="text-base font-bold text-[#051821]">
                  {it.title}
                </span>
              </div>
              <ChevronDown
                className={cx(
                  "transition-transform",
                  isOpen ? "rotate-180" : "rotate-0"
                )}
                size={18}
              />
            </button>
            {isOpen ? (
              <div className="px-5 pb-5">
                <p className="text-sm text-gray-600 leading-relaxed">{it.desc}</p>
                {it.details?.length ? (
                  <ul className="mt-4 space-y-2">
                    {it.details.map((d, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-600">
                        <CheckCircle className="mt-0.5 text-[#2C6E59]" size={16} />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

// -------------------------
// Modal
// -------------------------

function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
            <div>
              <div className="text-xs font-black tracking-widest text-[#2C6E59]">
                CARUM
              </div>
              <div className="text-xl font-extrabold text-[#051821]">{title}</div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-black/5"
              aria-label="Close"
            >
              <X />
            </button>
          </div>
          <div className="px-6 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------
// Main App
// -------------------------

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [deckOpen, setDeckOpen] = useState(false);
  const [feasOpen, setFeasOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const stats = useMemo(
    () => [
      { value: "Phase I–IV", label: "Trial support" },
      { value: "CNS + Rare", label: "Core strength" },
      { value: "SOP-led", label: "Quality posture" },
      { value: "Fast", label: "Sponsor response" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[#F6F8F7] text-gray-800 selection:bg-[#2C6E59] selection:text-white">
      {/* Top Nav */}
      <nav
        className={cx(
          "fixed inset-x-0 top-0 z-50 transition-all",
          isScrolled
            ? "bg-[#051821]/90 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <Container className={cx("py-4", isScrolled ? "" : "py-6")}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-3"
              aria-label="Carum Research"
            >
              <ImageWithFallback
                src={BRAND.logoSrc}
                alt="Carum Research"
                className="h-10 w-auto object-contain rounded-md"
                fallback={<CarumMarkFallback />}
              />
            </button>

            <div className="hidden lg:flex items-center gap-7">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="text-[12px] font-semibold uppercase tracking-wider text-white/75 hover:text-white transition-colors"
                >
                  {n.label}
                </button>
              ))}
              <div className="ml-2 flex items-center gap-3">
                <Button
                  variant="secondary"
                  className="px-4 py-2"
                  onClick={() => setDeckOpen(true)}
                >
                  <FileText size={16} />
                  Capability Deck
                </Button>
                <Button
                  variant="primary"
                  className="px-4 py-2"
                  onClick={() => setFeasOpen(true)}
                >
                  Partner With Us <ArrowRight size={16} />
                </Button>
              </div>
            </div>

            <button
              className="lg:hidden rounded-full p-2 text-white hover:bg-white/10"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Menu"
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>

          {mobileOpen ? (
            <div className="lg:hidden mt-4 rounded-3xl border border-white/10 bg-[#051821]/95 backdrop-blur-md p-4">
              <div className="grid gap-2">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => scrollTo(n.id)}
                    className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-white/85 hover:bg-white/10"
                  >
                    {n.label}
                  </button>
                ))}
                <div className="mt-3 grid gap-2">
                  <Button variant="secondary" onClick={() => setDeckOpen(true)}>
                    <FileText size={16} /> {COPY.ctas.primary}
                  </Button>
                  <Button variant="primary" onClick={() => setFeasOpen(true)}>
                    {COPY.ctas.secondary} <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </Container>
      </nav>

      {/* Hero */}
      <header
        id="home"
        className="relative overflow-hidden bg-[#051821] pt-32 pb-16 md:pt-44 md:pb-24"
      >
        {/* Brand hero image (your provided banner) */}
        <div className="absolute inset-0">
          <img
            src="/carum-hero.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#051821]/70 via-[#051821]/70 to-[#051821]/85" />
          <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <div className="flex justify-center">
              <Badge>
                <Building2 size={14} /> {COPY.heroKicker}
              </Badge>
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              {COPY.heroTitle}
              {COPY.heroAccent ? (
                <span className="block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[#2C6E59] to-[#9be3c0]">
                  {COPY.heroAccent}
                </span>
              ) : null}
            </h1>

            <p className="mt-6 text-base md:text-xl leading-relaxed text-white/70 max-w-3xl mx-auto">
              {COPY.heroSub}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="white" onClick={() => setDeckOpen(true)}>
                <FileText size={18} /> {COPY.ctas.primary}
              </Button>
              <Button variant="secondary" onClick={() => setFeasOpen(true)}>
                {COPY.ctas.secondary} <ArrowRight size={18} />
              </Button>
            </div>

            {/* Stats strip */}
            <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-7">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-white">
                      {s.value}
                    </div>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-xs text-white/45">
              *Copy can be tightened further once you finalize exactly which SOPs/certifications you want to mention.
            </div>
          </div>
        </Container>
      </header>

      {/* Why Carum */}
      <section id="why" className="py-20 bg-[#F6F8F7]">
        <Container>
          <SectionTitle
            kicker="Why sponsors work with Carum"
            title="A site model built for reliability."
            sub="Operational rigor, clear communication, and documentation discipline—optimized for sponsor timelines and clean data."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {COPY.valueProps.map((v, i) => (
              <Card key={i} icon={v.icon} title={v.title}>
                {v.desc}
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-black/5 bg-white p-7 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="md:col-span-1">
                <div className="text-xs font-black tracking-widest text-[#2C6E59]">
                  FOCUS AREAS
                </div>
                <div className="mt-2 text-2xl font-extrabold text-[#051821]">
                  Clinical depth today. Expanding scope tomorrow.
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  We began with CNS and rare disease infrastructure and are open to aligned partnerships across additional therapeutic areas.
                </p>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-3 gap-4">
                {COPY.focus.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/5 bg-[#F5FBF7] p-5"
                  >
                    <div className="text-sm font-extrabold text-[#051821]">
                      {f.title}
                    </div>
                    <div className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {f.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="py-20 bg-white">
        <Container>
          <SectionTitle
            kicker="Capabilities"
            title="Built for modern trial delivery."
            sub="A sponsor-focused site model that balances speed with documentation discipline."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {COPY.capabilities.map((c, i) => (
              <div
                key={i}
                className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#051821]/5 text-[#2C6E59]">
                    <c.icon size={22} />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-[#051821]">
                      {c.title}
                    </div>
                    <ul className="mt-3 space-y-2">
                      {c.bullets.map((b, idx) => (
                        <li
                          key={idx}
                          className="flex gap-2 text-sm text-gray-600"
                        >
                          <CheckCircle
                            className="mt-0.5 text-[#2C6E59]"
                            size={16}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-3xl border border-black/5 bg-[#051821] p-8 md:p-10 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
            <div className="relative">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="text-xs font-black tracking-widest text-[#9be3c0]">
                    SPONSOR EXPERIENCE
                  </div>
                  <div className="mt-2 text-2xl md:text-3xl font-extrabold">
                    Want the short version?
                  </div>
                  <p className="mt-3 text-white/70 leading-relaxed">
                    Clear owners, defined workflows, proactive updates, and documentation that stays monitoring-ready.
                  </p>
                </div>
                <div className="flex md:justify-end gap-3">
                  <Button variant="white" onClick={() => setDeckOpen(true)}>
                    <FileText size={18} /> Deck
                  </Button>
                  <Button variant="secondary" onClick={() => scrollTo("quality")}>
                    Quality model <ArrowRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quality */}
      <section id="quality" className="py-20 bg-[#F6F8F7]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionTitle
                align="left"
                kicker="Quality"
                title="The Carum Standard"
                sub="A straightforward process designed to reduce operational noise and increase confidence in the dataset."
              />
              <Accordion items={COPY.standards} />
            </div>

            <div className="rounded-3xl border border-black/5 bg-white p-8 md:p-10 sticky top-24">
              <div className="flex items-center gap-3">
                <Shield className="text-[#2C6E59]" />
                <div className="text-xl font-extrabold text-[#051821]">
                  Compliance-minded posture
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                We aim for sponsor expectations: documentation discipline, consistent workflows, and secure handling of sensitive data.
              </p>
              <div className="mt-6 space-y-4">
                {COPY.complianceNotes.map((n, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/5 bg-[#F5FBF7] p-5"
                  >
                    <div className="flex items-start gap-3">
                      <n.icon className="text-[#2C6E59] mt-0.5" size={18} />
                      <div>
                        <div className="text-sm font-extrabold text-[#051821]">
                          {n.label}
                        </div>
                        <div className="mt-1 text-sm text-gray-600">
                          {n.sub}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Divider />

              <div className="mt-6">
                <div className="text-xs font-black tracking-widest text-[#2C6E59]">
                  FAST LINKS
                </div>
                <div className="mt-4 grid gap-3">
                  <button
                    className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-5 py-4 hover:bg-black/5"
                    onClick={() => setDeckOpen(true)}
                  >
                    <span className="text-sm font-bold text-[#051821]">
                      Request capability deck
                    </span>
                    <ArrowRight size={18} className="text-[#2C6E59]" />
                  </button>
                  <button
                    className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-5 py-4 hover:bg-black/5"
                    onClick={() => setFeasOpen(true)}
                  >
                    <span className="text-sm font-bold text-[#051821]">
                      Feasibility conversation
                    </span>
                    <ArrowRight size={18} className="text-[#2C6E59]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Technology */}
      <section id="technology" className="py-20 bg-[#051821] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="absolute -top-24 -left-32 h-[500px] w-[500px] rounded-full border-[80px] border-white/10 blur-2xl" />

        <Container className="relative z-10">
          <SectionTitle
            kicker="Technology"
            title="Tools that speed execution—without adding risk."
            sub="We apply automation where it improves consistency and responsiveness, while keeping clinical judgment and governance front-and-center."
            dark
          />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:border-[#2C6E59]/50 transition-colors">
              <Database className="text-[#9be3c0]" size={26} />
              <div className="mt-4 text-lg font-extrabold">Data hygiene</div>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Structured workflows to reduce errors, improve monitor efficiency, and maintain audit-ready organization.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:border-[#2C6E59]/50 transition-colors">
              <Cpu className="text-[#9be3c0]" size={26} />
              <div className="mt-4 text-lg font-extrabold">Operational automation</div>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Repeatable checklists, templated workflows, and controlled messaging for predictable delivery.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 hover:border-[#2C6E59]/50 transition-colors">
              <Shield className="text-[#9be3c0]" size={26} />
              <div className="mt-4 text-lg font-extrabold">Security-first mindset</div>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                Tools selected with security and auditability considerations to support responsible handling of sensitive information.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-wide text-white/75">
              <Shield size={16} /> Privacy-forward
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-wide text-white/75">
              <CheckCircle size={16} /> Documentation discipline
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-wide text-white/75">
              <Globe size={16} /> Auditability-aware
            </span>
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-20 bg-white">
        <Container>
          <SectionTitle
            kicker="Leadership"
            title="Experienced operators and clinical oversight."
            sub="A small, accountable leadership team aligned to sponsor outcomes: speed, quality, and responsiveness."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COPY.leadership.map((p, i) => (
              <div
                key={i}
                className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-[#051821]/5 flex items-center justify-center">
                    <Users className="text-[#051821]/25" size={34} />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <div className="text-base font-extrabold text-[#051821]">
                    {p.name}
                  </div>
                  <div className="mt-1 text-xs font-black tracking-widest text-[#2C6E59]">
                    {p.title}
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      <section id="partners" className="py-20 bg-[#F6F8F7]">
        <Container>
          <SectionTitle
            kicker="Partners"
            title="Built with aligned institutions."
            sub="We collaborate with established clinical and research organizations to expand capability and reach."
          />

          <div className="rounded-3xl border border-black/5 bg-white p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="text-xs font-black tracking-widest text-[#2C6E59]">
                  PARTNER LOGOS
                </div>
                <div className="mt-2 text-2xl font-extrabold text-[#051821]">
                  Trusted collaborations
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  We can adjust presentation to match usage permissions and any sponsor-specific guidance.
                </p>
              </div>

              <div className="md:col-span-2 flex flex-wrap items-center justify-center gap-10">
                {PARTNERS.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-2xl border border-black/5 bg-white px-6 py-4"
                    title={p.name}
                  >
                    <ImageWithFallback
                      src={p.logoSrc}
                      alt={p.name}
                      className="h-10 md:h-12 w-auto object-contain"
                      fallback={
                        <div className="text-sm font-extrabold tracking-wide text-[#051821]">
                          {p.name.split(" (")[0]}
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <Container>
          <SectionTitle
            kicker="Contact"
            title="Let’s talk feasibility."
            sub="Send a brief note and we’ll route it to the right person."
          />

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-black/5 bg-[#051821] p-8 md:p-10 text-white">
              <div className="flex items-center gap-3">
                <Mail className="text-[#9be3c0]" />
                <div className="text-xl font-extrabold">Sponsor inquiries</div>
              </div>
              <p className="mt-4 text-white/70 leading-relaxed">
                If you’re a sponsor, CRO, or innovation partner, we can share our capability overview, typical timelines, and how we operationalize quality.
              </p>
              <div className="mt-7 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="text-[#2C6E59]" size={18} />
                  <span>{BRAND.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="text-[#2C6E59]" size={18} />
                  <span>{BRAND.city}</span>
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-xs font-black tracking-widest text-white/60">
                  PREFERRED FIRST MESSAGE
                </div>
                <ul className="mt-3 space-y-2 text-sm text-white/75">
                  {[
                    "Protocol synopsis (or therapeutic area + phase)",
                    "Target timelines and enrollment goals",
                    "Key procedures + visit burden",
                    "Monitoring cadence / data expectations",
                  ].map((x, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle className="mt-0.5 text-[#9be3c0]" size={16} />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white p-8 md:p-10 shadow-sm">
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Form stub: wire this to your email/CRM (e.g., HubSpot, Formspree, or your backend)."
                  );
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" placeholder="Full name" required />
                  <Field label="Email" type="email" placeholder="name@company.com" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Company" placeholder="Sponsor / CRO" required />
                  <Field label="Role" placeholder="Title" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <SelectField
                    label="Inquiry type"
                    options={[
                      "Capability deck request",
                      "Feasibility discussion",
                      "New partnership",
                      "Other",
                    ]}
                  />
                  <SelectField
                    label="Trial stage"
                    options={["Pre-feasibility", "Start-up", "Active", "Other"]}
                  />
                </div>
                <TextArea
                  label="Message"
                  placeholder="Share protocol basics, timelines, and key procedures."
                  rows={5}
                />
                <Button className="w-full" variant="primary">
                  Send inquiry <ArrowRight size={18} />
                </Button>
                <p className="text-xs text-gray-500">
                  Note: This is a demo form. We’ll connect it to your preferred inbox/CRM.
                </p>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-[#020b0f] text-white/70 border-t border-white/10">
        <Container className="py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <ImageWithFallback
                  src={BRAND.logoSrc}
                  alt="Carum Research"
                  className="h-9 w-auto object-contain rounded-md"
                  fallback={<CarumMarkFallback />}
                />
              </div>
              <div className="mt-2 text-xs tracking-wide text-white/50">
                Sponsor-focused clinical research operations.
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                className="px-4 py-2"
                onClick={() => setDeckOpen(true)}
              >
                <FileText size={16} /> Deck
              </Button>
              <Button
                variant="primary"
                className="px-4 py-2"
                onClick={() => setFeasOpen(true)}
              >
                Partner With Us <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/45">
            <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
            <div className="flex items-center gap-5">
              {NAV.slice(0, 5).map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="hover:text-white/80"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </footer>

      {/* Modals */}
      <Modal
        open={deckOpen}
        onClose={() => setDeckOpen(false)}
        title="Request capability deck"
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          This is a sponsor-facing “fast start” request. You can connect this to email, HubSpot, or any CRM.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <Field label="Name" placeholder="Full name" required />
          <Field label="Email" type="email" placeholder="name@company.com" required />
          <Field label="Company" placeholder="Sponsor / CRO" required />
          <SelectField
            label="Primary interest"
            options={["CNS", "Rare disease", "Digital health", "Other"]}
          />
        </div>
        <div className="mt-4">
          <TextArea
            label="Notes"
            placeholder="Optional: protocol basics, phase, timelines."
            rows={4}
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setDeckOpen(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setDeckOpen(false);
              alert(
                "Stub: wire to your email/CRM. We can also generate a one-page PDF capability deck."
              );
            }}
          >
            Submit
          </Button>
        </div>
      </Modal>

      <Modal
        open={feasOpen}
        onClose={() => setFeasOpen(false)}
        title="Start a feasibility conversation"
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          Tell us the trial basics and we’ll respond with feasibility feedback and the next-best step.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <Field label="Name" placeholder="Full name" required />
          <Field label="Email" type="email" placeholder="name@company.com" required />
          <Field label="Company" placeholder="Sponsor / CRO" required />
          <Field label="Therapeutic area" placeholder="e.g., Neurology" />
          <Field label="Phase" placeholder="e.g., II" />
          <Field label="Target start" placeholder="e.g., Q1 2026" />
        </div>
        <div className="mt-4">
          <TextArea
            label="Protocol / scope summary"
            placeholder="Key procedures, visit frequency, target enrollment, and any special requirements."
            rows={5}
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setFeasOpen(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setFeasOpen(false);
              alert("Stub: wire to your email/CRM (or book a calendly link).");
            }}
          >
            Send
          </Button>
        </div>
      </Modal>
    </div>
  );
}

// -------------------------
// Form fields
// -------------------------

function Field({ label, type = "text", placeholder, required }) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-black uppercase tracking-widest text-gray-500">
        {label} {required ? <span className="text-[#2C6E59]">*</span> : null}
      </div>
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-gray-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2C6E59]/40"
      />
    </label>
  );
}

function SelectField({ label, options }) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-black uppercase tracking-widest text-gray-500">
        {label}
      </div>
      <select className="w-full rounded-2xl border border-black/10 bg-gray-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2C6E59]/40">
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, placeholder, rows = 4 }) {
  return (
    <label className="block">
      <div className="mb-1 text-[11px] font-black uppercase tracking-widest text-gray-500">
        {label}
      </div>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-gray-50 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#2C6E59]/40"
      />
    </label>
  );
}
