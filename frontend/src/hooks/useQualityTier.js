import { useEffect, useState } from "react";

export default function useQualityTier() {
  const [tier, setTier] = useState("high");
  useEffect(() => {
    const w = typeof navigator === "undefined" ? {} : navigator;
    const mem = w.deviceMemory || 8;
    const cores = w.hardwareConcurrency || 8;
    const width = window.innerWidth;
    const mobile = width < 768;
    if (mobile || mem < 4 || cores < 4) setTier("low");
    else if (mem < 8 || cores < 8) setTier("medium");
    else setTier("high");
  }, []);
  return tier;
}
