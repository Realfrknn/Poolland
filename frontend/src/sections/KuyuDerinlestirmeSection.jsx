import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { SceneFrame, LazyDerin } from "@/scenes/SceneFrame";
import useQualityTier from "@/hooks/useQualityTier";
import { SERVICES } from "@/lib/data";

export default function KuyuDerinlestirmeSection() {
  const quality = useQualityTier();
  const svc = SERVICES.find((s) => s.slug === "kuyu-derinlestirme");
  const ref = useRef(null);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
      setDepth(Math.round(progress * 120));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} id="kuyu-derinlestirme" data-testid="kuyu-derinlestirme-section" style={{ padding: "140px 0", position: "relative", background: "#1B2229", color: "#F4F6F8", overflow: "hidden" }}>
      {/* subtle vertical rule on right */}
      <div style={{ position: "absolute", right: 48, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.08)" }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-12 gap-6 lg:gap-10 relative">
        <div className="col-span-12 lg:col-span-5 lg:sticky top-24">
          <Reveal>
            <div className="chapter-index" style={{ color: "rgba(255,255,255,0.5)" }}>Bölüm 02 · Derinleştirme</div>
            <h2 style={{ fontSize: "clamp(34px, 5vw, 60px)", margin: "16px 0 0", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05, color: "#F4F6F8" }}>
              Damara ulaşana dek
              <br />
              <span style={{ fontStyle: "italic" }}>metre metre.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ marginTop: 22, color: "rgba(244,246,248,0.72)", fontSize: 16, lineHeight: 1.7 }}>
              {svc.short} Hava hiltisi ile sert kaya katmanını parcalar, katman bazlı ilerleme raporu tutar, su seviyesini dogrulariz.
            </p>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7 relative">
          <Reveal delay={180}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              {/* depth ruler */}
              <div style={{ width: 58, paddingTop: 8, borderLeft: "1px solid rgba(255,255,255,0.12)" }} data-testid="depth-ruler">
                {Array.from({ length: 13 }).map((_, i) => (
                  <div key={i} style={{ height: 36, display: "flex", alignItems: "center", gap: 8, paddingLeft: 10 }}>
                    <span style={{ width: i % 2 === 0 ? 12 : 6, height: 1, background: "rgba(255,255,255,0.35)" }} />
                    {i % 2 === 0 && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>{i * 10}m</span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ flex: 1, position: "relative", aspectRatio: "3/4", borderRadius: 22, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#0F1419" }}>
                <SceneFrame loader={LazyDerin} quality={quality} fallbackLabel="Sahne hazırlanıyor" />
                <div style={{ position: "absolute", top: 16, left: 16, zIndex: 3 }}>
                  <span className="label-mono" style={{ color: "rgba(255,255,255,0.72)" }}>Kuyu D-0231</span>
                </div>
                <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end", zIndex: 3 }}>
                  <div>
                    <div className="label-mono" style={{ color: "rgba(255,255,255,0.6)" }}>Anlık Derinlik</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: "#F4F6F8" }} data-testid="live-depth">{depth.toFixed(1)} m</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="label-mono" style={{ color: "rgba(255,255,255,0.6)" }}>Katman</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#F4F6F8" }}>Kalker · Kum taşı</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
              {svc.highlights.map((h, i) => (
                <div key={i} style={{ padding: 16, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, background: "rgba(255,255,255,0.03)" }}>
                  <div className="label-mono" style={{ color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ fontSize: 14, color: "#F4F6F8", lineHeight: 1.5 }}>{h}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
