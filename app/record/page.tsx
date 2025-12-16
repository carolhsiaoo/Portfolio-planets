'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

/**
 * RECORDING PAGE
 * This page is designed specifically for screen recording the 3D scene
 * Navigate to: http://localhost:3000/record
 *
 * Features:
 * - Clean black background
 * - Smooth auto-rotation
 * - No text overlay
 * - Optimized lighting for video
 * - 1920x1080 aspect ratio guide
 */

function InteractivePlanetsModel() {
  const { nodes } = useGLTF('/models/planets.glb') as any
  const groupRef = useRef<THREE.Group>(null)

  // Material properties - optimized for video recording
  const mainPlanet = {
    transmission: 1,
    roughness: 0.17,
    thickness: 0.6,
    ior: 1.4,
    chromaticAberration: 0.4,
    anisotropy: 0.13,
    distortion: 0.45,
    distortionScale: 0.65,
    temporalDistortion: 0.35,
    color: '#ffffff',
  }

  const innerPlanet = {
    scale: 0.6,
    transmission: 0.65,
    roughness: 0.25,
    thickness: 2.2,
    ior: 1.85,
    chromaticAberration: 0.5,
    anisotropy: 0.3,
    distortion: 0.2,
    distortionScale: 0.5,
    temporalDistortion: 0.1,
    color: '#c4d8ee',
  }

  const bluePlanet = {
    transmission: 0.53,
    roughness: 0.15,
    thickness: 1,
    ior: 1.5,
    chromaticAberration: 0.6,
    anisotropy: 0.23,
    distortion: 0.3,
    distortionScale: 0.5,
    temporalDistortion: 0.1,
    color: '#6699ff',
  }

  const yellowPlanes = {
    transmission: 0.85,
    roughness: 0.08,
    thickness: 0.2,
    ior: 1,
    chromaticAberration: 0.07,
    anisotropy: 0.03,
    distortion: 0.1,
    distortionScale: 0.1,
    temporalDistortion: 0.1,
    color: '#ffff66',
  }

  const ring = {
    transmission: 0.22,
    roughness: 0.05,
    thickness: 0.9,
    ior: 1.5,
    chromaticAberration: 0.3,
    anisotropy: 0.3,
    distortion: 0,
    distortionScale: 0,
    temporalDistortion: 0,
    color: '#98b9ff',
  }

  const global = {
    samples: 16, // Higher quality for recording
    resolution: 512, // Higher resolution for recording
  }

  // Smooth continuous rotation for video
  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Medium speed rotation - perfect for looping video (~21 second loop)
    groupRef.current.rotation.y += delta * 0.3 // Perfect speed for 15-20 second recording
  })

  return (
    <group ref={groupRef} scale={1.5} position={[0, 0, 0]} dispose={null}>
      {/* Small inner planet at center */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        position={[0, 0, 0]}
        rotation={[0.221, 0.142, 0.563]}
        scale={innerPlanet.scale}
      >
        <MeshTransmissionMaterial
          backside
          samples={global.samples}
          resolution={global.resolution}
          transmission={innerPlanet.transmission}
          roughness={innerPlanet.roughness}
          thickness={innerPlanet.thickness}
          ior={innerPlanet.ior}
          chromaticAberration={innerPlanet.chromaticAberration}
          anisotropy={innerPlanet.anisotropy}
          distortion={innerPlanet.distortion}
          distortionScale={innerPlanet.distortionScale}
          temporalDistortion={innerPlanet.temporalDistortion}
          color={innerPlanet.color}
        />
      </mesh>

      {/* Main planet */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        position={[0, -0.166, 0]}
        rotation={[0.221, 0.142, 0.563]}
        scale={1.035}
      >
        <MeshTransmissionMaterial
          backside
          samples={global.samples}
          resolution={global.resolution}
          {...mainPlanet}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={[-0.171, 1.39, -0.372]}
          rotation={[-0.262, 0, -0.579]}
          scale={1.098}
        >
          <MeshTransmissionMaterial
            backside
            samples={global.samples}
            resolution={global.resolution}
            {...bluePlanet}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          position={[1.547, 0.546, -0.146]}
          rotation={[1.639, -1.126, 0.77]}
          scale={0.788}
        >
          <MeshTransmissionMaterial
            backside
            samples={global.samples}
            resolution={global.resolution}
            {...yellowPlanes}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          position={[0.281, -1.323, 0.355]}
          rotation={[1.198, -1.347, 0.09]}
          scale={0.527}
        >
          <MeshTransmissionMaterial
            backside
            samples={global.samples}
            resolution={global.resolution}
            {...yellowPlanes}
          />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
        >
          <MeshTransmissionMaterial
            backside
            samples={global.samples}
            resolution={global.resolution}
            {...ring}
          />
        </mesh>
      </mesh>
    </group>
  )
}

export default function RecordPage() {
  const [isReady, setIsReady] = useState(false)
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    // Countdown before showing scene (gives you time to start recording)
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval)
          setTimeout(() => setIsReady(true), 1000)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(countdownInterval)
  }, [])

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      {!isReady ? (
        <div className="text-white text-center">
          <h1 className="text-6xl font-bold mb-4">Recording Scene Ready</h1>
          <p className="text-2xl mb-8">Starting in {countdown}...</p>
          <div className="text-sm text-gray-400 max-w-md mx-auto space-y-2">
            <p>• Start your screen recording software now</p>
            <p>• Record for 15-20 seconds (one full rotation)</p>
            <p>• Use 1920x1080 resolution</p>
            <p>• Scene will auto-rotate smoothly</p>
          </div>
        </div>
      ) : (
        <div className="w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{
              alpha: false,
              antialias: true,
              powerPreference: 'high-performance',
            }}
            style={{ background: 'transparent' }}
          >
            {/* Lighting optimized for video recording */}
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={4} color="#ffffff" />
            <directionalLight position={[-5, 3, 5]} intensity={2} color="#ffffff" />
            <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />

            {/* Environment map */}
            <Environment
              preset="studio"
              environmentIntensity={1.2}
              blur={0.6}
            />

            {/* 3D Model */}
            <InteractivePlanetsModel />

            {/* Disabled controls for smooth auto-rotation */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              autoRotate={false}
            />
          </Canvas>

          {/* Recording indicator */}
          <div className="fixed top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="text-sm font-medium">RECORDING</span>
          </div>

          {/* Timer to help you know when to stop */}
          <RecordingTimer />
        </div>
      )}
    </div>
  )
}

function RecordingTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-6 py-3 rounded-full backdrop-blur-sm">
      <div className="text-center">
        <div className="text-2xl font-mono">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
        <div className="text-xs text-gray-300 mt-1">
          {seconds < 15 ? 'Keep recording...' : 'Ready to stop (15s+)'}
        </div>
      </div>
    </div>
  )
}

// Preload the model
useGLTF.preload('/models/planets.glb')
