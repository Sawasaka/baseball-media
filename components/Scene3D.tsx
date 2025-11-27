"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "three/examples/jsm/math/MeshSurfaceSampler"; // This might not be needed for simple random points
// Actually simpler to just generate random float32array
import * as THREE from "three";

function Stars(props: any) {
  const ref = useRef<any>();
  const [sphere] = useRef(() => {
    const positions = new Float32Array(3000); // 1000 points * 3 coords
    for (let i = 0; i < 3000; i++) {
      positions[i] = (Math.random() - 0.5) * 10; // spread within 10 units
    }
    return positions;
  }).current;

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
      </Canvas>
    </div>
  );
}

