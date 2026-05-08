import Reveal from "@/components/Reveal";
import { SceneFrame, LazyYatay } from "@/scenes/SceneFrame";
import useQualityTier from "@/hooks/useQualityTier";
import { SERVICES } from "@/lib/data";

export default function YataySondajSection() {
  const quality = useQualityTier();
  const svc = SERVICES.find((s) => s.slug === "yatay-sondaj");
  return (
    <section id="yatay-sondaj" data-testid="yatay-sondaj-section" style={{ padding: "140px 0", position: "relative", background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="col-span-12 lg:col-span-5 lg:sticky top-24">
            <Reveal>
              <div className="chapter-index">Bölüm 01 · Yatay Sondaj</div>
              <h2 style={{ fontSize: "clamp(34px, 5vw, 60px)", margin: "16px 0 0", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                Yüzeye zarar vermeden
                <br />
                <span style={{ fontStyle: "italic" }}>altyapı geçişi.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ marginTop: 22, color: "var(--muted-color)", fontSize: 16, lineHeight: 1.7 }}>
                {svc.short} Yüksek basınçlı su + hava sistemi ile kaya ve beton zeminde hassas ilerleriz. Yol, bahçe, beton korunur; saha teslim edildiğinde hiçbir iz kalmaz.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0", borderTop: "1px solid var(--line)" }}>
                {svc.highlights.map((h, i) => (
                  <li key={i} style={{ padding: "14px 0", borderBottom: "1px solid var(--line)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span className="chapter-index" style={{ minWidth: 32 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: 15, color: "var(--ink)" }}>{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={200}>
              <div
                data-cursor="media"
                data-cursor-label="Yakınlaş"
                style={{
                  position: "relative", aspectRatio: "4/3", borderRadius: 24, overflow: "hidden",
                  border: "1px solid var(--line)", background: "var(--surface)",
                  boxShadow: "0 24px 70px rgba(14,17,20,0.12)",
                }}
              >
                <SceneFrame loader={LazyYatay} quality={quality} fallbackLabel="Yatay sondaj sahnesi hazırlanıyor" />
                <div style={{ position: "absolute", top: 16, left: 16, zIndex: 3 }}>
                  <span className="label-mono">Ölçek 1:20 · Hat 18 m</span>
                </div>
                <div style={{ position: "absolute", bottom: 16, right: 16, zIndex: 3, textAlign: "right" }}>
                  <div className="label-mono">Basınç</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>7.2 bar</div>
                </div>
              </div>
            </Reveal>

            {/* Horizontal spec rail */}
            <Reveal delay={340}>
              <div
                style={{
                  marginTop: 18, border: "1px solid var(--line)", borderRadius: 16,
                  background: "var(--surface)",
                  overflowX: "auto", WebkitOverflowScrolling: "touch",
                }}
                data-testid="yatay-sondaj-spec-rail"
              >
                <div style={{ display: "flex", minWidth: 720, padding: "18px 22px", gap: 40 }}>
                  {[
                    { k: "Maks. Mesafe", v: "± 60 m" },
                    { k: "Zemin Tipi", v: "Kaya · Beton · Toprak" },
                    { k: "Çap Aralığı", v: "Ø 32 – Ø 200 mm" },
                    { k: "Hazırlık", v: "Yarım gün" },
                    { k: "Min. İz", v: "Yüzey korunur" },
                  ].map((s, i) => (
                    <div key={i} style={{ whiteSpace: "nowrap" }}>
                      <div className="label-mono">{s.k}</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, marginTop: 4 }}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
