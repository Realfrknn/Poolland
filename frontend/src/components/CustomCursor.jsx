import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    document.documentElement.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const setState = (state, labelText) => {
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!ring) return;
      ring.dataset.state = state;
      if (label) label.textContent = labelText || "";
    };

    const onOver = (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        const type = t.getAttribute('data-cursor');
        const text = t.getAttribute('data-cursor-label') || "";
        setState(type, text);
      } else if (e.target.closest('a, button')) {
        setState('link', '');
      } else {
        setState('default', '');
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        data-testid="custom-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: 999,
          background: "#0E1114",
          zIndex: 99999,
          pointerEvents: "none",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        data-testid="custom-cursor-ring"
        className="deriner-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 34,
          height: 34,
          marginLeft: -17,
          marginTop: -17,
          borderRadius: 999,
          border: "1px solid rgba(14,17,20,0.35)",
          zIndex: 99998,
          pointerEvents: "none",
          transition: "width 220ms cubic-bezier(0.22,1,0.36,1), height 220ms cubic-bezier(0.22,1,0.36,1), border-color 220ms, background 220ms, margin 220ms",
          backdropFilter: "invert(0.02)",
        }}
      >
        <span
          ref={labelRef}
          style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#0E1114",
          }}
        />
      </div>
      <style>{`
        .deriner-cursor-ring[data-state='link'] { width: 54px; height: 54px; margin-left: -27px; margin-top: -27px; border-color: rgba(14,17,20,0.65); }
        .deriner-cursor-ring[data-state='media'] { width: 74px; height: 74px; margin-left: -37px; margin-top: -37px; background: rgba(246,244,239,0.85); border-color: rgba(14,17,20,0.6); }
        .deriner-cursor-ring[data-state='drag']  { width: 70px; height: 70px; margin-left: -35px; margin-top: -35px; border-color: rgba(47,111,143,0.8); }
      `}</style>
    </>
  );
}
