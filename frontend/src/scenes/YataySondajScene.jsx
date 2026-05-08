import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

function HorizontalRig() {
  const drillRef = useRef();
  const waterRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (drillRef.current) {
      drillRef.current.rotation.z = t * 1.2;
      drillRef.current.position.x = -0.2 + Math.sin(t * 0.5) * 0.12;
    }
    if (waterRef.current) waterRef.current.rotation.z = t * 0.3;
  });
  return (
    <group>
      {/* rock wall */}
      <mesh position={[1.6, 0, 0]}>
        <boxGeometry args={[1.5, 3, 3]} />
        <meshStandardMaterial color="#9C9589" roughness={1} metalness={0} flatShading />
      </mesh>
      {/* drill rod */}
      <group ref={drillRef} rotation={[0, 0, Math.PI / 2]} position={[-0.2, 0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.12, 2, 20]} />
          <meshStandardMaterial color="#8E98A3" roughness={0.25} metalness={0.95} />
        </mesh>
        <mesh position={[-1.0, 0, 0]}>
          <coneGeometry args={[0.18, 0.32, 16]} />
          <meshStandardMaterial color="#5B6672" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>
      {/* compressor */}
      <mesh position={[-2, 0.2, 0.5]}>
        <boxGeometry args={[0.9, 0.7, 0.8]} />
        <meshStandardMaterial color="#2F6F8F" roughness={0.45} metalness={0.5} />
      </mesh>
      {/* hoses curl */}
      <mesh position={[-1.4, 0.3, 0]} rotation={[0, 0, -0.3]}>
        <torusGeometry args={[0.5, 0.04, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#0E1114" roughness={0.85} />
      </mesh>
      {/* base */}
      <mesh position={[-0.5, -0.75, 0]} receiveShadow>
        <boxGeometry args={[4.5, 0.1, 2.5]} />
        <meshStandardMaterial color="#D9D7D2" roughness={0.9} />
      </mesh>
      {/* water mist swirl */}
      <group ref={waterRef} position={[0.9, 0.35, 0]}>
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[Math.cos(i) * 0.15, Math.sin(i) * 0.15, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#AFC7D6" transparent opacity={0.45} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function RockDebris() {
  const ref = useRef();
  const pieces = useMemo(() => Array.from({ length: 50 }).map(() => ({
    x: (Math.random() - 0.5) * 3 + 0.9,
    y: Math.random() * 1.5 - 0.5,
    z: (Math.random() - 0.5) * 1.2,
    s: 0.02 + Math.random() * 0.04,
    sp: 0.3 + Math.random() * 0.6,
  })), []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.children.forEach((m, i) => {
      const p = pieces[i];
      m.position.y = p.y + (Math.sin(t * p.sp + i) * 0.2);
      m.rotation.x = t * p.sp;
      m.rotation.y = t * p.sp * 0.6;
    });
  });
  return (
    <group ref={ref}>
      {pieces.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <dodecahedronGeometry args={[p.s, 0]} />
          <meshStandardMaterial color="#7A6E5D" roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  );
}

export default function YataySondajScene({ quality = "high" }) {
  const dpr = quality === "low" ? [1, 1.2] : quality === "medium" ? [1, 1.5] : [1, 2];
  return (
    <Canvas
      data-testid="yatay-sondaj-scene-canvas"
      dpr={dpr}
      camera={{ position: [-0.8, 1.2, 3.4], fov: 38 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#EEF2F5"]} />
      <fog attach="fog" args={["#E7E3DA", 5, 12]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 5, 3]} intensity={1.4} color="#FFF6E6" />
        <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#CFE0EA" />
        <Environment preset="warehouse" />
        <HorizontalRig />
        <RockDebris />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
