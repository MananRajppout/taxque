"use client";

import React, { useEffect, useRef } from "react";

const ScrollAnimations: React.FC = () => {
  const fadeRef = useRef<HTMLDivElement>(null);
  const rotateRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
 
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    [fadeRef, rotateRef, scaleRef, slideRef, flipRef].forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
     
      <div 
        ref={fadeRef} 
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      >
        <div className="text-center opacity-0 translate-y-20 transition-all duration-1000 ease-out animate-in:opacity-100 animate-in:translate-y-0">
          <h2 className="text-6xl font-bold mb-8">Fade In Animation</h2>
          <p className="text-xl">Smooth fade in with upward movement</p>
        </div>
      </div>

      
      <div 
        ref={rotateRef} 
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-600 text-white"
      >
        <div className="text-center opacity-0 scale-50 rotate-180 transition-all duration-1000 ease-out animate-in:opacity-100 animate-in:scale-100 animate-in:rotate-0">
          <h2 className="text-6xl font-bold mb-8">Rotate Animation</h2>
          <p className="text-xl">Rotation with scale effect</p>
        </div>
      </div>

      
      <div 
        ref={scaleRef} 
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-600 text-white"
      >
        <div className="text-center opacity-0 scale-200 -translate-y-20 transition-all duration-1000 ease-out animate-in:opacity-100 animate-in:scale-100 animate-in:translate-y-0">
          <h2 className="text-6xl font-bold mb-8">Scale Animation</h2>
          <p className="text-xl">Scale up with downward movement</p>
        </div>
      </div>

     
      <div 
        ref={slideRef} 
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-600 text-white"
      >
        <div className="text-center opacity-0 -translate-x-32 transition-all duration-1000 ease-out animate-in:opacity-100 animate-in:translate-x-0">
          <h2 className="text-6xl font-bold mb-8">Slide In Animation</h2>
          <p className="text-xl">Slide in from the left</p>
        </div>
      </div>

     
      <div 
        ref={flipRef} 
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600 text-white"
      >
        <div className="text-center opacity-0 rotate-y-180 transition-all duration-1000 ease-out animate-in:opacity-100 animate-in:rotate-y-0">
          <h2 className="text-6xl font-bold mb-8">Flip Animation</h2>
          <p className="text-xl">3D flip effect</p>
        </div>
      </div>

      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-6xl font-bold mb-8">End of Demo ✨</h2>
          <p className="text-xl">Scroll back up to see the animations again!</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollAnimations;
