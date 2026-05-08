import { CONTACT, NAV_LINKS } from "@/lib/data";
import { getLenis } from "@/hooks/useLenis";

export default function FooterSection() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -60, duration: 1.3 });
    else el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer id="footer" data-testid="site-footer" style={{ background: "#0E1114", color: "#F4F6F8", padding: "80px 0 40px", position: "relative" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1 }}>
              {CONTACT.brand}
            </div>
            <p style={{ marginTop: 18, maxWidth: 360, color: "rgba(244,246,248,0.6)", fontSize: 14, lineHeight: 1.65 }}>
              23 yıllık profesyonel kuyu tecrübesi. KKTC genelinde yatay sondaj, kuyu açma, temizleme, derinleştirme ve güçlendirme.
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="label-mono" style={{ color: "rgba(255,255,255,0.4)" }}>Menü</div>
            <div style={{ marginTop: 14, display: "grid", gap: 8 }}>
              {NAV_LINKS.slice(1).map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={scrollTo(n.id)} data-testid={`footer-link-${n.id}`} style={{ color: "rgba(244,246,248,0.85)", textDecoration: "none", fontSize: 14 }} className="link-underline">
                  {n.label}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-6 md:col-span-4">
            <div className="label-mono" style={{ color: "rgba(255,255,255,0.4)" }}>İletişim</div>
            <div style={{ marginTop: 14, display: "grid", gap: 12, color: "rgba(244,246,248,0.85)", fontSize: 14 }}>
              <a href={`tel:${CONTACT.phoneTel}`} data-testid="footer-phone" style={{ color: "inherit", textDecoration: "none" }} className="link-underline">{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} data-testid="footer-email" style={{ color: "inherit", textDecoration: "none", fontFamily: "var(--font-mono)", fontSize: 13 }} className="link-underline">{CONTACT.email}</a>
              <span style={{ color: "rgba(244,246,248,0.6)" }}>KKTC geneli · sahada</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div className="label-mono" style={{ color: "rgba(255,255,255,0.4)" }}>© {new Date().getFullYear()} {CONTACT.brand} · Tüm hakları saklıdır</div>
          <div className="label-mono" style={{ color: "rgba(255,255,255,0.4)" }}>Est. 2002 · KKTC · Sahadan</div>
        </div>
      </div>
    </footer>
  );
}
