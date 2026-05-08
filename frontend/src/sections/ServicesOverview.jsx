import { SERVICES } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";
import { getLenis } from "@/hooks/useLenis";

export default function ServicesOverview() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -60, duration: 1.3 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" data-testid="services-overview-section" style={{ padding: "120px 0", position: "relative", background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 50 }}>
          <Reveal>
            <div>
              <div className="chapter-index">I · Hizmetler</div>
              <h2 style={{ fontSize: "clamp(36px, 5vw, 64px)", margin: "14px 0 0", fontWeight: 300, letterSpacing: "-0.02em", maxWidth: 720, lineHeight: 1.05 }}>
                Kuyu mühendisliğinin
                <br />
                <span style={{ fontStyle: "italic" }}>altı farklı disiplini.</span>
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p style={{ maxWidth: 360, color: "var(--muted-color)", fontSize: 15, lineHeight: 1.65 }}>
              Her projeyi kendi saha koşullarında çözüyoruz. Yatay sondajdan beton muhafazaya, saha etüdünden son teslime.
            </p>
          </Reveal>
        </div>

        {/* Bento-style grid with varied spans */}
        <div className="grid grid-cols-12 gap-4 md:gap-5">
          {SERVICES.map((svc, i) => {
            const spanMap = [
              "col-span-12 md:col-span-7",
              "col-span-12 md:col-span-5",
              "col-span-12 md:col-span-4",
              "col-span-12 md:col-span-4",
              "col-span-12 md:col-span-4",
              "col-span-12",
            ];
            const heightMap = [360, 300, 280, 280, 280, 260];
            return (
              <Reveal key={svc.slug} delay={i * 60} className={spanMap[i]}>
                <a
                  href={`#${svc.slug}`}
                  onClick={scrollTo(svc.slug)}
                  data-testid={`services-card-${svc.slug}`}
                  data-cursor="link"
                  data-cursor-label="Aç"
                  style={{
                    position: "relative", display: "block", height: heightMap[i],
                    borderRadius: 20, overflow: "hidden", textDecoration: "none",
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    boxShadow: "0 10px 30px rgba(14,17,20,0.05)",
                    transition: "box-shadow 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1), border-color 400ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 22px 56px rgba(14,17,20,0.12)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.borderColor = "var(--ink)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(14,17,20,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "var(--line)";
                  }}
                >
                  <ServicePattern slug={svc.slug} accent={svc.accent} />
                  <div style={{ position: "absolute", inset: 0, padding: 26, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span className="chapter-index">{svc.code}</span>
                      <ArrowUpRight size={22} strokeWidth={1.4} color="var(--ink)" />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.6vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0, lineHeight: 1.08 }}>
                        {svc.title}
                      </h3>
                      <p style={{ marginTop: 10, color: "var(--muted-color)", fontSize: 14, lineHeight: 1.6, maxWidth: 480 }}>
                        {svc.short}
                      </p>
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServicePattern({ slug, accent }) {
  switch (slug) {
    case "yatay-sondaj":
      return (
        <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45 }}>
          <defs>
            <pattern id="grid-ys" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" fill="none" stroke={accent} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-ys)" />
          <line x1="0%" y1="72%" x2="100%" y2="72%" stroke="#0E1114" strokeWidth="0.6" strokeDasharray="2 6" />
        </svg>
      );
    case "kuyu-derinlestirme":
      return (
        <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45 }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1="88%" y1={`${8 + i * 6}%`} x2="96%" y2={`${8 + i * 6}%`} stroke={accent} strokeWidth="0.8" />
          ))}
          <line x1="92%" y1="8%" x2="92%" y2="92%" stroke="#0E1114" strokeWidth="0.6" />
        </svg>
      );
    case "kuyu-guclendirme":
      return (
        <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.55 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <circle key={i} cx="86%" cy="50%" r={18 + i * 18} fill="none" stroke={accent} strokeWidth="0.6" />
          ))}
        </svg>
      );
    case "kuyu-temizleme":
      return (
        <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={i} d={`M0 ${30 + i * 10} Q 25 ${25 + i * 10} 50 ${30 + i * 10} T 100 ${30 + i * 10}`} fill="none" stroke={accent} strokeWidth="0.5" transform={`translate(0 ${i * 2})`} style={{ transformOrigin: "0 0" }} />
          ))}
        </svg>
      );
    case "su-kuyusu-acma":
      return (
        <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}>
          <path d="M10 80 Q 30 20 55 45 T 95 30" fill="none" stroke={accent} strokeWidth="0.6" strokeDasharray="3 3" />
          <circle cx="95%" cy="30%" r="4" fill={accent} />
          <circle cx="10%" cy="80%" r="3" fill="none" stroke="#0E1114" strokeWidth="0.8" />
        </svg>
      );
    case "tuvalet-kuyusu-kanal":
    default:
      return (
        <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.45 }}>
          <line x1="6%" y1="50%" x2="94%" y2="50%" stroke={accent} strokeWidth="0.8" />
          <rect x="42%" y="40%" width="16%" height="20%" fill="none" stroke="#0E1114" strokeWidth="0.6" />
          <circle cx="20%" cy="50%" r="6" fill="none" stroke={accent} strokeWidth="0.6" />
          <circle cx="80%" cy="50%" r="6" fill="none" stroke={accent} strokeWidth="0.6" />
        </svg>
      );
  }
}
