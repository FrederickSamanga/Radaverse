"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function VanillaThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#020617', 15, 30);
    scene.background = new THREE.Color('#020617');
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.2);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight('#60a5fa', 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const spotLight = new THREE.SpotLight('#818cf8', 0.5);
    spotLight.position.set(0, 15, 0);
    spotLight.angle = 0.5;
    spotLight.penumbra = 1;
    scene.add(spotLight);
    
    // Create particle system
    const particleCount = 2000;
    const particles = new THREE.Group();
    
    // Generate particles
    const material = new THREE.MeshStandardMaterial({
      color: '#4A55A2',
      emissive: '#1E3A8A',
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
    });
    
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    
    const particleMeshes: THREE.Mesh[] = [];
    const particleOriginalPositions: THREE.Vector3[] = [];
    
    // Create particle grid
    const grid = Math.ceil(Math.pow(particleCount, 1/3));
    const spacing = 2;
    const offset = (grid * spacing) / 2;
    // Add star particles (background)
    const starCount = 500;
    const starGeometry = new THREE.SphereGeometry(0.02, 6, 6);
    const starMaterial = new THREE.MeshBasicMaterial({
      color: '#ffffff',
      transparent: true,
      opacity: 0.8
    });

    const stars = new THREE.Group();
    const starPositions: THREE.Vector3[] = [];
    const starSpeeds: number[] = [];

    for (let i = 0; i < starCount; i++) {
      // Random positions in a wider area than the main particles
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      
      const star = new THREE.Mesh(starGeometry, starMaterial);
      star.position.set(x, y, z);
      // Random sizes for stars
      const scale = Math.random() * 1.5 + 0.5;
      star.scale.set(scale, scale, scale);
      
      stars.add(star);
      starPositions.push(new THREE.Vector3(x, y, z));
      starSpeeds.push(Math.random() * 0.03 + 0.01);
    }

    scene.add(stars);

    // Function to update stars in the animation loop
    const updateStars = (time: number) => {
      stars.children.forEach((star, i) => {
        // Slow drift motion
        star.position.z += starSpeeds[i];
        // Wrap around when too far
        if (star.position.z > 30) star.position.z = -30;
        // Twinkle effect
        const twinkle = Math.sin(time * 3 + i) * 0.2 + 0.8;
        star.scale.set(twinkle, twinkle, twinkle);
        ((star as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = twinkle * 0.7;
      });
    };
    for (let i = 0; i < particleCount; i++) {
      const x = (i % grid) * spacing - offset;
      const y = Math.floor((i / grid) % grid) * spacing - offset;
      const z = Math.floor(i / (grid * grid)) * spacing - offset;
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      particles.add(mesh);
      particleMeshes.push(mesh);
      particleOriginalPositions.push(new THREE.Vector3(x, y, z));
    }
    
    scene.add(particles);
    
    // Add grid helper
    const gridHelper = new THREE.GridHelper(40, 40, '#4338ca', '#3730a3');
    gridHelper.position.y = -5;
    const gridMaterial = new THREE.LineBasicMaterial({
      color: '#3730a3',
      transparent: true,
      opacity: 0.1
    });
    gridHelper.material = gridMaterial;
    scene.add(gridHelper);
    
    // State for animations
    let mouseX = 0;
    let mouseY = 0;
    let clickPoint = new THREE.Vector3(0, 0, 0);
    let isHovering = false;
    
    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Set hover state to true and store the time of last movement
      isHovering = true;
      
      // Keep track of the last position for water-like trail effect
      // The actual fading effect will be handled in updateTrails function
    };
    
    // Handle clicks
    const handleClick = (event: MouseEvent) => {
      // Convert mouse position to 3D coordinates (simplified)
      const vector = new THREE.Vector3(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      clickPoint = camera.position.clone().add(dir.multiplyScalar(distance));
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);
    
    // Make grid brighter
    gridHelper.material = new THREE.LineBasicMaterial({
      color: '#4338ca',
      transparent: true,
      opacity: 0.25 // Increased from 0.1 to 0.25
    });
    
    // Add cursor trail particles
    const trailCount = 20;
    const trailParticles = new THREE.Group();
    const trailGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const trailMaterial = new THREE.MeshStandardMaterial({
      color: '#60a5fa',
      emissive: '#3b82f6',
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.8
    });
    
    const trails: THREE.Mesh[] = [];
    const trailPositions: THREE.Vector3[] = [];
    
    for (let i = 0; i < trailCount; i++) {
      const trail = new THREE.Mesh(trailGeometry, trailMaterial.clone());
      trail.visible = false;
      trails.push(trail);
      trailPositions.push(new THREE.Vector3(0, 0, 0));
      trailParticles.add(trail);
    }
    
    scene.add(trailParticles);
    
    // Modify particle update function
    const updateParticles = (time: number) => {
      particleMeshes.forEach((mesh, index) => {
      const originalPos = particleOriginalPositions[index];
      
      // More chaotic wave motion with multiple frequencies
      const waveFactor = 
        Math.sin(time * 0.8 + originalPos.x * 0.3) * 0.6 + 
        Math.cos(time * 1.2 + originalPos.y * 0.4) * 0.4 +
        Math.sin(time * 0.5 + originalPos.z * 0.5) * 0.5;
      
      // Random jitter
      const jitter = Math.sin(time * 3 + index) * 0.1;
      
      // Distance to click point
      const clickDistance = mesh.position.distanceTo(clickPoint);
      
      // Click ripple effect
      const rippleFactor = Math.sin(time * 3 - clickDistance * 0.5) * 
                 Math.exp(-clickDistance * 0.2) * 
                 (isHovering ? 0.7 : 0.3);
      
      // Combined movement with more randomness
      const totalOffset = waveFactor + rippleFactor + jitter;
      
      // Update position with more axes affected
      mesh.position.x = originalPos.x + Math.sin(time * 0.3 + index) * 0.2;
      mesh.position.y = originalPos.y + totalOffset;
      mesh.position.z = originalPos.z + Math.cos(time * 0.4 + index) * 0.2;
      
      // Dynamic scale based on movement
      const baseScale = 0.04;
      const dynamicScale = baseScale * (1 + Math.abs(totalOffset) * 0.5);
      mesh.scale.set(dynamicScale, dynamicScale, dynamicScale);
      
      // More chaotic rotation
      mesh.rotation.x = time * 0.2 + originalPos.x;
      mesh.rotation.y = time * 0.3 + originalPos.y;
      mesh.rotation.z = time * 0.1 + originalPos.z;
      });
    };
    
    // Update trail particles
    const updateTrails = () => {
      if (isHovering) {
      // Create vector for mouse position in 3D space
      const vector = new THREE.Vector3(
        mouseX,
        mouseY,
        0.5
      );
      vector.unproject(camera);
      
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const cursorPos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Shift all trail positions
      for (let i = trailCount - 1; i > 0; i--) {
        trailPositions[i].copy(trailPositions[i-1]);
      }
      trailPositions[0].copy(cursorPos);
      
      // Update trail meshes
      trails.forEach((trail, i) => {
        trail.position.copy(trailPositions[i]);
        trail.visible = true;
        const scale = 1 - (i / trailCount);
        trail.scale.set(scale, scale, scale);
        (trail.material as THREE.MeshStandardMaterial).opacity = scale * 0.8;
      });
      }
    };
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      const time = performance.now() * 0.001; // Convert to seconds
      
      updateParticles(time);
      updateTrails();
      updateStars(time);
      
      // Camera motion
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
  
    animate();
  
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);
  
// ...existing code...

return (
  <div 
    ref={containerRef} 
    className="fixed inset-0 -z-10" 
    style={{ width: '100%', height: '100%' }}
  />
);
}

