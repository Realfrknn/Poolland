import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV_LINKS, CONTACT } from "@/lib/data";
import useActiveSection from "@/hooks/useActiveSection";
import { getLenis } from "@/hooks/useLenis";

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((n) => n.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -60, duration: 1.3 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        data-testid="site-sticky-nav"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(246,244,239,0.86)" : "rgba(246,244,239,0)",
          backdropFilter: scrolled ? "blur(12px) saturate(120%)" : "none",
          borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
          transition: "background-color 260ms, border-color 260ms, padding 260ms, backdrop-filter 260ms",
          padding: scrolled ? "12px 0" : "20px 0",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <a
            href="#hero"
            onClick={go("hero")}
            data-testid="nav-brand"
            data-cursor="link"
            style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink)" }}
          >
            <span
              aria-hidden
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: "linear-gradient(135deg, #0E1114 0%, #1B2229 55%, #2F6F8F 100%)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), 0 2px 10px rgba(14,17,20,0.15)",
                position: "relative", overflow: "hidden",
              }}
            >
              <span style={{ position: "absolute", inset: 6, borderRadius: 3, background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0))" }} />
            </span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 20, letterSpacing: "0.02em", fontWeight: 500 }}>
              {CONTACT.brand}
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.slice(1, 7).map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={go(n.id)}
                data-testid={`nav-link-${n.id}`}
                data-cursor="link"
                className="link-underline"
                style={{
                  fontSize: 13, color: active === n.id ? "var(--ink)" : "var(--muted-color)",
                  textDecoration: "none", letterSpacing: "0.02em",
                  fontWeight: active === n.id ? 500 : 400,
                }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${CONTACT.phoneTel}`}
              data-testid="nav-phone"
              data-cursor="link"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted-color)", fontSize: 12, fontFamily: "var(--font-mono)", textDecoration: "none", letterSpacing: "0.1em" }}
            >
              <Phone size={12} strokeWidth={1.6} /> {CONTACT.phone}
            </a>
            <a href="#iletisim" onClick={go("iletisim")} className="btn-primary" data-testid="nav-request-quote-button" data-cursor="link">
              Teklif Al
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menü"
            data-testid="nav-mobile-menu-button"
            style={{ background: "transparent", border: "1px solid var(--line-2)", borderRadius: 999, padding: 10 }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        data-testid="nav-mobile-sheet"
        style={{
          position: "fixed", inset: 0, zIndex: 49,
          background: "rgba(246,244,239,0.98)",
          transform: open ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 500ms cubic-bezier(0.22,1,0.36,1)",
          paddingTop: 88,
        }}
      >
        <div className="px-6 pb-8 h-full overflow-auto">
          <div className="label-mono" style={{ marginBottom: 18 }}>Menü</div>
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={go(n.id)}
                data-testid={`nav-mobile-link-${n.id}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 34, letterSpacing: "-0.02em", color: "var(--ink)",
                  textDecoration: "none", fontWeight: 400,
                }}
              >
                {n.label}
              </a>
            ))}
          </div>
          <div style={{ marginTop: 36 }} className="flex flex-col gap-3">
            <a href={`tel:${CONTACT.phoneTel}`} className="btn-ghost" data-testid="nav-mobile-phone">
              <Phone size={14} /> {CONTACT.phone}
            </a>
            <a href="#iletisim" onClick={go("iletisim")} className="btn-primary" data-testid="nav-mobile-request-quote-button">
              Teklif Al
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
