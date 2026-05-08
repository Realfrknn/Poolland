{
  "brand": {
    "name": "DERİNER",
    "positioning": [
      "Apple-level minimalism (calm, precise, no clutter)",
      "Premium European engineering firm (trust + competence)",
      "Cinematic documentary (chapter-based scroll narrative)",
      "Material honesty: stone/concrete/metal/water as visual metaphors"
    ],
    "non_negotiables": [
      "Never game-like, never flashy neon, never AI-mess",
      "Primarily LIGHT UI (off-white / concrete / stone) with controlled dark accent chapters",
      "No purple for any UI element",
      "No text-heavy areas on gradients; gradients max 20% viewport",
      "All interactive + key informational elements MUST include data-testid (kebab-case)"
    ]
  },
  "design_tokens": {
    "color_system": {
      "notes": [
        "Palette is material-driven: off-white + concrete + stone + cool bluish tones + metallic gray accents.",
        "Use dark only as cinematic chapter breaks (short sections), not as default theme.",
        "Avoid transparent backgrounds with dark fonts; keep surfaces solid for readability."
      ],
      "css_custom_properties": {
        ":root": {
          "--bg": "#F6F4EF",
          "--bg-2": "#F1F0EB",
          "--surface": "#FFFFFF",
          "--surface-2": "#F7F8F9",
          "--stone": "#E7E3DA",
          "--concrete": "#D9D7D2",
          "--metal": "#A9B2BC",
          "--metal-2": "#8E98A3",
          "--ink": "#0E1114",
          "--ink-2": "#1B2229",
          "--muted": "#5B6672",
          "--muted-2": "#7A8794",
          "--line": "#D7DCE1",
          "--line-2": "#C7CDD4",
          "--cool": "#CFE0EA",
          "--cool-2": "#AFC7D6",
          "--water": "#2F6F8F",
          "--water-2": "#1F4F66",
          "--accent": "#6E7F8D",
          "--success": "#1F7A6B",
          "--warning": "#B07A2A",
          "--danger": "#B23A3A",
          "--focus": "#2F6F8F"
        },
        ".dark": {
          "--bg": "#0B0E11",
          "--bg-2": "#0F1419",
          "--surface": "#111820",
          "--surface-2": "#151E27",
          "--stone": "#1A232C",
          "--concrete": "#202B35",
          "--metal": "#9AA6B2",
          "--metal-2": "#7F8B97",
          "--ink": "#F4F6F8",
          "--ink-2": "#DCE3EA",
          "--muted": "#AAB6C2",
          "--muted-2": "#8F9CAA",
          "--line": "#24313D",
          "--line-2": "#2E3D4B",
          "--cool": "#1B2A35",
          "--cool-2": "#223645",
          "--water": "#6FB0C9",
          "--water-2": "#3E7F9A",
          "--accent": "#A9B2BC",
          "--success": "#3BB7A3",
          "--warning": "#D2A24A",
          "--danger": "#E06A6A",
          "--focus": "#6FB0C9"
        }
      },
      "tailwind_mapping_guidance": {
        "approach": "Map Tailwind theme colors to CSS variables (hsl or hex) so shadcn components inherit. Keep cards/surfaces solid.",
        "examples": [
          "bg-[var(--bg)] text-[var(--ink)]",
          "border-[var(--line)]",
          "text-[var(--muted)]",
          "ring-[var(--focus)]"
        ]
      },
      "allowed_gradients": {
        "usage": [
          "Hero background only (max 20% viewport)",
          "Section separators / decorative overlays",
          "Never on cards, never behind paragraphs"
        ],
        "gradient_recipes": [
          {
            "name": "Airy Concrete Wash",
            "css": "linear-gradient(135deg, #F6F4EF 0%, #EEF2F5 45%, #E7E3DA 100%)"
          },
          {
            "name": "Cool Documentary Edge",
            "css": "linear-gradient(90deg, rgba(47,111,143,0.10) 0%, rgba(169,178,188,0.08) 55%, rgba(246,244,239,0) 100%)"
          }
        ]
      },
      "texture_noise": {
        "rule": "Use subtle noise/grain overlays (2–4% opacity) on large backgrounds only.",
        "css_snippet": ".noise::before{content:'';position:absolute;inset:0;background-image:url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"160\" height=\"160\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"160\" height=\"160\" filter=\"url(%23n)\" opacity=\"0.18\"/></svg>');mix-blend-mode:multiply;opacity:.035;pointer-events:none;}"
      }
    },
    "typography": {
      "font_pairing": {
        "display": {
          "name": "Fraunces",
          "role": "Cinematic editorial headings (stone-carved feel without being decorative)",
          "google_fonts": "https://fonts.google.com/specimen/Fraunces"
        },
        "body": {
          "name": "Space Grotesk",
          "role": "Engineering/technical clarity for body, labels, UI",
          "google_fonts": "https://fonts.google.com/specimen/Space+Grotesk"
        },
        "mono": {
          "name": "IBM Plex Mono",
          "role": "Specs, coordinates, counters, micro labels",
          "google_fonts": "https://fonts.google.com/specimen/IBM+Plex+Mono"
        }
      },
      "css_tokens": {
        "--font-display": "'Fraunces', ui-serif, Georgia, serif",
        "--font-body": "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        "--font-mono": "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
      },
      "scale": {
        "h1": "text-4xl sm:text-5xl lg:text-6xl",
        "h2": "text-base md:text-lg",
        "body": "text-sm md:text-base",
        "small": "text-xs md:text-sm"
      },
      "tracking": {
        "display": "tracking-[-0.02em]",
        "labels": "tracking-[0.12em] uppercase"
      },
      "line_height": {
        "headings": "leading-[1.05]",
        "body": "leading-[1.65]"
      }
    },
    "spacing_rhythm": {
      "principles": [
        "Use 2–3x more whitespace than typical small-business sites.",
        "Prefer large section paddings and calm rhythm; content should feel curated."
      ],
      "section_padding": {
        "mobile": "py-16",
        "desktop": "lg:py-28"
      },
      "container": {
        "max_width": "max-w-6xl",
        "padding": "px-5 sm:px-8"
      },
      "grid": {
        "desktop": "12-col mental model",
        "tailwind": "grid grid-cols-12 gap-6 lg:gap-10"
      }
    },
    "radius_shadow": {
      "radius": {
        "card": "rounded-2xl",
        "button": "rounded-xl",
        "pill": "rounded-full"
      },
      "shadows": {
        "soft": "shadow-[0_10px_30px_rgba(14,17,20,0.06)]",
        "lift": "shadow-[0_18px_50px_rgba(14,17,20,0.10)]",
        "inset": "shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]"
      },
      "borders": {
        "default": "border border-[var(--line)]",
        "hairline": "border border-[color:rgba(14,17,20,0.10)]"
      }
    }
  },
  "component_path": {
    "shadcn_primary": [
      "/app/frontend/src/components/ui/button.jsx",
      "/app/frontend/src/components/ui/navigation-menu.jsx",
      "/app/frontend/src/components/ui/sheet.jsx",
      "/app/frontend/src/components/ui/progress.jsx",
      "/app/frontend/src/components/ui/card.jsx",
      "/app/frontend/src/components/ui/separator.jsx",
      "/app/frontend/src/components/ui/dialog.jsx",
      "/app/frontend/src/components/ui/carousel.jsx",
      "/app/frontend/src/components/ui/tooltip.jsx",
      "/app/frontend/src/components/ui/tabs.jsx",
      "/app/frontend/src/components/ui/accordion.jsx",
      "/app/frontend/src/components/ui/slider.jsx",
      "/app/frontend/src/components/ui/form.jsx",
      "/app/frontend/src/components/ui/input.jsx",
      "/app/frontend/src/components/ui/textarea.jsx",
      "/app/frontend/src/components/ui/sonner.jsx"
    ],
    "custom_components_to_create": [
      "CinematicLoader.jsx (intro overlay + logo reveal)",
      "CustomCursor.jsx (cursor states + magnetic hover)",
      "ScrollProgress.jsx (top hairline progress)",
      "StickyNav.jsx (active section links + mobile sheet)",
      "ServiceChapter*.jsx (6 unique service layouts)",
      "R3FScene*.jsx (3 scenes)",
      "MasonryGallery.jsx (masonry + lightbox)",
      "BeforeAfterSlider.jsx (drag handle)",
      "StatsStrip.jsx (23 years + counters)",
      "ContactForm.jsx (FastAPI submit + sonner)"
    ]
  },
  "layout_and_sections": {
    "global_page_structure": {
      "pattern": "Single-page scroll as documentary chapters; each chapter has a distinct composition + motion signature.",
      "section_ids": [
        "intro",
        "hero",
        "services",
        "yatay-sondaj",
        "kuyu-derinlestirme",
        "kuyu-guclendirme",
        "diger-hizmetler",
        "galeri",
        "hakkimizda",
        "iletisim",
        "footer"
      ],
      "scroll_behavior": {
        "smooth_scroll": "Lenis",
        "snap": "Soft snapping only between major chapters on desktop; disable on mobile and reduced-motion.",
        "active_links": "IntersectionObserver + ScrollTrigger to update nav state"
      }
    },
    "sticky_nav": {
      "visual": "Thin, calm, glass-free (solid surface). Hairline border, subtle blur only if background imagery exists.",
      "tailwind": "fixed top-0 inset-x-0 z-50 bg-[color:rgba(246,244,239,0.86)] backdrop-blur-md border-b border-[var(--line)]",
      "content": [
        "Left: DERİNER wordmark",
        "Center (desktop): chapter links",
        "Right: primary CTA 'Teklif Al'"
      ],
      "interaction": [
        "Active link: underline as 1px water-toned rule + slight letterspacing",
        "On scroll down: nav compresses (py-4 -> py-2) with easing",
        "Mobile: Sheet menu with chapter list + contact quick actions"
      ],
      "data_testids": {
        "nav": "site-sticky-nav",
        "cta": "nav-request-quote-button",
        "mobile_menu": "nav-mobile-menu-button"
      }
    },
    "scroll_progress": {
      "placement": "Top of viewport, 2px height",
      "component": "shadcn Progress",
      "tailwind": "fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent",
      "bar_color": "background: linear-gradient(90deg, rgba(47,111,143,0.0), rgba(47,111,143,0.85), rgba(169,178,188,0.35))",
      "data_testids": {
        "progress": "scroll-progress"
      }
    },
    "intro_loader": {
      "goal": "Premium logo reveal: DERİNER emerges from stone surface with dust + volumetric light. No gimmicks.",
      "timeline_beats_ms": [
        "0–250: fade in off-white to stone background + subtle grain",
        "250–900: dust particles drift (slow), faint light sweep from top-left",
        "900–1600: stone surface displacement reveals logo (mask reveal), micro debris",
        "1600–2200: logo sharpens + metallic edge highlight (very subtle)",
        "2200–2800: tagline appears: '23 Yıllık Profesyonel Kuyu Tecrübesi'",
        "2800–3400: loader dissolves upward (not fade to black), page becomes interactive"
      ],
      "sound": "Optional: muted low-frequency rumble (respect prefers-reduced-motion and user mute).",
      "implementation_notes": [
        "Use Canvas (R3F) or pure DOM mask + noise video; keep GPU budget low.",
        "Provide skip button after 1.2s."
      ],
      "data_testids": {
        "loader": "cinematic-loader",
        "skip": "cinematic-loader-skip-button"
      }
    },
    "hero": {
      "composition": "Left: editorial headline + trust strip. Right: 3D drilling scene in contained frame.",
      "headline": "23 Yıllık Profesyonel Kuyu Tecrübesi",
      "subcopy": "KKTC genelinde; mühendislik disiplini, doğru ekipman ve sahada kanıtlanmış süreçlerle.",
      "tailwind_layout": "grid grid-cols-12 gap-8 items-center",
      "left_col": "col-span-12 lg:col-span-6",
      "right_col": "col-span-12 lg:col-span-6",
      "3d_frame": "rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_18px_60px_rgba(14,17,20,0.10)] overflow-hidden",
      "cta": [
        "Primary: 'Teklif Al'",
        "Secondary: 'Hizmetleri İncele'"
      ],
      "data_testids": {
        "hero": "hero-section",
        "primary_cta": "hero-request-quote-button",
        "secondary_cta": "hero-view-services-button"
      }
    },
    "services_overview": {
      "rule": "Do NOT use 6 identical cards. Use a bento editorial grid with varied spans + different interaction per tile.",
      "layout": "grid grid-cols-12 gap-4 lg:gap-6",
      "tiles": [
        "Tile A (span 7): Yatay Sondaj — horizontal scroll reveal + blueprint overlay",
        "Tile B (span 5): Kuyu Derinleştirme — depth meter animation",
        "Tile C (span 4): Kuyu Güçlendirme — concrete/rebar pattern mask",
        "Tile D (span 4): Kuyu Temizleme — water ripple shader overlay",
        "Tile E (span 4): Su Kuyusu Açma — map pin + route line",
        "Tile F (span 12): Tuvalet Kuyusu/Kanal Bağlantısı — split diagram + compliance note"
      ],
      "data_testids": {
        "services": "services-overview-section"
      }
    },
    "service_chapters_unique_treatments": {
      "yatay_sondaj": {
        "signature": "Blueprint + lateral motion",
        "layout": "Split: left narrative; right 3D scene; bottom horizontal spec rail",
        "motion": [
          "Blueprint grid fades in on scroll",
          "Spec rail scrolls horizontally with wheel (desktop)"
        ],
        "accent": "cool bluish lines (#AFC7D6)"
      },
      "kuyu_derinlestirme": {
        "signature": "Vertical depth + strata",
        "layout": "Full-width depth column center; copy pinned left; 3D scene behind in masked window",
        "motion": [
          "Depth ruler increments as you scroll",
          "Rock layer parallax (3 layers)"
        ],
        "accent": "water tone (#2F6F8F) used sparingly"
      },
      "kuyu_guclendirme": {
        "signature": "Structural reinforcement",
        "layout": "Asymmetric: right copy block; left 'material sample' cards (concrete, rebar, casing)",
        "motion": [
          "Cards 'lock' into place with subtle snap",
          "Rebar line-draw animation"
        ],
        "accent": "metallic gray (#A9B2BC)"
      },
      "kuyu_temizleme": {
        "signature": "Clarity + flow",
        "layout": "Light section with water ripple overlay only at top edge (<=15% viewport)",
        "motion": [
          "Ripple reacts to cursor hover on desktop",
          "Before/after mini slider embedded"
        ]
      },
      "su_kuyusu_acma": {
        "signature": "Survey + location",
        "layout": "Map-like grid background + stepper process (3–5 steps)",
        "motion": [
          "Steps reveal with stagger",
          "Thin route line animates along steps"
        ]
      },
      "tuvalet_kuyusu_kanal": {
        "signature": "Diagram + compliance",
        "layout": "Two-column: left schematic diagram; right checklist accordion",
        "motion": [
          "Diagram highlights on accordion open",
          "Checklist ticks animate (no emoji)"
        ]
      }
    },
    "gallery": {
      "masonry": {
        "columns": "2 on mobile, 3 on md, 4 on xl",
        "gap": "gap-3 md:gap-4",
        "hover": "slow zoom (scale 1.02) + caption fade",
        "lightbox": "shadcn Dialog with carousel navigation",
        "data_testids": {
          "gallery": "masonry-gallery-section",
          "lightbox": "gallery-lightbox"
        }
      },
      "before_after": {
        "feel": "Engineering proof. Handle is metallic, thin, tactile.",
        "component": "shadcn Slider for drag value + custom overlay",
        "data_testids": {
          "before_after": "before-after-slider"
        }
      }
    },
    "about_experience": {
      "tone": "Quiet authority. No hype. Use numbers + process.",
      "modules": [
        "23 years statement",
        "3–4 stats (projects, regions, response time, equipment)",
        "Process timeline (survey → drilling → casing → testing → delivery)"
      ],
      "data_testids": {
        "about": "about-section"
      }
    },
    "contact": {
      "layout": "Two-panel: left form, right direct contact + service area",
      "form_fields": [
        "Ad Soyad",
        "Telefon",
        "E-posta",
        "Hizmet (Select)",
        "Mesaj"
      ],
      "cta": [
        "Call: 0533 863 62 64",
        "Email: 123furkantopal@gmail.com"
      ],
      "data_testids": {
        "contact": "contact-section",
        "form": "contact-form",
        "submit": "contact-form-submit-button",
        "phone": "contact-phone-link",
        "email": "contact-email-link"
      }
    }
  },
  "motion_and_interactions": {
    "principles": [
      "Motion is environmental, not playful: slow, weighted, documentary.",
      "Prefer opacity + translateY (small) + blur (tiny) reveals.",
      "Never use bounce easings."
    ],
    "easing": {
      "standard": "cubic-bezier(0.22, 1, 0.36, 1)",
      "soft": "cubic-bezier(0.16, 1, 0.3, 1)",
      "linear": "linear"
    },
    "durations_ms": {
      "micro": 140,
      "ui": 220,
      "section": 700,
      "cinematic": 1200
    },
    "stagger": {
      "items": "0.06–0.10s",
      "chapters": "0.12–0.18s"
    },
    "hover_states": {
      "buttons": "background shade shift + 1px border emphasis + subtle shadow lift",
      "links": "underline grows from left (scaleX)"
    },
    "custom_cursor": {
      "states": [
        "default: small dot + soft ring",
        "hover-link: ring tightens + label 'Aç' (text in IBM Plex Mono)",
        "hover-media: ring expands + 'Görüntüle'",
        "drag: horizontal arrows (use lucide icons)"
      ],
      "rules": [
        "Disable on touch devices",
        "Respect prefers-reduced-motion"
      ],
      "data_testids": {
        "cursor": "custom-cursor"
      }
    },
    "scroll_choreography": {
      "tools": ["GSAP ScrollTrigger", "Lenis", "Framer Motion (micro only)"]
    },
    "reduced_motion": {
      "requirements": [
        "If prefers-reduced-motion: disable parallax, disable snapping, reduce particle count to 0, keep fades only",
        "Provide a 'Reduce Effects' toggle in footer (optional)"
      ]
    }
  },
  "3d_direction": {
    "overall": {
      "goal": "Procedural/placeholder geometry but premium materials + lighting. Feels like documentary footage, not a game.",
      "camera_language": [
        "Slow dolly + slight handheld micro-noise (very subtle)",
        "Long focal length feel (reduced perspective distortion)",
        "Avoid fast orbit controls; no user-controlled FPS camera"
      ],
      "lighting": [
        "HDRI: overcast industrial yard / soft sky",
        "Key light: soft, large area from top-left",
        "Fill: cool bounce",
        "Contact shadows: soft, high quality"
      ],
      "materials": [
        "Metal: brushed anisotropic look (fake via normal + roughness map)",
        "Stone/concrete: subtle roughness variation + micro normal",
        "Water: restrained specular, no neon"
      ],
      "postprocessing": [
        "Very subtle vignette",
        "Mild film grain",
        "No heavy bloom"
      ]
    },
    "scenes": {
      "scene_1_yatay_sondaj": {
        "elements": ["rig silhouette", "rock particles", "water mist"],
        "interaction": "Particles respond to scroll velocity (not mouse)"
      },
      "scene_2_kuyu_derinlestirme": {
        "elements": ["layered strata", "sparks/dust", "depth shaft"],
        "interaction": "Depth increases with scroll; strata parallax"
      },
      "scene_3_kuyu_guclendirme": {
        "elements": ["concrete sleeve", "rebar lines", "mold form"],
        "interaction": "Rebar highlights on section focus"
      }
    },
    "performance": {
      "targets": ["Lighthouse 90+", "mobile adaptive quality"],
      "adaptive_quality": [
        "Detect deviceMemory / hardwareConcurrency; reduce DPR and particle counts",
        "Use suspense + lazy load scenes",
        "Fallback: static poster image if WebGL fails"
      ]
    }
  },
  "libraries_and_setup": {
    "recommended": [
      {
        "name": "@react-three/fiber, @react-three/drei",
        "why": "3D scenes + helpers",
        "install": "npm i three @react-three/fiber @react-three/drei"
      },
      {
        "name": "gsap",
        "why": "ScrollTrigger choreography",
        "install": "npm i gsap"
      },
      {
        "name": "@studio-freight/lenis",
        "why": "Premium smooth scroll",
        "install": "npm i @studio-freight/lenis"
      },
      {
        "name": "framer-motion",
        "why": "Micro-interactions only",
        "install": "npm i framer-motion"
      },
      {
        "name": "yet-another-react-lightbox",
        "why": "If custom lightbox is too slow to build; otherwise use shadcn Dialog",
        "install": "npm i yet-another-react-lightbox"
      }
    ],
    "font_setup": {
      "google_fonts_import": "@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Space+Grotesk:wght@300..700&family=IBM+Plex+Mono:wght@400;500&display=swap');"
    }
  },
  "image_urls": {
    "hero_or_chapter_backgrounds": [
      {
        "url": "https://images.unsplash.com/photo-1563883830555-79971475cc22?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "description": "Oil rig wide shot; use as subtle chapter background with heavy desaturation + blur",
        "category": "services-chapter-background"
      },
      {
        "url": "https://images.unsplash.com/photo-1662543241286-c657c0ad9103?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "description": "Aerial coastline (teal water) for KKTC atmosphere; use sparingly as a divider",
        "category": "ambient-divider"
      }
    ],
    "textures": [
      {
        "url": "https://images.unsplash.com/photo-1633319983758-0dc79af58c0d?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "description": "Concrete wall texture; use for loader stone surface / subtle overlays",
        "category": "texture-concrete"
      },
      {
        "url": "https://images.unsplash.com/photo-1591095475424-715e1a00a3c6?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "description": "Concrete floor macro; use as masked background behind logo reveal",
        "category": "texture-stone"
      }
    ]
  },
  "accessibility": {
    "requirements": [
      "WCAG AA contrast for text on surfaces",
      "Visible focus ring using --focus",
      "Keyboard navigable nav + dialogs",
      "Reduced motion support (see motion section)",
      "Alt text for all images; aria-label for icon-only buttons"
    ],
    "focus_styles": {
      "tailwind": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
    }
  },
  "instructions_to_main_agent": {
    "critical_fixes": [
      "Remove CRA default centered header styles in App.css; do not center the entire app.",
      "Replace index.css system font stack with the chosen Google Fonts and CSS variables.",
      "Update shadcn theme tokens in index.css to match the provided palette (avoid default black/white extremes)."
    ],
    "implementation_sequence": [
      "1) Establish tokens in index.css (:root + .dark) and Tailwind usage via CSS vars.",
      "2) Build StickyNav + ScrollProgress + CustomCursor (cursor disabled on touch).",
      "3) Implement CinematicLoader overlay with skip.",
      "4) Build Hero with R3F scene container + fallback poster.",
      "5) Build Services overview bento grid (varied spans).",
      "6) Build 3 service chapters with 3D scenes + unique motion signatures.",
      "7) Build remaining services with distinct layouts (diagram, stepper, ripple).",
      "8) Build Gallery masonry + lightbox + before/after slider.",
      "9) About + Stats + Process timeline.",
      "10) Contact form (FastAPI) + sonner toasts + validation.",
      "11) Performance pass: lazy load scenes, reduce DPR on mobile, compress images."
    ],
    "data_testid_convention": {
      "rule": "kebab-case describing role",
      "examples": [
        "data-testid=\"services-yatay-sondaj-open-button\"",
        "data-testid=\"gallery-item-12-button\"",
        "data-testid=\"contact-form-email-input\""
      ]
    },
    "js_files_note": "Project uses .jsx/.js; write components accordingly (no .tsx types)."
  },
  "general_ui_ux_design_guidelines_appendix": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
