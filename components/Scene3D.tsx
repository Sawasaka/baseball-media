"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

// Baseball component with glowing seams
function Baseball({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const rotationSpeed = useRef({
    x: (Math.random() - 0.5) * 0.03 * speed,
    y: (Math.random() - 0.5) * 0.03 * speed,
    z: (Math.random() - 0.5) * 0.02 * speed,
  });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed.current.x;
      meshRef.current.rotation.y += rotationSpeed.current.y;
      meshRef.current.rotation.z += rotationSpeed.current.z;
    }
  });

  const seamPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      const r = 0.52;
      const x = r * Math.cos(t) * Math.cos(t * 0.5);
      const y = r * Math.sin(t);
      const z = r * Math.cos(t) * Math.sin(t * 0.5);
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, []);

  const seamPoints2 = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      const r = 0.52;
      const x = r * Math.cos(t) * Math.cos(t * 0.5 + Math.PI);
      const y = r * Math.sin(t);
      const z = r * Math.cos(t) * Math.sin(t * 0.5 + Math.PI);
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, []);

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial 
          color="#F8F8F5"
          roughness={0.6}
          metalness={0.15}
          emissive="#FF2A44"
          emissiveIntensity={0.12}
        />
      </Sphere>
      <Line points={seamPoints} color="#FF2A44" lineWidth={3} />
      <Line points={seamPoints2} color="#FF2A44" lineWidth={3} />
      <Sphere args={[0.52, 16, 16]}>
        <meshBasicMaterial color="#FF2A44" transparent opacity={0.15} />
      </Sphere>
      <Sphere args={[0.6, 16, 16]}>
        <meshBasicMaterial color="#FF00AA" transparent opacity={0.08} />
      </Sphere>
    </group>
  );
}

function FloatingBaseballs() {
  const baseballs = useMemo(() => {
    const items = [];
    for (let i = 0; i < 18; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 28,
          (Math.random() - 0.5) * 20,
          -8 - Math.random() * 16
        ] as [number, number, number],
        scale: 0.25 + Math.random() * 0.45,
        speed: 0.4 + Math.random() * 0.7,
        floatSpeed: 1.2 + Math.random() * 2,
        floatIntensity: 0.4 + Math.random() * 0.7,
      });
    }
    return items;
  }, []);

  return (
    <>
      {baseballs.map((ball, i) => (
        <Float
          key={i}
          speed={ball.floatSpeed}
          rotationIntensity={0.4}
          floatIntensity={ball.floatIntensity}
        >
          <Baseball
            position={ball.position}
            scale={ball.scale}
            speed={ball.speed}
          />
        </Float>
      ))}
    </>
  );
}

function HeroBaseball() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={[4, 0.5, -6]}>
        <Baseball position={[0, 0, 0]} scale={3.5} speed={0.25} />
        <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#FF2A44" transparent opacity={0.06} />
        </Sphere>
        <Sphere args={[2.5, 32, 32]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#FF00AA" transparent opacity={0.03} />
        </Sphere>
      </group>
    </Float>
  );
}

function CyberGrid() {
  return (
    <group position={[0, -6, 0]}>
      <gridHelper 
        args={[80, 80, "#FF2A44", "#150505"]} 
        rotation={[0, 0, 0]}
      />
      <gridHelper 
        args={[80, 40, "#00F0FF", "#050510"]} 
        rotation={[0, Math.PI / 4, 0]}
        position={[0, -0.01, 0]}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[80, 80]} />
        <meshBasicMaterial 
          color="#FF2A44" 
          transparent 
          opacity={0.04}
        />
      </mesh>
    </group>
  );
}

function CyberParticles() {
  const ref = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    const colors = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      
      const colorType = Math.random();
      if (colorType < 0.4) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0.16;
        colors[i * 3 + 2] = 0.27;
      } else if (colorType < 0.6) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.94;
        colors[i * 3 + 2] = 1;
      } else if (colorType < 0.75) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 0.67;
      } else if (colorType < 0.9) {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0;
      } else {
        colors[i * 3] = 0.67;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 1;
      }
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={1000}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NeonRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const ring4Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.15;
      ring1Ref.current.rotation.y = t * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.1;
      ring2Ref.current.rotation.z = t * 0.05;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.18;
      ring3Ref.current.rotation.z = -t * 0.06;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.x = t * 0.12;
      ring4Ref.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <group position={[4, 0.5, -6]}>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[5.5, 0.03, 16, 100]} />
        <meshBasicMaterial color="#FF2A44" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[6.5, 0.025, 16, 100]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[7.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#FF00AA" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring4Ref}>
        <torusGeometry args={[8.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#FFFF00" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function DataLines() {
  const groupRef = useRef<THREE.Group>(null);
  
  const lines = useMemo(() => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const startY = (Math.random() - 0.5) * 22;
      const startZ = -10 - Math.random() * 18;
      const length = 3 + Math.random() * 5;
      const side = Math.random() > 0.5 ? -1 : 1;
      
      const colorRand = Math.random();
      let color = "#FF2A44";
      if (colorRand > 0.6) color = "#00F0FF";
      else if (colorRand > 0.4) color = "#FF00AA";
      else if (colorRand > 0.25) color = "#FFFF00";
      
      data.push({
        start: [side * 16, startY, startZ] as [number, number, number],
        end: [side * 16 - side * length, startY, startZ] as [number, number, number],
        color,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color={line.color}
          lineWidth={1.5}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
}

function EnergyOrbs() {
  const orbs = useMemo(() => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 12,
          -5 - Math.random() * 8
        ] as [number, number, number],
        color: ['#FF2A44', '#00F0FF', '#FF00AA', '#FFFF00', '#AA00FF'][Math.floor(Math.random() * 5)],
        scale: 0.1 + Math.random() * 0.15,
      });
    }
    return items;
  }, []);

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={3} floatIntensity={1.5}>
          <Sphere args={[orb.scale, 16, 16]} position={orb.position}>
            <meshBasicMaterial color={orb.color} transparent opacity={0.8} />
          </Sphere>
          <Sphere args={[orb.scale * 1.5, 16, 16]} position={orb.position}>
            <meshBasicMaterial color={orb.color} transparent opacity={0.3} />
          </Sphere>
        </Float>
      ))}
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={["#050508", 10, 45]} />
          
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={0.7} color="#ffffff" />
          <pointLight position={[-12, 6, 5]} intensity={1.2} color="#FF2A44" distance={35} />
          <pointLight position={[12, -6, 5]} intensity={0.8} color="#00F0FF" distance={30} />
          <pointLight position={[0, 0, -5]} intensity={0.6} color="#FF00AA" distance={25} />
          <pointLight position={[-8, -8, 0]} intensity={0.4} color="#FFFF00" distance={20} />
          <pointLight position={[8, 8, -10]} intensity={0.4} color="#AA00FF" distance={20} />

          <HeroBaseball />
          <FloatingBaseballs />
          <CyberParticles />
          <CyberGrid />
          <NeonRings />
          <DataLines />
          <EnergyOrbs />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
