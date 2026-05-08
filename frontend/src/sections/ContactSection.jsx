import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { CONTACT, SERVICES } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { submitContact } from "@/lib/api";
import { toast } from "sonner";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "", website: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot
    if (!form.name || !form.phone || !form.message) {
      toast.error("Lütfen ad, telefon ve mesaj alanlarını doldurun.");
      return;
    }
    setLoading(true);
    try {
      await submitContact({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        service: form.service || null,
        message: form.message,
      });
      toast.success("Mesajınız alındı. En kısa sürede dönüş yapacağız.");
      setForm({ name: "", phone: "", email: "", service: "", message: "", website: "" });
    } catch (err) {
      console.error(err);
      toast.error("Gönderim başarısız. Lütfen tekrar deneyin veya telefonla ulaşın.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 12,
    border: "1px solid var(--line)", background: "var(--surface)", color: "var(--ink)",
    fontFamily: "var(--font-body)", fontSize: 15,
    transition: "border-color 220ms, box-shadow 220ms",
  };

  return (
    <section id="iletisim" data-testid="contact-section" style={{ padding: "140px 0", background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <div className="chapter-index">IV · İletişim</div>
              <h2 style={{ fontSize: "clamp(34px, 5.2vw, 60px)", margin: "14px 0 0", fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                Sahada buluşalim,
                <br />
                <span style={{ fontStyle: "italic" }}>çözümleyelim.</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ marginTop: 20, color: "var(--muted-color)", fontSize: 16, lineHeight: 1.7, maxWidth: 460 }}>
                Projeniz için hızlı bir keşif veya teknik sohbet için bize yazın. Tüm KKTC genelinde sahadayiz.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div style={{ marginTop: 32, display: "grid", gap: 14 }}>
                <a href={`tel:${CONTACT.phoneTel}`} data-testid="contact-phone-link" data-cursor="link" style={contactLinkStyle}>
                  <span style={iconWrapStyle}><Phone size={16} strokeWidth={1.6} /></span>
                  <div>
                    <div className="label-mono">Telefon</div>
                    <div style={{ fontSize: 18, fontFamily: "var(--font-display)", marginTop: 2 }}>{CONTACT.phone}</div>
                  </div>
                </a>
                <a href={`mailto:${CONTACT.email}`} data-testid="contact-email-link" data-cursor="link" style={contactLinkStyle}>
                  <span style={iconWrapStyle}><Mail size={16} strokeWidth={1.6} /></span>
                  <div>
                    <div className="label-mono">E-posta</div>
                    <div style={{ fontSize: 16, fontFamily: "var(--font-mono)", marginTop: 2 }}>{CONTACT.email}</div>
                  </div>
                </a>
                <div style={contactLinkStyle} data-testid="contact-location">
                  <span style={iconWrapStyle}><MapPin size={16} strokeWidth={1.6} /></span>
                  <div>
                    <div className="label-mono">Bölge</div>
                    <div style={{ fontSize: 16, fontFamily: "var(--font-body)", marginTop: 2 }}>KKTC geneli — tüm ilçe ve köyler</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal delay={100}>
              <form
                onSubmit={submit}
                data-testid="contact-form"
                style={{ padding: 28, borderRadius: 22, background: "var(--surface)", border: "1px solid var(--line)", boxShadow: "0 24px 60px rgba(14,17,20,0.06)", display: "grid", gap: 14 }}
              >
                <div className="label-mono">Proje formu</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" placeholder="Ad Soyad" value={form.name} onChange={onChange("name")} style={inputStyle} data-testid="contact-form-name-input" required />
                  <input type="tel" placeholder="Telefon" value={form.phone} onChange={onChange("phone")} style={inputStyle} data-testid="contact-form-phone-input" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="email" placeholder="E-posta (opsiyonel)" value={form.email} onChange={onChange("email")} style={inputStyle} data-testid="contact-form-email-input" />
                  <select value={form.service} onChange={onChange("service")} style={{ ...inputStyle, appearance: "none" }} data-testid="contact-form-service-select">
                    <option value="">Hizmet seçin (opsiyonel)</option>
                    {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <textarea
                  placeholder="Projeniz hakkında kısa bilgi (lokasyon, mevcut durum, ihtiyac)…"
                  value={form.message}
                  onChange={onChange("message")}
                  style={{ ...inputStyle, minHeight: 140, resize: "vertical" }}
                  data-testid="contact-form-message-textarea"
                  required
                />
                {/* Honeypot */}
                <input
                  type="text" name="website" value={form.website} onChange={onChange("website")}
                  tabIndex="-1" autoComplete="off"
                  style={{ position: "absolute", left: -9999, opacity: 0, height: 0, width: 0 }}
                  aria-hidden
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 6 }}>
                  <div className="label-mono" style={{ color: "var(--muted-2)" }}>
                    Yanıt süresi: ~ 48 saat · Saha ziyareti randevuludur.
                  </div>
                  <button type="submit" className="btn-primary" disabled={loading} data-testid="contact-form-submit-button" data-cursor="link">
                    {loading ? "Gönderiliyor…" : (<>Gönder <Send size={14} strokeWidth={1.6} /></>)}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

const contactLinkStyle = {
  display: "flex", alignItems: "center", gap: 14,
  padding: 16, borderRadius: 14, border: "1px solid var(--line)",
  background: "var(--surface)", textDecoration: "none", color: "var(--ink)",
  transition: "border-color 220ms, transform 220ms",
};

const iconWrapStyle = {
  width: 40, height: 40, borderRadius: 12, background: "var(--bg-2)",
  display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink)",
  border: "1px solid var(--line)",
};
