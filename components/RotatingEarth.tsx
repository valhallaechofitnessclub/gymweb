'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Earth() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Load the Earth texture - using a reliable CDN source
    const texture = useLoader(
        THREE.TextureLoader,
        'https://threejs.org/examples/textures/planets/earth_night_4096.jpg'
    );

    // Rotate the Earth
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial
                map={texture}
                metalness={0.1}
                roughness={0.8}
            />
        </mesh>
    );
}

export default function RotatingEarth() {
    const [isMounted, setIsMounted] = useState(false);

    // Only render on client side to avoid hydration errors
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <div style={{ width: '100%', height: '100vh', background: 'transparent' }} />
        );
    }

    return (
        <div style={{ width: '100%', height: '50vh' }}>
            <Canvas
                camera={{ position: [0, 0, 4], fov: 75 }}
                style={{ background: 'transparent' }}
                gl={{ alpha: true }}
            >
                <ambientLight intensity={2} />
                <directionalLight position={[5, 3, 5]} intensity={3} />
                <pointLight position={[-5, 0, 5]} intensity={1} />
                <pointLight position={[0, -5, 0]} intensity={0.5} />
                <pointLight position={[0, 5, 0]} intensity={0.5} />

                <Earth />

                <OrbitControls
                    enableZoom={false}   // disable zoom
                    enablePan={false}    // disable pan
                />
            </Canvas>
        </div>
    );
}