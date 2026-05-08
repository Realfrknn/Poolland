import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, Float, MeshReflectorMaterial, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

function CameraRig() {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x = Math.sin(t * 0.15) * 0.35;
    state.camera.position.y = 1.2 + Math.sin(t * 0.2) * 0.06;
    state.camera.lookAt(0, 0.5, 0);
  });
  return <group ref={ref} />;
}

function DrillingRig() {
  const bodyRef = useRef();
  const drillRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (drillRef.current) drillRef.current.rotation.y = t * 0.35;
    if (bodyRef.current) bodyRef.current.position.y = Math.sin(t * 0.4) * 0.02;
  });
  return (
    <group ref={bodyRef} position={[0, 0, 0]}>
      {/* base tracks */}
      <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[1.6, 0.1, 0.9]} />
        <meshStandardMaterial color="#1B2229" roughness={0.85} metalness={0.35} />
      </mesh>
      <mesh castShadow position={[-0.7, 0.12, 0.4]}>
        <cylinderGeometry args={[0.12, 0.12, 0.9, 24]} />
        <meshStandardMaterial color="#0E1114" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0.7, 0.12, 0.4]}>
        <cylinderGeometry args={[0.12, 0.12, 0.9, 24]} />
        <meshStandardMaterial color="#0E1114" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[-0.7, 0.12, -0.4]}>
        <cylinderGeometry args={[0.12, 0.12, 0.9, 24]} />
        <meshStandardMaterial color="#0E1114" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0.7, 0.12, -0.4]}>
        <cylinderGeometry args={[0.12, 0.12, 0.9, 24]} />
        <meshStandardMaterial color="#0E1114" roughness={0.9} />
      </mesh>
      {/* cabin */}
      <mesh castShadow position={[-0.2, 0.5, 0]}>
        <boxGeometry args={[0.7, 0.6, 0.75]} />
        <meshStandardMaterial color="#C7CDD4" roughness={0.6} metalness={0.35} />
      </mesh>
      <mesh castShadow position={[-0.2, 0.55, 0.38]}>
        <boxGeometry args={[0.55, 0.4, 0.01]} />
        <meshStandardMaterial color="#2F6F8F" roughness={0.15} metalness={0.8} transparent opacity={0.75} />
      </mesh>
      {/* mast */}
      <mesh castShadow position={[0.55, 0.9, 0]}>
        <boxGeometry args={[0.12, 1.9, 0.12]} />
        <meshStandardMaterial color="#8E98A3" roughness={0.5} metalness={0.85} />
      </mesh>
      <mesh castShadow position={[0.55, 1.85, 0]}>
        <boxGeometry args={[0.18, 0.08, 0.18]} />
        <meshStandardMaterial color="#1B2229" roughness={0.7} metalness={0.6} />
      </mesh>
      {/* drill bit */}
      <group ref={drillRef} position={[0.55, 0.25, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1.3, 16]} />
          <meshStandardMaterial color="#A9B2BC" roughness={0.3} metalness={0.95} />
        </mesh>
        <mesh position={[0, -0.7, 0]}>
          <coneGeometry args={[0.08, 0.2, 16]} />
          <meshStandardMaterial color="#5B6672" roughness={0.4} metalness={0.9} />
        </mesh>
      </group>
      {/* compressor tank */}
      <mesh castShadow position={[-0.9, 0.35, -0.1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.7, 24]} />
        <meshStandardMaterial color="#D9D7D2" roughness={0.5} metalness={0.7} />
      </mesh>
      {/* hoses (torus segments) */}
      <mesh position={[-0.55, 0.32, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.025, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#1B2229" roughness={0.85} />
      </mesh>
    </group>
  );
}

function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[22, 22]} />
      <MeshReflectorMaterial
        resolution={512}
        blur={[300, 100]}
        mixBlur={1}
        mirror={0.25}
        mixStrength={0.6}
        roughness={0.9}
        depthScale={0.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.2}
        color="#E7E3DA"
        metalness={0.05}
      />
    </mesh>
  );
}

function DustMotes({ count = 40 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.children.forEach((m, i) => {
      m.position.y = ((i * 0.13 + t * 0.05) % 2.4);
      m.position.x += Math.sin(t * 0.3 + i) * 0.0015;
    });
  });
  return (
    <group ref={ref}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 5, Math.random() * 2.2, (Math.random() - 0.5) * 4]}>
          <sphereGeometry args={[0.006 + Math.random() * 0.01, 6, 6]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene({ quality = "high" }) {
  const dpr = quality === "low" ? [1, 1.2] : quality === "medium" ? [1, 1.5] : [1, 2];
  const shadows = quality !== "low";
  return (
    <Canvas
      data-testid="hero-scene-canvas"
      shadows={shadows}
      dpr={dpr}
      camera={{ position: [2.4, 1.4, 3.2], fov: 35 }}
      gl={{ antialias: true, powerPreference: "high-performance", toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#F1F0EB"]} />
      <fog attach="fog" args={["#EEEAE1", 6, 14]} />
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.8}
          castShadow={shadows}
          shadow-mapSize-width={shadows ? 1024 : 256}
          shadow-mapSize-height={shadows ? 1024 : 256}
          shadow-camera-far={20}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          color="#FFF6E6"
        />
        <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#CFE0EA" />
        <Environment preset="city" />
        <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.1}>
          <DrillingRig />
        </Float>
        <GroundPlane />
        <ContactShadows position={[0, 0.001, 0]} opacity={0.45} scale={8} blur={2.2} far={3} />
        <DustMotes count={quality === "low" ? 15 : 40} />
        <CameraRig />
      </Suspense>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
