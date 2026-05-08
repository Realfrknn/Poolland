export const CONTACT = {
  phone: "0533 863 62 64",
  phoneTel: "+905338636264",
  email: "123furkantopal@gmail.com",
  location: "KKTC geneli",
  brand: "DERİNER",
  tagline: "23 Yıllık Profesyonel Kuyu Tecrübesi",
  subcopy: "KKTC genelinde profesyonel kuyu açma, temizleme, derinleştirme ve yatay sondaj çözümleri.",
};

export const NAV_LINKS = [
  { id: "hero", label: "Ana Sayfa" },
  { id: "services", label: "Hizmetler" },
  { id: "yatay-sondaj", label: "Yatay Sondaj" },
  { id: "kuyu-derinlestirme", label: "Derinleştirme" },
  { id: "kuyu-guclendirme", label: "Güçlendirme" },
  { id: "galeri", label: "Galeri" },
  { id: "hakkimizda", label: "Hakkımızda" },
  { id: "iletisim", label: "İletişim" },
];

export const SERVICES = [
  {
    slug: "yatay-sondaj",
    title: "Yatay Sondaj",
    short: "Yüzeye zarar vermeden yatay hat açma ve altyapı geçişleri.",
    highlights: [
      "Yüksek basınçlı su + hava sistemi",
      "Kaya, beton ve sert zeminde hassas ilerleme",
      "Altyapı ve boru geçişlerinde minimum hasar",
      "Yol, bahçe, beton korunur",
    ],
    code: "01",
    accent: "#AFC7D6",
  },
  {
    slug: "kuyu-derinlestirme",
    title: "Kuyu Derinleştirme",
    short: "Mevcut kuyuyu su damarına ulaşana dek profesyonel ekipmanla derinleştiriyoruz.",
    highlights: [
      "Hava hiltisi ile kaya katmanı kırma",
      "Katman bazlı ilerleme raporu",
      "Su seviyesi ve debi doğrulama",
      "Toz, kıvılcım kontrollü çalışma",
    ],
    code: "02",
    accent: "#2F6F8F",
  },
  {
    slug: "kuyu-guclendirme",
    title: "Kuyu Güçlendirme",
    short: "Çökme riski olan kuyularda demir destekli beton muhafaza.",
    highlights: [
      "Yuvarlak kalıp sistemi",
      "Demir donatılı beton muhafaza",
      "Uzun ömürlü yapısal dayanım",
      "Yıkılma riskine karşı tam koruma",
    ],
    code: "03",
    accent: "#A9B2BC",
  },
  {
    slug: "kuyu-temizleme",
    title: "Kuyu Temizleme",
    short: "Tortulaşmış kuyularda debi ve su berraklığını yeniden kazandırma.",
    highlights: [
      "Çamur, tortu ve tıkanıklık temizliği",
      "Debi yeniden devreye alma",
      "Öncesi/sonrası ölçümleme",
    ],
    code: "04",
    accent: "#6FB0C9",
  },
  {
    slug: "su-kuyusu-acma",
    title: "Su Kuyusu Açma",
    short: "Arazi etüdünden teslime, tam süreç kuyu açma hizmeti.",
    highlights: [
      "Arazi etüdü ve konumlandırma",
      "Uygun çaplı sondaj ve muhafaza",
      "Debi / kalite testleri",
    ],
    code: "05",
    accent: "#8E98A3",
  },
  {
    slug: "tuvalet-kuyusu-kanal",
    title: "Tuvalet Kuyusu ve Kanal Bağlantısı",
    short: "Fosseptik, tuvalet kuyusu ve kanalizasyon bağlantıları.",
    highlights: [
      "Standartlara uygun fosseptik",
      "Yerel yönetmeliğe uyumlu kanal bağlantısı",
      "Temiz ve hızlı saha teslimi",
    ],
    code: "06",
    accent: "#7A8794",
  },
];

export const STATS = [
  { value: "23", unit: "yıl", label: "Sahada mesai" },
  { value: "3.500+", unit: "kuyu", label: "Tamamlanan proje" },
  { value: "48", unit: "saat", label: "Ortalama müdahale" },
  { value: "KKTC", unit: "geneli", label: "Hizmet bölgesi" },
];

export const PROCESS = [
  { step: "01", title: "Saha Etüdü", desc: "Zemin, yeraltı suyu ve konum değerlendirmesi." },
  { step: "02", title: "Planlama", desc: "Uygun sondaj çapı, derinlik ve muhafaza seçimi." },
  { step: "03", title: "Sondaj", desc: "Kaya/zemin tipine göre hassas ilerleme." },
  { step: "04", title: "Muhafaza & Test", desc: "Boru kağıtlama, debi, su kalite kontrolü." },
  { step: "05", title: "Teslim", desc: "Belgeler, bakım planlaması ve kusursuz saha." },
];

// Documentary-style industrial imagery with consistent treatment (verified Unsplash IDs)
export const GALLERY = [
  { id: "g1", src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80", h: 520, caption: "Saha kurulumu \u2014 ekipman haz\u0131rl\u0131\u011f\u0131" },
  { id: "g2", src: "https://images.unsplash.com/photo-1526290766257-c015850e4629?auto=format&fit=crop&w=1000&q=80", h: 360, caption: "A\u011f\u0131r ekipman mesaisi" },
  { id: "g3", src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80", h: 620, caption: "Saha detay\u0131 \u2014 kontroll\u00fc ilerleme" },
  { id: "g4", src: "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1000&q=80", h: 420, caption: "Metal \u00e7al\u0131\u015fmas\u0131" },
  { id: "g5", src: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&w=1200&q=80", h: 540, caption: "End\u00fcstriyel altyap\u0131" },
  { id: "g6", src: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1000&q=80", h: 380, caption: "Kontroll\u00fc m\u00fchendislik" },
  { id: "g7", src: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1000&q=80", h: 460, caption: "Saha mesaisi" },
  { id: "g8", src: "https://images.unsplash.com/photo-1597423498219-04418210827d?auto=format&fit=crop&w=1200&q=80", h: 560, caption: "Operat\u00f6r detay\u0131" },
  { id: "g9", src: "https://images.unsplash.com/photo-1466354424719-343280fe118b?auto=format&fit=crop&w=1200&q=80", h: 420, caption: "Saha plan\u0131" },
  { id: "g10", src: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1000&q=80", h: 360, caption: "\u00c7al\u0131\u015fma an\u0131" },
  { id: "g11", src: "https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1200&q=80", h: 520, caption: "G\u00fcvenlik ve disiplin" },
  { id: "g12", src: "https://images.unsplash.com/photo-1542361345-89e58247f2d5?auto=format&fit=crop&w=1000&q=80", h: 380, caption: "Saha teslimi" },
];

export const BEFORE_AFTER = {
  before: "https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1600&q=80&sat=-60",
  after: "https://images.unsplash.com/photo-1597423498219-04418210827d?auto=format&fit=crop&w=1600&q=80",
};
