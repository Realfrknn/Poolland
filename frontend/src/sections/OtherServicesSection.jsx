import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/data";
import { useState } from "react";
import { Droplets, MapPin, Hammer, ChevronDown } from "lucide-react";
import { getLenis } from "@/hooks/useLenis";

export default function OtherServicesSection() {
  const temizleme = SERVICES.find((s) => s.slug === "kuyu-temizleme");
  const suKuyusu = SERVICES.find((s) => s.slug === "su-kuyusu-acma");
  const tuvalet = SERVICES.find((s) => s.slug === "tuvalet-kuyusu-kanal");
  const [ripple, setRipple] = useState({ x: 50, y: 50 });
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="diger-hizmetler" data-testid="diger-hizmetler-section" style={{ padding: "120px 0", background: "var(--bg-2)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Temizleme — ripple hero strip */}
        <Reveal>
          <div id="kuyu-temizleme"
            data-testid="kuyu-temizleme-section"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setRipple({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
            }}
            style={{
              position: "relative",
              borderRadius: 26, overflow: "hidden",
              border: "1px solid var(--line)",
              background: "linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%)",
              padding: "56px 40px",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "42%",
              background: `radial-gradient(600px circle at ${ripple.x}% ${ripple.y}%, rgba(47,111,143,0.18), transparent 60%)`,
              transition: "background 300ms ease",
              pointerEvents: "none",
            }} />
            <div className="grid grid-cols-12 gap-6 relative">
              <div className="col-span-12 md:col-span-7">
                <div className="chapter-index"><Droplets size={11} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} /> Bölüm 04 · Kuyu Temizleme</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "12px 0 0" }}>
                  Debiyi ve berraklığı
                  <br /><span style={{ fontStyle: "italic" }}>yeniden kazandırın.</span>
                </h3>
                <p style={{ marginTop: 16, color: "var(--muted-color)", fontSize: 15, lineHeight: 1.65, maxWidth: 520 }}>{temizleme.short}</p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 18, background: "var(--surface)" }}>
                  <div className="label-mono">Ölcum · Oncesi / Sonrası</div>
                  <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div style={{ padding: 14, borderRadius: 10, background: "#E7E3DA" }}>
                      <div className="label-mono">Öncesi</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, marginTop: 4 }}>0.6 L/sn</div>
                    </div>
                    <div style={{ padding: 14, borderRadius: 10, background: "#CFE0EA" }}>
                      <div className="label-mono">Sonrası</div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, marginTop: 4, color: "#1F4F66" }}>2.1 L/sn</div>
                    </div>
                  </div>
                  <ul style={{ marginTop: 16, padding: 0, listStyle: "none", fontSize: 13, color: "var(--muted-color)" }}>
                    {temizleme.highlights.map((h, i) => (
                      <li key={i} style={{ padding: "6px 0", borderTop: i === 0 ? "1px solid var(--line)" : "none" }}>— {h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Su kuyusu acma - stepper with map grid */}
        <div style={{ height: 36 }} />
        <Reveal>
          <div id="su-kuyusu-acma" data-testid="su-kuyusu-acma-section"
            style={{
              position: "relative", borderRadius: 26, overflow: "hidden",
              border: "1px solid var(--line)", background: "#0E1114", color: "#F4F6F8",
              padding: "56px 40px",
            }}
          >
            <MapGrid />
            <div className="grid grid-cols-12 gap-6 relative">
              <div className="col-span-12 md:col-span-5">
                <div className="chapter-index" style={{ color: "rgba(255,255,255,0.5)" }}><MapPin size={11} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} /> Bölüm 05 · Su Kuyusu Açma</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "12px 0 0" }}>
                  Arazi etüdünden teslime
                  <br /><span style={{ fontStyle: "italic" }}>tam süreç.</span>
                </h3>
                <p style={{ marginTop: 16, color: "rgba(244,246,248,0.72)", fontSize: 15, lineHeight: 1.65 }}>{suKuyusu.short}</p>
              </div>
              <div className="col-span-12 md:col-span-7">
                <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
                  {[
                    { t: "Saha Etüdü", d: "Zemin ve yeraltı suyu değerlendirmesi." },
                    { t: "Planlama", d: "Çap, derinlik ve muhafaza seçimi." },
                    { t: "Sondaj", d: "Zemin tipine göre hassas ilerleme." },
                    { t: "Muhafaza", d: "Boru kağıtlama ve koruma uygulaması." },
                    { t: "Debi Testi", d: "Gercek sahada su verimi doğrulama." },
                  ].map((st, i) => (
                    <li key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", minWidth: 28 }}>0{i + 1}</span>
                      <span style={{ width: 1, height: 28, background: "rgba(255,255,255,0.1)" }} />
                      <div>
                        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "-0.01em" }}>{st.t}</div>
                        <div style={{ fontSize: 13, color: "rgba(244,246,248,0.6)", marginTop: 2 }}>{st.d}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Tuvalet kuyusu & kanal - diagram + accordion */}
        <div style={{ height: 36 }} />
        <Reveal>
          <div id="tuvalet-kuyusu-kanal" data-testid="tuvalet-kuyusu-kanal-section"
            style={{ position: "relative", borderRadius: 26, overflow: "hidden", border: "1px solid var(--line)", background: "var(--surface)", padding: "56px 40px" }}
          >
            <div className="grid grid-cols-12 gap-6 relative items-start">
              <div className="col-span-12 md:col-span-6">
                <div className="chapter-index"><Hammer size={11} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} /> Bölüm 06 · Tuvalet Kuyusu ve Kanal</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 42px)", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "12px 0 0" }}>
                  Standartlara uygun
                  <br /><span style={{ fontStyle: "italic" }}>fosseptik ve kanal bağlantısı.</span>
                </h3>
                <p style={{ marginTop: 14, color: "var(--muted-color)", fontSize: 15, lineHeight: 1.65, maxWidth: 480 }}>{tuvalet.short}</p>
                <SchematicSVG active={openIdx} />
              </div>
              <div className="col-span-12 md:col-span-6">
                {[
                  { t: "Zemin hazırlığı ve ölçümleme", d: "Uygun derinlik, kotlama ve eğim hesabı." },
                  { t: "Fosseptik yapı", d: "Sızdırmaz, standartlara uyumlu fosseptik." },
                  { t: "Kanal bağlantısı", d: "Yönetmelik ve şehir alt yapısına uyumlu." },
                  { t: "Teslim ve belge", d: "Bağlantı raporu ve bakım önerileri." },
                ].map((it, i) => (
                  <button
                    key={i}
                    onClick={() => setOpenIdx(i)}
                    data-testid={`tuvalet-accordion-${i}`}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "18px 18px", borderRadius: 14,
                      background: openIdx === i ? "var(--bg-2)" : "transparent",
                      border: "1px solid var(--line)", marginBottom: 10,
                      transition: "background 320ms",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 17, color: "var(--ink)", letterSpacing: "-0.01em" }}>{it.t}</span>
                      <ChevronDown size={16} style={{ transform: openIdx === i ? "rotate(180deg)" : "rotate(0)", transition: "transform 320ms" }} />
                    </div>
                    <div style={{ maxHeight: openIdx === i ? 80 : 0, overflow: "hidden", transition: "max-height 420ms cubic-bezier(0.22,1,0.36,1)" }}>
                      <p style={{ fontSize: 13, color: "var(--muted-color)", marginTop: 8, lineHeight: 1.55 }}>{it.d}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MapGrid() {
  return (
    <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }}>
      <defs>
        <pattern id="mg" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mg)" />
      <path d="M5% 75% Q 30% 20%, 55% 45% T 95% 30%" fill="none" stroke="#6FB0C9" strokeWidth="1" strokeDasharray="4 4" />
    </svg>
  );
}

