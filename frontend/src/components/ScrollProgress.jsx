import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      const pr = height > 0 ? scrollTop / height : 0;
      setP(pr);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      data-testid="scroll-progress"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 60,
        background: "transparent", pointerEvents: "none",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.round(p * 1000) / 10}%`,
          background: "linear-gradient(90deg, rgba(47,111,143,0.0), rgba(47,111,143,0.9), rgba(169,178,188,0.5))",
          transition: "width 60ms linear",
        }}
      />
    </div>
  );
}
