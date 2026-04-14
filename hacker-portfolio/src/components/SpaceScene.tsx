'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PointMaterial, Sphere, Ring, Float } from '@react-three/drei';
import * as THREE from 'three';

// ── CAMERA CONTROLLER ──
// Synchronizes the 3D camera with the actual DOM scroll
function ScrollCamera() {
  const scrollRef = useRef(0);
  const targetZ = useRef(35); // Start position

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollRef.current = window.scrollY / scrollHeight;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    // Scroll goes from 0 to 1.
    // Map scroll to Z axis: Start at z=35, end at z=-55
    const mappedZ = 35 - scrollRef.current * 90;
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, mappedZ, delta * 4);

    state.camera.position.z = targetZ.current;
    
    // Add a slight parallax/sway based on scroll progress
    const swayX = Math.sin(scrollRef.current * Math.PI * 4) * 2;
    const swayY = Math.cos(scrollRef.current * Math.PI * 4) * 1 + 2;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, swayX, delta * 2);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, swayY, delta * 2);

    state.camera.lookAt(swayX * 0.5, swayY * 0.5, targetZ.current - 20);
  });

  return null;
}

// ── FLOATING STARS ──
function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const count = 3000;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 150; // Deep Z spread
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <PointMaterial transparent color="#a5b4fc" size={0.08} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.8} />
    </points>
  );
}

// ── PLANET 1: CYBERPUNK RING PLANET (HERO / ABOUT) ──
function Planet1() {
  const planetRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.1;
      planetRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1} position={[-8, 0, 15]}>
      <group ref={planetRef} rotation={[0.4, 0.2, 0]}>
        <Sphere args={[3.5, 64, 64]}>
          <meshStandardMaterial 
            color="#1e1e2f" 
            roughness={0.8} 
            metalness={0.2} 
            emissive="#0f172a" 
            wireframe={true} 
            wireframeLinewidth={1} 
          />
        </Sphere>
        <Sphere args={[3.45, 32, 32]}>
          <meshStandardMaterial color="#080812" roughness={1} />
        </Sphere>
        {/* Glowing Rings */}
        <Ring args={[4.5, 6, 64]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#6366f1" transparent opacity={0.4} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </Ring>
        <Ring args={[6.2, 6.4, 64]} rotation={[-Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
        </Ring>
      </group>
    </Float>
  );
}

// ── PLANET 2: DARK GLOWING SPHERE (EXPERIENCE / PROJECTS) ──
function Planet2() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 0.08;
      // Pulsating emissive intensity
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} position={[8, -2, -10]}>
      <Sphere ref={ref} args={[4, 64, 64]}>
        <meshStandardMaterial 
          color="#06b6d4" 
          emissive="#06b6d4"
          roughness={0.2} 
          metalness={0.8} 
          wireframe={true}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
      {/* Solid dark core */}
      <Sphere args={[3.8, 32, 32]}>
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </Sphere>
    </Float>
  );
}

// ── PLANET 3: DEEP SPACE NEBULA CORE (SKILLS / CONTACT) ──
function Planet3() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.05;
      ref.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <Float speed={0.8} rotationIntensity={0.4} position={[-6, 4, -40]}>
      <group ref={ref}>
        {/* Core */}
        <Sphere args={[5, 64, 64]}>
          <meshStandardMaterial 
            color="#8b5cf6" 
            emissive="#4c1d95" 
            roughness={0.4} 
            metalness={0.5} 
          />
        </Sphere>
        {/* Atmosphere */}
        <Sphere args={[5.5, 32, 32]}>
          <meshBasicMaterial 
            color="#6366f1" 
            transparent 
            opacity={0.2} 
            blending={THREE.AdditiveBlending} 
            side={THREE.BackSide} 
          />
        </Sphere>
        <Sphere args={[6, 32, 32]}>
          <meshBasicMaterial 
            color="#06b6d4" 
            transparent 
            opacity={0.1} 
            blending={THREE.AdditiveBlending} 
            side={THREE.BackSide} 
          />
        </Sphere>
      </group>
    </Float>
  );
}

export default function SpaceScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#05050A', pointerEvents: 'none' }}>
      <Canvas 
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 4, 35], fov: 60 }}
        dpr={[1, 2]} // clamp pixel ratio for performance
      >
        <color attach="background" args={['#05050A']} />
        <fog attach="fog" args={['#05050A', 15, 60]} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} color="#e0e7ff" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#06b6d4" />

        <ScrollCamera />
        <Starfield />
        <Planet1 />
        <Planet2 />
        <Planet3 />
      </Canvas>
      {/* Vignette overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, rgba(5,5,10,0.8) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}
