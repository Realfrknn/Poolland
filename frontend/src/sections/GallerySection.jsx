import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, GripHorizontal } from "lucide-react";
import Reveal from "@/components/Reveal";
import { GALLERY, BEFORE_AFTER } from "@/lib/data";

export default function GallerySection() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openAt = (i) => { setIdx(i); setOpen(true); };
  const close = () => setOpen(false);
  const next = () => setIdx((i) => (i + 1) % GALLERY.length);
  const prev = () => setIdx((i) => (i - 1 + GALLERY.length) % GALLERY.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Distribute into columns based on breakpoint
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w >= 1280 ? 4 : w >= 768 ? 3 : 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const columns = Array.from({ length: cols }, () => []);
  GALLERY.forEach((item, i) => columns[i % cols].push({ ...item, index: i }));

  return (
    <section id="galeri" data-testid="masonry-gallery-section" style={{ padding: "120px 0", background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
          <Reveal>
            <div>
              <div className="chapter-index">II · Galeri</div>
              <h2 style={{ fontSize: "clamp(34px, 5vw, 60px)", margin: "14px 0 0", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                Sahadan kareler.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ maxWidth: 360, color: "var(--muted-color)", fontSize: 15, lineHeight: 1.65 }}>
              Her kare bir projeye, bir çözüme, bir saha gününe ait. Yakınlaşmak için tıklayın.
            </p>
          </Reveal>
        </div>

        {/* Before/After showcase */}
        <Reveal>
          <BeforeAfter before={BEFORE_AFTER.before} after={BEFORE_AFTER.after} />
        </Reveal>

        <div style={{ height: 40 }} />

        {/* Masonry grid */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 12 }} data-testid="masonry-grid">
          {columns.map((col, ci) => (
            <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {col.map((it) => (
                <button
                  key={it.id}
                  onClick={() => openAt(it.index)}
                  data-testid={`gallery-item-${it.index}-button`}
                  data-cursor="media"
                  data-cursor-label="Görüntüle"
                  style={{
                    position: "relative", padding: 0, border: 0, background: "transparent",
                    borderRadius: 14, overflow: "hidden", cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(14,17,20,0.05)",
                    transition: "box-shadow 400ms",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 22px 50px rgba(14,17,20,0.18)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 10px 30px rgba(14,17,20,0.05)"; }}
                >
                  <img
                    src={it.src}
                    alt={it.caption}
                    loading="lazy"
                    style={{
                      display: "block", width: "100%", height: "auto", aspectRatio: `${it.h > 450 ? "4/5" : it.h > 380 ? "1/1" : "4/3"}`,
                      objectFit: "cover",
                      filter: "grayscale(22%) contrast(1.02) brightness(0.98)",
                      transition: "transform 900ms cubic-bezier(0.22,1,0.36,1), filter 600ms ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.filter = "grayscale(0%) contrast(1.02) brightness(1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "grayscale(22%) contrast(1.02) brightness(0.98)"; }}
                  />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px 12px",
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 100%)",
                    color: "#F4F6F8", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase",
                    opacity: 0, transition: "opacity 300ms",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = 0; }}>
                    {it.caption}
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          data-testid="gallery-lightbox"
          role="dialog" aria-modal="true"
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            background: "rgba(11,14,17,0.94)", backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <button onClick={close} data-testid="gallery-lightbox-close" aria-label="Kapat" style={{ position: "absolute", top: 22, right: 22, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", borderRadius: 999, padding: 10, cursor: "pointer" }}>
            <X size={18} />
          </button>
          <button onClick={prev} data-testid="gallery-lightbox-prev" aria-label="Önceki" style={{ position: "absolute", left: 18, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", borderRadius: 999, padding: 12, cursor: "pointer" }}><ChevronLeft size={20} /></button>
          <button onClick={next} data-testid="gallery-lightbox-next" aria-label="Sonraki" style={{ position: "absolute", right: 18, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", color: "#fff", borderRadius: 999, padding: 12, cursor: "pointer" }}><ChevronRight size={20} /></button>
          <div style={{ maxWidth: "90vw", maxHeight: "86vh", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <img src={GALLERY[idx].src} alt={GALLERY[idx].caption} style={{ maxWidth: "100%", maxHeight: "76vh", objectFit: "contain", borderRadius: 10 }} />
            <div className="label-mono" style={{ color: "rgba(255,255,255,0.65)" }}>{GALLERY[idx].caption} · {idx + 1} / {GALLERY.length}</div>
          </div>
        </div>
      )}
    </section>
  );
}

function BeforeAfter({ before, after }) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef(null);
  const drag = useRef(false);

  const updatePos = (clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <div
      ref={wrapRef}
      data-testid="before-after-slider"
      data-cursor="drag"
      onMouseDown={(e) => { drag.current = true; updatePos(e.clientX); }}
      onMouseMove={(e) => { if (drag.current) updatePos(e.clientX); }}
      onMouseUp={() => { drag.current = false; }}
      onMouseLeave={() => { drag.current = false; }}
      onTouchStart={(e) => { drag.current = true; updatePos(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (drag.current) updatePos(e.touches[0].clientX); }}
      onTouchEnd={() => { drag.current = false; }}
      style={{
        position: "relative", width: "100%", aspectRatio: "21/9", borderRadius: 20, overflow: "hidden",
        border: "1px solid var(--line)", userSelect: "none", cursor: "ew-resize",
      }}
    >
      <img src={after} alt="Sonrası" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, width: `${pos}%`, overflow: "hidden" }}>
        <img src={before} alt="Öncesi" style={{ width: "100vw", maxWidth: "none", height: "100%", objectFit: "cover" }} />
      </div>
      {/* labels */}
      <div style={{ position: "absolute", top: 14, left: 14, padding: "6px 10px", borderRadius: 999, background: "rgba(14,17,20,0.55)", color: "#F4F6F8", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>Öncesi</div>
      <div style={{ position: "absolute", top: 14, right: 14, padding: "6px 10px", borderRadius: 999, background: "rgba(14,17,20,0.55)", color: "#F4F6F8", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>Sonrası</div>
      {/* handle */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: `${pos}%`, width: 2, background: "rgba(255,255,255,0.9)", transform: "translateX(-1px)", boxShadow: "0 0 20px rgba(0,0,0,0.3)" }} />
      <div style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%, -50%)", width: 44, height: 44, borderRadius: 999, background: "rgba(255,255,255,0.95)", border: "1px solid rgba(14,17,20,0.2)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
        <GripHorizontal size={18} />
      </div>
    </div>
  );
}
