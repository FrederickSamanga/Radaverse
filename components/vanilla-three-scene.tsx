"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

export default function VanillaThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  
  // Determine the current theme, with fallback to 'dark'
  const currentTheme = (theme === 'system' ? resolvedTheme : theme) || 'dark';
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Theme-specific colors
    const colors = {
      dark: {
        background: '#020617',
        fog: '#020617',
        bubble: '#60a5fa',
        bubbleEmissive: '#3b82f6',
        particle: '#4A55A2',
        particleEmissive: '#1E3A8A',
        grid: '#4338ca',
        gridOpacity: 0.25,
        trail: '#60a5fa',
        trailEmissive: '#3b82f6',
        burst: '#EF4444',
        burstEmissive: '#B91C1C',
        star: '#ffffff',
      },
      light: {
        background: '#f8fafc', // Light gray/silver background
        fog: '#e2e8f0', // Light fog
        bubble: '#3b82f6', // Deeper blue for better visibility
        bubbleEmissive: '#2563eb',
        particle: '#64748b', // Gray particles
        particleEmissive: '#334155', // Darker gray for emissive
        grid: '#94a3b8', // Medium gray grid
        gridOpacity: 0.35, // Higher opacity for better visibility
        trail: '#3b82f6', // Blue trails
        trailEmissive: '#2563eb',
        burst: '#ef4444', // Red burst (kept the same)
        burstEmissive: '#b91c1c',
        star: '#94a3b8', // Gray stars
      }
    };
    
    // Get current theme colors - use 'dark' as fallback if theme is not 'light'
    const themeColors = colors[currentTheme === 'light' ? 'light' : 'dark'];
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(themeColors.fog, 15, 30);
    scene.background = new THREE.Color(themeColors.background);
    
    // Add bubbles that track cursor movement (desktop only)
    const bubbleCount = 15;
    const bubbles = new THREE.Group();
    const bubbleGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const bubbleMaterial = new THREE.MeshPhysicalMaterial({
      color: themeColors.bubble,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      transmission: 0.5,
      thickness: 0.5,
      clearcoat: 1.0
    });
    
    const bubbleMeshes: THREE.Mesh[] = [];
    const bubbleOffsets: {x: number, y: number, z: number, speed: number}[] = [];
    
    // Only create bubbles for desktop
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
      for (let i = 0; i < bubbleCount; i++) {
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial.clone());
      // Random initial positions around center
      bubble.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      // Random size variation
      const scale = Math.random() * 0.8 + 0.4;
      bubble.scale.set(scale, scale, scale);
      
      // Random offset and movement speed for each bubble
      bubbleOffsets.push({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * 4,
        speed: Math.random() * 0.02 + 0.01
      });
      
      bubbleMeshes.push(bubble);
      bubbles.add(bubble);
      }
      scene.add(bubbles);
    }
    
    // Update function for bubbles in the animation loop
    const updateBubbles = (time: number) => {
      if (bubbleMeshes.length === 0) return;
      
      // Create vector for cursor position in 3D space
      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera);
      
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const cursorPos = camera.position.clone().add(dir.multiplyScalar(distance));
      
      bubbleMeshes.forEach((bubble, i) => {
      const offset = bubbleOffsets[i];
      
      // Move toward cursor position with offset
      bubble.position.x += (cursorPos.x + offset.x - bubble.position.x) * offset.speed;
      bubble.position.y += (cursorPos.y + offset.y - bubble.position.y) * offset.speed;
      bubble.position.z += (cursorPos.z + offset.z - bubble.position.z) * offset.speed;
      
      // Gentle bobbing motion
      bubble.position.y += Math.sin(time * 2 + i) * 0.01;
      
      // Subtle rotation
      bubble.rotation.x = time * 0.1 + i;
      bubble.rotation.y = time * 0.2 + i;
      
      // Pulsing size
      const pulseScale = Math.sin(time * 1.5 + i * 0.5) * 0.1 + 1;
      const baseScale = bubble.scale.x / pulseScale;
      bubble.scale.set(baseScale * pulseScale, baseScale * pulseScale, baseScale * pulseScale);
      
      // Opacity variation
      const material = bubble.material as THREE.MeshPhysicalMaterial;
      material.opacity = 0.4 + Math.sin(time * 2 + i) * 0.2;
      });
    };
    
    // Detect if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Store canvas element for event checking
    const canvasElement = renderer.domElement;
    
    // Add lights - adjusted for theme
    const ambientLight = new THREE.AmbientLight(
      '#ffffff', 
      currentTheme === 'light' ? 0.5 : 0.2
    );
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(themeColors.bubble, currentTheme === 'light' ? 1.5 : 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const spotLight = new THREE.SpotLight('#818cf8', currentTheme === 'light' ? 0.8 : 0.5);
    spotLight.position.set(0, 15, 0);
    spotLight.angle = 0.5;
    spotLight.penumbra = 1;
    scene.add(spotLight);
    
    // Create particle system with count optimized for mobile
    const particleCount = isMobile ? 1000 : 2000; // Reduce count on mobile
    const particles = new THREE.Group();
    
    // Generate particles
    const material = new THREE.MeshStandardMaterial({
      color: themeColors.particle,
      emissive: themeColors.particleEmissive,
      emissiveIntensity: currentTheme === 'light' ? 0.3 : 0.5,
      metalness: currentTheme === 'light' ? 0.6 : 0.8,
      roughness: currentTheme === 'light' ? 0.4 : 0.2,
    });
    
    const geometry = new THREE.SphereGeometry(0.05, 8, 8);
    
    const particleMeshes: THREE.Mesh[] = [];
    const particleOriginalPositions: THREE.Vector3[] = [];
    
    // Create particle grid
    const grid = Math.ceil(Math.pow(particleCount, 1/3));
    const spacing = 2;
    const offset = (grid * spacing) / 2;
    
    // Add star particles (background)
    const starCount = isMobile ? 300 : 500; // Reduce count on mobile
    const starGeometry = new THREE.SphereGeometry(0.02, 6, 6);
    const starMaterial = new THREE.MeshBasicMaterial({
      color: themeColors.star,
      transparent: true,
      opacity: currentTheme === 'light' ? 0.9 : 0.8
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
    
    // Add grid helper with theme-appropriate colors
    const gridHelper = new THREE.GridHelper(40, 40, themeColors.grid, themeColors.grid);
    gridHelper.position.y = -5;
    const gridMaterial = new THREE.LineBasicMaterial({
      color: themeColors.grid,
      transparent: true,
      opacity: themeColors.gridOpacity
    });
    gridHelper.material = gridMaterial;
    scene.add(gridHelper);
    
    // State for animations
    let mouseX = 0;
    let mouseY = 0;
    let clickPoint = new THREE.Vector3(0, 0, 0);
    let isHovering = false;
    let lastTouchTime = 0;
    let isGyroscopeActive = false;
    let gyroData = { alpha: 0, beta: 0, gamma: 0 };
    let lastPinchDistance = 0;
    let touchStartY = 0;
    let touchStartX = 0;

    // DESKTOP: Handle pointer movement for mouse
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Set hover state to true
      isHovering = true;
    };
    
    // MOBILE: Handle pointer movement for touch
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touchY = event.touches[0].clientY;
        const touchX = event.touches[0].clientX;
        
        // Calculate deltas
        const deltaY = Math.abs(touchY - touchStartY);
        const deltaX = Math.abs(touchX - touchStartX);
        
        // If touch movement is more horizontal than vertical, use it for scene interaction
        if (deltaX > deltaY) {
          event.preventDefault(); // Only prevent default for horizontal movements
        }
        
        // Always update pointer position to affect the scene
        mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        
        // Set last touch time for trail decay
        lastTouchTime = performance.now();
        
        // Set hover state to true
        isHovering = true;
      } else if (event.touches.length >= 2) {
        // Pinch-zoom gesture - prevent default to handle it ourselves
        event.preventDefault();
        
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        
        const currentPinchDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        if (lastPinchDistance > 0) {
          const pinchDelta = currentPinchDistance - lastPinchDistance;
          
          // Zoom camera based on pinch
          camera.position.z = Math.max(5, Math.min(25, camera.position.z - pinchDelta * 0.05));
        }
        
        lastPinchDistance = currentPinchDistance;
      }
    };
    
    // Handle mouse hover end
    const handleMouseLeave = () => {
      isHovering = false;
    };
    
    // Handle touch end
    const handleTouchEnd = () => {
      lastPinchDistance = 0;
      // Keep isHovering true for a bit longer for better mobile experience
      setTimeout(() => { isHovering = false; }, 300);
    };
    
    // Handle click/touch events
    const handleClick = (event: MouseEvent) => {
      // Get click position
      const clientX = event.clientX;
      const clientY = event.clientY;
      
      // Convert click position to 3D coordinates
      const vector = new THREE.Vector3(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      clickPoint = camera.position.clone().add(dir.multiplyScalar(distance));
      
      // Create a burst effect on click
      createBurstEffect(clickPoint);
    };
    
    // Handle touch start
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        // Store touch start position for scroll detection
        touchStartY = event.touches[0].clientY;
        touchStartX = event.touches[0].clientX;
        
        // Get touch position
        const clientX = event.touches[0].clientX;
        const clientY = event.touches[0].clientY;
        
        // Convert touch position to 3D coordinates
        const vector = new THREE.Vector3(
          (clientX / window.innerWidth) * 2 - 1,
          -(clientY / window.innerHeight) * 2 + 1,
          0.5
        );
        vector.unproject(camera);
        
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        clickPoint = camera.position.clone().add(dir.multiplyScalar(distance));
        
        // Create a burst effect on touch
        createBurstEffect(clickPoint);
      } else if (event.touches.length >= 2) {
        // Handle pinch zoom initialization
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        lastPinchDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      }
    };
    
    // Create burst effect for click/touch with theme-appropriate color
    const createBurstEffect = (position: THREE.Vector3) => {
      // Create particles that explode outward from the click point
      const burstGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const burstMaterial = new THREE.MeshStandardMaterial({
        color: themeColors.burst,
        emissive: themeColors.burstEmissive,
        emissiveIntensity: 2,
        transparent: true,
        opacity: 1
      });
      
      const burstCount = 15;
      const burstParticles: THREE.Mesh[] = [];
      const burstVelocities: THREE.Vector3[] = [];
      
      for (let i = 0; i < burstCount; i++) {
        const burst = new THREE.Mesh(burstGeometry, burstMaterial.clone());
        burst.position.copy(position);
        
        // Random direction for each burst particle
        const velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize().multiplyScalar(0.2);
        
        burstVelocities.push(velocity);
        burstParticles.push(burst);
        scene.add(burst);
      }
      
      // Animate the burst effect
      let burstFrame = 0;
      const animateBurst = () => {
        if (burstFrame >= 60) {
          // Remove burst particles after animation
          burstParticles.forEach(particle => scene.remove(particle));
          return;
        }
        
        burstParticles.forEach((particle, i) => {
          // Move particle outward
          particle.position.add(burstVelocities[i]);
          
          // Fade out
          const material = particle.material as THREE.MeshStandardMaterial;
          material.opacity = 1 - burstFrame / 60;
          
          // Shrink
          const scale = 1 - burstFrame / 60;
          particle.scale.set(scale, scale, scale);
        });
        
        burstFrame++;
        requestAnimationFrame(animateBurst);
      };
      
      animateBurst();
    };
    
    // Device orientation for mobile gyroscope support
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isGyroscopeActive && event.beta !== null && event.gamma !== null) {
        isGyroscopeActive = true;
      }
      
      if (isGyroscopeActive) {
        // Store orientation data with fallbacks for null values
        gyroData.alpha = event.alpha || 0;
        gyroData.beta = event.beta || 0;
        gyroData.gamma = event.gamma || 0;
      }
    };
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    // Add event listeners - conditionally based on device type
    window.addEventListener('resize', handleResize);

    if (isMobile) {
      canvasElement.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);

      if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    } else {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      canvasElement.addEventListener('click', handleClick);
    }
    
    // Common event listeners
    window.addEventListener('resize', handleResize);
    
    // Make grid brighter
    gridHelper.material = new THREE.LineBasicMaterial({
      color: '#4338ca',
      transparent: true,
      opacity: 0.25
    });
    
    // Add cursor trail particles
    const trailCount = 20;
    const trailParticles = new THREE.Group();
    const trailGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const trailMaterial = new THREE.MeshStandardMaterial({
      color: themeColors.trail,
      emissive: themeColors.trailEmissive,
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
    
    // Update particle function with mobile optimizations
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
        
        // Gyroscope effect for mobile
        let gyroFactor = 0;
        if (isGyroscopeActive) {
          gyroFactor = 
            Math.sin(gyroData.beta * 0.01) * 0.2 + 
            Math.cos(gyroData.gamma * 0.01) * 0.2;
        }
        
        // Combined movement with more randomness
        const totalOffset = waveFactor + rippleFactor + jitter + gyroFactor;
        
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
    
    // Update trail particles - enhanced for mobile
    const updateTrails = (time: number) => {
      // For mobile, keep trails visible for a short time after last touch
      const trailDecayTime = 500; // ms
      const timeSinceLastTouch = performance.now() - lastTouchTime;
      const showTrails = isHovering || (timeSinceLastTouch < trailDecayTime);
      
      if (showTrails) {
        // Create vector for pointer position in 3D space
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
          
          // Scale and opacity based on trail position
          const scale = 1 - (i / trailCount);
          trail.scale.set(scale, scale, scale);
          
          // For mobile, add pulsing effect to trails
          const pulseEffect = isMobile ? Math.sin(time * 5 + i) * 0.2 + 0.8 : 1;
          (trail.material as THREE.MeshStandardMaterial).opacity = scale * 0.8 * pulseEffect;
          
          // Add color variation for mobile
          if (isMobile) {
            const hue = (time * 0.1 + i * 0.05) % 1;
            const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
            (trail.material as THREE.MeshStandardMaterial).emissive = color;
          }
        });
      } else {
        // Fade out trails when not hovering/touching
        trails.forEach(trail => {
          if (trail.visible) {
            const material = trail.material as THREE.MeshStandardMaterial;
            material.opacity *= 0.95;
            if (material.opacity < 0.05) trail.visible = false;
          }
        });
      }
    };
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      const time = performance.now() * 0.001; // Convert to seconds
      
      updateBubbles(time);
      updateParticles(time);
      updateTrails(time);
      updateStars(time);
      
      // Convert gyroscope data to usable values
      const gyroX = isGyroscopeActive ? -gyroData.gamma * 0.01 : 0;
      const gyroY = isGyroscopeActive ? -gyroData.beta * 0.01 : 0;
      
      if (isGyroscopeActive && isMobile) {
        camera.position.x += (gyroX * 5 - camera.position.x) * 0.03;
        camera.position.y += (gyroY * 5 - camera.position.y) * 0.03;
      } else if (isMobile) {
        // Mobile without gyroscope: Reduced Y-axis effect for better scrolling
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 3 - camera.position.y) * 0.03; // Reduced effect on Y-axis
      } else {
        // Desktop: Original behavior
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 3 - camera.position.y) * 0.05;
      }
      
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
  
    animate();
  
    // Cleanup
    return () => {
      if (isMobile) {
        // Mobile cleanup
        canvasElement.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);

        if (window.DeviceOrientationEvent) {
          window.removeEventListener('deviceorientation', handleDeviceOrientation);
        }
      } else {
        // Desktop cleanup
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        canvasElement.removeEventListener('click', handleClick);
      }

      window.removeEventListener('resize', handleResize);

      // Ensure to remove any added DOM elements and dispose of resources
      if (containerRef.current && renderer.domElement && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [currentTheme]); // Use currentTheme in dependency array to refresh when theme changes

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10" 
      style={{ width: '100%', height: '100%' }}
    />
  );
}