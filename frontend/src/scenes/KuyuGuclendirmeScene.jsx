import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, AdaptiveDpr, MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";

function ConcreteMold() {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.18;
  });
  return (
    <group ref={ref}>
      {/* outer mold */}
      <mesh>
        <cylinderGeometry args={[0.9, 0.9, 2.2, 48, 1, true]} />
        <meshStandardMaterial color="#8E98A3" side={THREE.DoubleSide} roughness={0.35} metalness={0.8} />
      </mesh>
      {/* rebar lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 10) * Math.PI * 2) * 0.8, 0, Math.sin((i / 10) * Math.PI * 2) * 0.8]}>
          <cylinderGeometry args={[0.02, 0.02, 2.3, 8]} />
          <meshStandardMaterial color="#C4B78A" roughness={0.55} metalness={0.6} />
        </mesh>
      ))}
      {/* rebar rings */}
      {[-0.8, -0.3, 0.2, 0.7].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.025, 8, 40]} />
          <meshStandardMaterial color="#B9A672" roughness={0.5} metalness={0.65} />
        </mesh>
      ))}
      {/* concrete core */}
      <mesh>
        <cylinderGeometry args={[0.74, 0.74, 2.05, 48]} />
        <meshStandardMaterial color="#D6D3CB" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* wet concrete top */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.74, 0.74, 0.05, 48]} />
        <meshStandardMaterial color="#AFA89A" roughness={0.25} metalness={0.1} />
      </mesh>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.12, 0]} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <MeshReflectorMaterial
        resolution={512}
        blur={[240, 80]}
        mixBlur={1}
        mirror={0.35}
        mixStrength={0.7}
        roughness={0.85}
        color="#D9D7D2"
      />
    </mesh>
  );
}

export default function KuyuGuclendirmeScene({ quality = "high" }) {
  const dpr = quality === "low" ? [1, 1.2] : quality === "medium" ? [1, 1.5] : [1, 2];
  return (
    <Canvas
      data-testid="kuyu-guclendirme-scene-canvas"
      dpr={dpr}
      camera={{ position: [2.6, 1, 3], fov: 36 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#EEEAE1"]} />
      <fog attach="fog" args={["#E7E3DA", 6, 14]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 5, 3]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#CFE0EA" />
        <Environment preset="studio" />
        <ConcreteMold />
        <Floor />
      </Suspense>
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
