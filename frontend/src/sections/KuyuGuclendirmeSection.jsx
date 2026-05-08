import Reveal from "@/components/Reveal";
import { SceneFrame, LazyGuclendirme } from "@/scenes/SceneFrame";
import useQualityTier from "@/hooks/useQualityTier";
import { SERVICES } from "@/lib/data";

export default function KuyuGuclendirmeSection() {
  const quality = useQualityTier();
  const svc = SERVICES.find((s) => s.slug === "kuyu-guclendirme");
  const samples = [
    { k: "Beton", v: "C25/30", desc: "Yüksek dayanımlı, yeraltı suyuna uyumlu formul." },
    { k: "Donatı", v: "Ø 10–12", desc: "Korozyona karşı epoksi kaplama, halka + düsey profil." },
    { k: "Kalıp", v: "Ø 90 cm", desc: "Yuvarlak modul kalıp, esnek derinlik uyumu." },
  ];

  return (
    <section id="kuyu-guclendirme" data-testid="kuyu-guclendirme-section" style={{ padding: "140px 0", position: "relative", background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="col-span-12 lg:col-span-6 lg:order-2">
          <Reveal>
            <div className="chapter-index">Bölüm 03 · Güçlendirme</div>
            <h2 style={{ fontSize: "clamp(34px, 5vw, 60px)", margin: "16px 0 0", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Çökme riskini
              <br />
              <span style={{ fontStyle: "italic" }}>kalıcı olarak</span> kaldırın.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ marginTop: 22, color: "var(--muted-color)", fontSize: 16, lineHeight: 1.7 }}>
              {svc.short} Yuvarlak kalıp sistemi ve demir donatılı beton muhafaza ile kuyu duvarını onlarca yıl güvenceye alacak yapısal dayanımı kurarız.
            </p>
          </Reveal>

          {/* Material samples as cards that "lock" */}
          <Reveal delay={240}>
            <div style={{ marginTop: 30, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {samples.map((s, i) => (
                <div
                  key={i}
                  data-testid={`guclendirme-sample-${i}`}
                  style={{
                    position: "relative", padding: 18, borderRadius: 14,
                    background: "var(--surface)", border: "1px solid var(--line)",
                    transition: "transform 400ms cubic-bezier(0.22,1,0.36,1), box-shadow 400ms",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(14,17,20,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div className="label-mono">{s.k}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 24, letterSpacing: "-0.02em", marginTop: 6 }}>{s.v}</div>
                  <p style={{ fontSize: 13, color: "var(--muted-color)", marginTop: 10, lineHeight: 1.55 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:order-1">
          <Reveal delay={100}>
            <div
              data-cursor="media"
              style={{
                position: "relative", aspectRatio: "1/1", borderRadius: 24, overflow: "hidden",
                border: "1px solid var(--line)", background: "var(--surface)",
                boxShadow: "0 24px 60px rgba(14,17,20,0.10)",
              }}
            >
              <SceneFrame loader={LazyGuclendirme} quality={quality} fallbackLabel="Muhafaza sahnesi" />
              <div style={{ position: "absolute", top: 16, left: 16, zIndex: 3 }}>
                <span className="label-mono">Beton Muhafaza · Kesit</span>
              </div>
              <div style={{ position: "absolute", bottom: 16, right: 16, zIndex: 3, textAlign: "right" }}>
                <div className="label-mono">Dayanım</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>25 N/mm²</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
