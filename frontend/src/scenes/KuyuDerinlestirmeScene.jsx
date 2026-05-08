import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

function StrataLayers() {
  const layers = [
    { y: -0.2, color: "#C4BFB4", h: 0.4 },
    { y: -0.7, color: "#9C9382", h: 0.6 },
    { y: -1.4, color: "#6E6657", h: 0.9 },
    { y: -2.3, color: "#4C4537", h: 1.0 },
    { y: -3.4, color: "#2E2920", h: 1.2 },
  ];
  return (
    <group>
      {layers.map((l, i) => (
        <mesh key={i} position={[0, l.y, 0]}>
          <boxGeometry args={[4.5, l.h, 3]} />
          <meshStandardMaterial color={l.color} roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function DrillShaft() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 1.5;
    ref.current.position.y = 0.1 + Math.sin(t * 1.2) * 0.06;
  });
  return (
    <group position={[0, 0.4, 0]}>
      <mesh ref={ref}>
        <cylinderGeometry args={[0.1, 0.1, 4, 20]} />
        <meshStandardMaterial color="#A9B2BC" roughness={0.3} metalness={0.95} />
      </mesh>
      {/* casing ring */}
      <mesh position={[0, 0.2, 0]}>
        <torusGeometry args={[0.18, 0.04, 8, 24]} />
        <meshStandardMaterial color="#5B6672" roughness={0.4} metalness={0.85} />
      </mesh>
    </group>
  );
}

function Sparks() {
  const ref = useRef();
  const sparks = useMemo(() => Array.from({ length: 30 }).map(() => ({
    x: (Math.random() - 0.5) * 0.3,
    y: Math.random() * -2,
    z: (Math.random() - 0.5) * 0.3,
    d: 0.4 + Math.random() * 1,
  })), []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.children.forEach((m, i) => {
      const s = sparks[i];
      const pg = ((t * s.d) % 2);
      m.position.y = s.y - pg;
      m.material.opacity = Math.max(0, 1 - pg / 2);
    });
  });
  return (
    <group ref={ref}>
      {sparks.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]}>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshBasicMaterial color="#FFB066" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function DustColumn() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.children.forEach((m, i) => {
      m.position.y = ((i * 0.12 + t * 0.3) % 3) - 0.5;
      m.material.opacity = 0.12 + Math.sin(t + i) * 0.05;
    });
  });
  return (
    <group ref={ref} position={[0, 0, 0]}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 0.3, Math.random() * 2, (Math.random() - 0.5) * 0.3]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#C4BFB4" transparent opacity={0.18} />
        </mesh>
      ))}
    </group>
  );
}

export default function KuyuDerinlestirmeScene({ quality = "high" }) {
  const dpr = quality === "low" ? [1, 1.2] : quality === "medium" ? [1, 1.5] : [1, 2];
  return (
    <Canvas
      data-testid="kuyu-derinlestirme-scene-canvas"
      dpr={dpr}
      camera={{ position: [2.2, 1.2, 3.6], fov: 38 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#E7E3DA"]} />
      <fog attach="fog" args={["#BBAE99", 3, 10]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 6, 2]} intensity={1.2} color="#FFE0B0" />
        <directionalLight position={[-2, 1, -2]} intensity={0.3} color="#AFC7D6" />
        <Environment preset="sunset" />
        <StrataLayers />
        <DrillShaft />
        <DustColumn />
        <Sparks />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
