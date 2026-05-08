import Reveal from "@/components/Reveal";
import { STATS, PROCESS } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="hakkimizda" data-testid="about-section" style={{ padding: "140px 0", background: "var(--bg-2)", position: "relative" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-10 items-start">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="chapter-index">III · Hakkımızda</div>
              <h2 style={{ fontSize: "clamp(34px, 5.2vw, 64px)", margin: "14px 0 0", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                Yirmi üç yıl,
                <br />
                <span style={{ fontStyle: "italic" }}>üç bini aşkın</span> kuyu.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ marginTop: 22, color: "var(--muted-color)", fontSize: 16, lineHeight: 1.7 }}>
                DERİNER; mühendislik disiplini, doğru ekipman seçimi ve sahada edinilmiş tecrübeyle KKTC genelinde kuyu çözümleri sunar. Her projeyi kendi saha koşullarında, hesaplanabilir ve belgeli bir süreç olarak yürütürüz.
              </p>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={150}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
                {STATS.map((s, i) => (
                  <div key={i} data-testid={`stat-${i}`} style={{ padding: 22, borderRadius: 16, background: "var(--surface)", border: "1px solid var(--line)" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 4vw, 46px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {s.value}
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, marginLeft: 6, color: "var(--muted-color)", letterSpacing: "0.14em" }}>{s.unit}</span>
                    </div>
                    <div className="label-mono" style={{ marginTop: 10 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Process timeline */}
        <div style={{ height: 60 }} />
        <Reveal>
          <div className="label-mono">Sahada süreç</div>
          <div style={{ marginTop: 14, position: "relative", borderTop: "1px solid var(--line)" }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${PROCESS.length}, 1fr)`, gap: 0 }}>
              {PROCESS.map((p, i) => (
                <div key={p.step} style={{ padding: "28px 18px", borderRight: i < PROCESS.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <div className="chapter-index">{p.step}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, letterSpacing: "-0.02em", marginTop: 10 }}>{p.title}</div>
                  <p style={{ fontSize: 13, color: "var(--muted-color)", marginTop: 8, lineHeight: 1.55 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
