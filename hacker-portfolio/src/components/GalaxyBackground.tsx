'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GalaxyParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 5000;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Using HabibOS Recruiter Mode accents (Indigo and Cyan)
    const colorInside = new THREE.Color('#ffffff');
    const colorMiddle = new THREE.Color('#6366f1'); // var(--r-accent)
    const colorOutside = new THREE.Color('#06b6d4'); // var(--r-accent2)

    const branches = 4;
    const radius = 10;
    const spin = 1;
    const randomness = 0.5;
    const randomnessPower = 3;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;
      const spinAngle = r * spin;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;

      // Calculate random spread along branches
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      pos[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      pos[i3 + 1] = randomY * 0.3; // flatten the galaxy slightly
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Color interpolation
      let mixedColor;
      if (r < radius * 0.3) {
        mixedColor = colorInside.clone().lerp(colorMiddle, r / (radius * 0.3));
      } else {
        mixedColor = colorMiddle.clone().lerp(colorOutside, (r - radius * 0.3) / (radius * 0.7));
      }
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <points ref={ref} rotation={[0.2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingStars() {
  const ref = useRef<THREE.Points>(null);
  const count = 1000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.01;
      ref.current.rotation.y -= delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#a5b4fc" /* slate-cool blue */
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GalaxyBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#08080C', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 4, 12], fov: 60 }}>
        <fog attach="fog" args={['#08080C', 10, 30]} />
        <ambientLight intensity={0.5} />
        <GalaxyParticles />
        <FloatingStars />
      </Canvas>
      {/* Subtle overlay gradient to blend with the recruiter UI background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.95) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
