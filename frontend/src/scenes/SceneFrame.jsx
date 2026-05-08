import { Suspense, lazy } from "react";

// Lazy-load scenes + graceful fallback (static poster) if WebGL fails
export function SceneFrame({ loader, fallbackLabel = "Sahne yükleniyor", className, style, ...rest }) {
  const Scene = loader;
  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%", background: "var(--stone)", ...style }}>
      <Suspense fallback={<Poster label={fallbackLabel} />}>
        <ErrorBoundary>
          <Scene {...rest} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
}

function Poster({ label }) {
  return (
    <div
      style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #F6F4EF 0%, #EEF2F5 45%, #E7E3DA 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <span className="label-mono">{label}</span>
    </div>
  );
}

import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err) { console.warn("Scene error:", err); }
  render() {
    if (this.state.err) return <Poster label="Sahne yüklenemedi" />;
    return this.props.children;
  }
}

export const LazyHero = lazy(() => import("@/scenes/HeroScene"));
export const LazyYatay = lazy(() => import("@/scenes/YataySondajScene"));
export const LazyDerin = lazy(() => import("@/scenes/KuyuDerinlestirmeScene"));
export const LazyGuclendirme = lazy(() => import("@/scenes/KuyuGuclendirmeScene"));
