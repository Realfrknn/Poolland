import { CONTACT } from "@/lib/data";
import { ArrowRight, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SceneFrame, LazyHero } from "@/scenes/SceneFrame";
import useQualityTier from "@/hooks/useQualityTier";
import { getLenis } from "@/hooks/useLenis";

export default function HeroSection() {
  const quality = useQualityTier();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -60, duration: 1.4 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" data-testid="hero-section" className="relative" style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80 }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="col-span-12 lg:col-span-6 relative z-10">
          <Reveal delay={50}>
            <div className="label-mono" style={{ marginBottom: 22 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 26, height: 1, background: "var(--ink)" }} />
                Est. 2002 · KKTC
              </span>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h1
              style={{
                fontSize: "clamp(42px, 6.8vw, 84px)",
                lineHeight: 1.02,
                fontWeight: 300,
                margin: 0,
                color: "var(--ink)",
              }}
            >
              23 yıllık
              <br />
              <span style={{ fontStyle: "italic", fontWeight: 400, display: "inline-block" }}>
                profesyonel
              </span>{" "}
              kuyu
              <br />
              tecrübesi.
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p
              style={{
                marginTop: 26,
                maxWidth: 520,
                color: "var(--muted-color)",
                fontSize: "clamp(15px, 1.2vw, 17px)",
                lineHeight: 1.65,
              }}
            >
              {CONTACT.subcopy} Mühendislik disiplini, doğru ekipman ve sahada kanıtlanmış süreçlerle.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
              <a href="#iletisim" onClick={scrollTo("iletisim")} className="btn-primary" data-testid="hero-request-quote-button" data-cursor="link">
                Teklif Al <ArrowRight size={16} strokeWidth={1.6} />
              </a>
              <a href="#services" onClick={scrollTo("services")} className="btn-ghost" data-testid="hero-view-services-button" data-cursor="link">
                Hizmetleri İncele
              </a>
              <a href={`tel:${CONTACT.phoneTel}`} className="btn-ghost" data-testid="hero-call-button" data-cursor="link" style={{ gap: 8 }}>
                <Phone size={14} /> {CONTACT.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div
              style={{
                marginTop: 56, paddingTop: 26,
                borderTop: "1px solid var(--line)",
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, maxWidth: 520,
              }}
            >
              {[
                { k: "23", v: "yıllık\ntecrübe" },
                { k: "3.500+", v: "tamamlanan\nproje" },
                { k: "KKTC", v: "bölge\ngeneli" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, color: "var(--ink)", letterSpacing: "-0.02em" }}>{s.k}</div>
                  <div className="label-mono" style={{ marginTop: 4, whiteSpace: "pre-line" }}>{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-6 relative">
          <div
            data-cursor="media"
            data-cursor-label="3D Sahne"
            style={{
              position: "relative", aspectRatio: "4/5", width: "100%",
              borderRadius: 28, overflow: "hidden",
              border: "1px solid var(--line)", background: "var(--surface)",
              boxShadow: "0 30px 80px rgba(14,17,20,0.14), inset 0 0 0 1px rgba(255,255,255,0.6)",
            }}
          >
            <SceneFrame loader={LazyHero} quality={quality} fallbackLabel="Saha sahnesi hazırlanıyor" />
            {/* Overlay HUD */}
            <div style={{ position: "absolute", top: 18, left: 18, display: "flex", alignItems: "center", gap: 8, zIndex: 3 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "#2F6F8F", boxShadow: "0 0 0 4px rgba(47,111,143,0.18)" }} />
              <span className="label-mono" style={{ color: "var(--ink)" }}>Saha · Sondaj · Canlı</span>
            </div>
            <div style={{ position: "absolute", bottom: 18, left: 18, right: 18, display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 3 }}>
              <div>
                <div className="label-mono">Proje</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--ink)" }}>D-0231 / KKTC</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="label-mono">Derinlik</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--ink)" }}>42.0 m</div>
              </div>
            </div>
            {/* inner edge */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 28, boxShadow: "inset 0 0 120px rgba(14,17,20,0.12)" }} />
          </div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)" }} className="label-mono">
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-block", width: 1, height: 30, background: "var(--ink)", animation: "scrollHint 1.8s ease-in-out infinite" }} />
          kaydır
        </span>
        <style>{`@keyframes scrollHint { 0%,100%{transform:scaleY(0.3);transform-origin:top} 50%{transform:scaleY(1);transform-origin:top} }`}</style>
      </div>
    </section>
  );
}