function SchematicSVG({ active }) {
  const colors = ["#AFC7D6", "#2F6F8F", "#5B6672", "#1B2229"];
  return (
    <svg viewBox="0 0 400 180" style={{ width: "100%", marginTop: 26, borderRadius: 12, background: "var(--bg-2)", border: "1px solid var(--line)" }}>
      <rect x="10" y="90" width="80" height="70" fill="none" stroke={active === 1 ? colors[1] : "#5B6672"} strokeWidth="1" />
      <text x="50" y="175" textAnchor="middle" fontSize="9" fill="#5B6672" fontFamily="var(--font-mono)">Fosseptik</text>
      <line x1="90" y1="125" x2="310" y2="125" stroke={active === 2 ? colors[1] : "#8E98A3"} strokeWidth="2" />
      <polygon points="308,120 318,125 308,130" fill={active === 2 ? colors[1] : "#8E98A3"} />
      <rect x="320" y="100" width="70" height="50" fill="none" stroke={active === 3 ? colors[1] : "#5B6672"} strokeWidth="1" />
      <text x="355" y="170" textAnchor="middle" fontSize="9" fill="#5B6672" fontFamily="var(--font-mono)">Kanal</text>
      <line x1="0" y1="125" x2="10" y2="125" stroke="#0E1114" strokeWidth="1" />
      <line x1="390" y1="125" x2="400" y2="125" stroke="#0E1114" strokeWidth="1" />
      <text x="200" y="110" textAnchor="middle" fontSize="9" fill="#5B6672" fontFamily="var(--font-mono)">hat %2 eğim</text>
    </svg>
  );
}
