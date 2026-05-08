import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/lib/data";

export default function CinematicLoader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [tagline, setTagline] = useState(false);
  const timers = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const quick = prefersReduced;

    // Body lock
    document.body.style.overflow = "hidden";

    timers.current.push(setTimeout(() => setRevealed(true), quick ? 100 : 900));
    timers.current.push(setTimeout(() => setTagline(true), quick ? 300 : 2000));
    timers.current.push(setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      onComplete?.();
    }, quick ? 900 : 3400));

    return () => {
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  const handleSkip = () => {
    timers.current.forEach(clearTimeout);
    setRevealed(true);
    setTagline(true);
    setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      onComplete?.();
    }, 250);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cinematic-loader"
      aria-hidden={!visible}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 900ms cubic-bezier(0.76, 0, 0.24, 1)",
        background: "radial-gradient(ellipse at 50% 40%, #EEEAE1 0%, #E7E3DA 55%, #D9D7D2 100%)",
        overflow: "hidden",
      }}
    >
      {/* Stone texture layer */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('https://images.unsplash.com/photo-1591095475424-715e1a00a3c6?auto=format&fit=crop&w=1800&q=60')",
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: 0.22, mixBlendMode: "multiply", filter: "blur(2px)",
      }} />
      {/* Dust particles */}
      <LoaderParticles />
      {/* Volumetric light sweep */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0) 70%)",
        transform: revealed ? "translateX(100%)" : "translateX(-100%)",
        transition: "transform 2200ms cubic-bezier(0.22,1,0.36,1)",
        mixBlendMode: "screen",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        {/* Logo reveal mask */}
        <div
          style={{
            position: "relative",
            fontFamily: "var(--font-display)", fontSize: "clamp(56px, 11vw, 140px)",
            letterSpacing: "0.03em", fontWeight: 300,
            color: "#0E1114",
            WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 100%)",
            clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
            transition: "clip-path 1400ms cubic-bezier(0.76, 0, 0.24, 1)",
          }}
        >
          <span style={{ display: "inline-block" }}>D E R İ N E R</span>
          <span style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0) 35%)",
            mixBlendMode: "overlay", pointerEvents: "none",
            opacity: revealed ? 1 : 0, transition: "opacity 1200ms 400ms",
          }} />
        </div>

        <div
          style={{
            marginTop: 20, overflow: "hidden",
            fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase",
            color: "var(--muted-color)",
          }}
        >
          <div style={{
            transform: tagline ? "translateY(0)" : "translateY(110%)",
            transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)",
          }}>
            {CONTACT.tagline}
          </div>
        </div>
      </div>

      <button
        onClick={handleSkip}
        data-testid="cinematic-loader-skip-button"
        style={{
          position: "absolute", bottom: 28, right: 28, zIndex: 5,
          background: "transparent", border: "1px solid rgba(14,17,20,0.25)", padding: "8px 16px", borderRadius: 999,
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink)",
          cursor: "pointer",
          opacity: tagline ? 1 : 0, transition: "opacity 600ms 800ms",
        }}
      >
        Atla
      </button>

      <div style={{
        position: "absolute", bottom: 28, left: 28,
        fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--muted-2)",
      }}>
        KKTC · Est. 2002
      </div>
    </div>
  );
}

function LoaderParticles() {
  const particles = Array.from({ length: 36 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    s: Math.random() * 2 + 0.5,
    d: Math.random() * 6 + 6,
    del: Math.random() * 2,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "multiply" }}>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.s, height: p.s, borderRadius: 999,
            background: "rgba(14,17,20,0.35)",
            animation: `loaderDrift ${p.d}s ease-in-out ${p.del}s infinite alternate`,
            filter: "blur(0.4px)",
          }}
        />
      ))}
      <style>{`@keyframes loaderDrift { from { transform: translate3d(0,0,0); opacity: 0.15; } to { transform: translate3d(20px,-30px,0); opacity: 0.65; } }`}</style>
    </div>
  );
}
