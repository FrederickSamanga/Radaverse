"use client";

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import ThreeScene with no SSR
const ThreeSceneComponent = dynamic(
  () => import('@/components/three-scene'),
  { ssr: false }
);

export default function ThreeSceneWrapper() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-[#020617]" />}>
      <ThreeSceneComponent />
    </Suspense>
  );
}
