"use client";
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { GridHelper } from 'three';
import * as THREE from 'three';

// Particle field component
const ParticleField = ({ count = 3000 }) => {
  const mesh = useRef<THREE.Group>(null!);
  const [hover, setHover] = useState(false);
  const [clickPoint, setClickPoint] = useState(new THREE.Vector3(0, 0, 0));
  const { size, viewport, mouse } = useThree();
  const aspect = size.width / viewport.width;

  // Generate particles with instancing for better performance
  const particles = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const positions = [];
    const grid = Math.ceil(Math.pow(count, 1/3));
    const spacing = 2;
    const offset = (grid * spacing) / 2;

    for (let i = 0; i < count; i++) {
      const x = (i % grid) * spacing - offset;
      const y = Math.floor((i / grid) % grid) * spacing - offset;
      const z = Math.floor(i / (grid * grid)) * spacing - offset;
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, [count]);

  // Set up instanced buffer attributes
  useEffect(() => {
    const geometry = particles.current.geometry;
    const positionAttr = new THREE.BufferAttribute(positions, 3);
    geometry.setAttribute('instPosition', positionAttr);
  }, [positions]);

  // Animation logic
  useFrame(({ clock, mouse }) => {
    const time = clock.getElapsedTime();
    
    // Update instanced matrices based on animation logic
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = positions[i * 3 + 2];
      
      // Convert mouse to world coordinates
      const mouseX = (mouse.x * viewport.width) / 2;
      const mouseY = (mouse.y * viewport.height) / 2;
      
      // Calculate distance to mouse for hover effect
      const distance = Math.sqrt(
        Math.pow(x - mouseX, 2) + 
        Math.pow(y - mouseY, 2)
      );
      
      // Calculate distance to click point for ripple effect
      const clickDistance = Math.sqrt(
        Math.pow(x - clickPoint.x, 2) + 
        Math.pow(y - clickPoint.y, 2) + 
        Math.pow(z - clickPoint.z, 2)
      );
      
      // Wave motion 
      const frequency = 0.5;
      const amplitude = 0.5;
      const waveFactor = Math.sin(time * frequency + (x + y + z) * 0.1) * amplitude;
      
      // Click ripple effect
      const rippleFactor = Math.sin(time * 3 - clickDistance * 0.5) * 
                           Math.exp(-clickDistance * 0.2) * 
                           (hover ? 0.5 : 0.2);
      
      // Mouse proximity effect (strongest near mouse)
      const mouseInfluence = hover ? Math.exp(-distance * 0.1) * 0.5 : 0;
      
      // Combine all effects
      const totalOffset = waveFactor + rippleFactor + mouseInfluence;
      
      // Apply position with offset
      dummy.position.set(
        x,
        y + totalOffset,
        z
      );
      
      // Scale based on effects
      const baseScale = 0.04;
      const dynamicScale = baseScale * (1 + totalOffset * 0.3);
      dummy.scale.set(dynamicScale, dynamicScale, dynamicScale);
      
      // Add slight rotation for visual interest
      dummy.rotation.set(time * 0.1 + x, time * 0.1 + y, time * 0.1 + z);
      
      // Update matrix
      dummy.updateMatrix();
      particles.current.setMatrixAt(i, dummy.matrix);
    }
    
    // Flag for matrix update
    particles.current.instanceMatrix.needsUpdate = true;
    
    // Rotate the entire field slightly
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.05;
      mesh.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <group ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={(e) => {
        e.stopPropagation();
        // Store click point in world coordinates
        setClickPoint(new THREE.Vector3(
          (e.point.x),
          (e.point.y),
          (e.point.z)
        ));
      }}
    >
      <instancedMesh ref={particles} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial 
          color="#4A55A2"
          emissive="#1E3A8A"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>
    </group>
  );
};

// Background grid to enhance 3D perspective
const Grid = () => {
  const gridRef = useRef<GridHelper>(null!);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.1;
    if (gridRef.current && gridRef.current.material) {
      (gridRef.current.material as THREE.Material).opacity = 0.1 + Math.sin(t) * 0.05;
    }
  });
  
  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, "#4338ca", "#3730a3"]}
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
    >
      <meshBasicMaterial color="#3730a3" transparent opacity={0.1} />
    </gridHelper>
  );
};

// Main scene with post-processing effects
const SceneContent = () => {
  const sceneRef = useRef<THREE.Group>(null!);
  
  useFrame(({ clock, mouse }) => {
    if (sceneRef.current) {
      // Subtle camera movement following mouse
      sceneRef.current.rotation.x = mouse.y * 0.1;
      sceneRef.current.rotation.y = mouse.x * 0.1;
    }
  });
  
  return (
    <group ref={sceneRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
      <spotLight 
        position={[0, 15, 0]} 
        intensity={0.5} 
        angle={0.5} 
        penumbra={1} 
        color="#818cf8" 
      />
      
      <ParticleField count={2000} />
      <Grid />
      
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          intensity={0.8} 
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </group>
  );
};

export default function ThreeScene() {
  // Make sure we're in a browser environment
  const [isBrowser, setIsBrowser] = useState(false);
  
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  if (!isBrowser) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 w-full h-screen pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          zIndex: -1
        }}
        dpr={[1, 2]} // Responsive performance
      >
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 15, 30]} />
        <SceneContent />
      </Canvas>
      <div className="absolute bottom-4 left-4 text-xs text-blue-300 opacity-50">
        Click anywhere to create ripples
      </div>
    </div>
  );
}