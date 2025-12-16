'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
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

  // Leva controls for main planet - ADJUSTABLE IN REAL-TIME
  const mainPlanet = useControls('Main Planet (Red)', {
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.17, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.6, min: 0, max: 5, step: 0.1 },
    ior: { value: 1.4, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0.4, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.13, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.45, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.65, min: 0, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.35, min: 0, max: 1, step: 0.01 },
    color: '#ffffff',
  })

  const innerPlanet = useControls('Inner Planet', {
    scale: { value: 0.6, min: 0.1, max: 1.5, step: 0.05 },
    transmission: { value: 0.65, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.25, min: 0, max: 1, step: 0.01 },
    thickness: { value: 2.2, min: 0, max: 5, step: 0.1 },
    ior: { value: 1.85, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0.5, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.2, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.5, min: 0, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    color: '#c4d8ee',
  })

  const bluePlanet = useControls('Blue Planet', {
    transmission: { value: 0.53, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.15, min: 0, max: 1, step: 0.01 },
    thickness: { value: 1, min: 0, max: 5, step: 0.1 },
    ior: { value: 1.5, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0.6, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.23, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.5, min: 0, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    color: '#6699ff',
  })

  const yellowPlanes = useControls('Yellow Planes', {
    transmission: { value: 0.85, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.08, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.2, min: 0, max: 5, step: 0.1 },
    ior: { value: 1, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0.07, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.03, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.1, min: 0, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    color: '#ffff66',
  })

  const ring = useControls('Ring', {
    transmission: { value: 0.22, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.05, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.9, min: 0, max: 5, step: 0.1 },
    ior: { value: 1.5, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0.3, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0, min: 0, max: 1, step: 0.01 },
    temporalDistortion: { value: 0, min: 0, max: 1, step: 0.01 },
    color: '#98b9ff',
  })

  const global = useControls('Global', {
    samples: { value: 16, min: 1, max: 32, step: 1, label: 'Samples (Quality)' },
    resolution: { value: 512, min: 128, max: 2048, step: 128, label: 'Resolution' },
  })

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
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#faf8f5' }}>
      {!isReady ? (
        <div className="text-black text-center max-w-3xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4">🎬 High-Quality Recording Setup</h1>
          <p className="text-3xl mb-8 font-bold text-red-600">Starting in {countdown}...</p>

          <div className="bg-black/5 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold mb-4">⚙️ IMPORTANT: Quality Settings</h2>
            <div className="text-left space-y-4 text-base">
              <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4">
                <p className="font-bold text-lg mb-2">🚨 For MAXIMUM Quality:</p>
                <p>• Use <strong>QuickTime Player</strong> (not Cmd+Shift+5)</p>
                <p>• File → New Screen Recording</p>
                <p>• Options → Quality: <strong>High</strong></p>
                <p>• Record ONLY this browser window (not full screen)</p>
              </div>

              <div className="border-2 border-blue-500 rounded-lg p-4 bg-blue-50">
                <p className="font-bold text-lg mb-2">📹 Recording Specs:</p>
                <p>• <strong>Resolution:</strong> 1920x1080 minimum</p>
                <p>• <strong>Frame Rate:</strong> 60 FPS (or 30 FPS minimum)</p>
                <p>• <strong>Duration:</strong> 15-20 seconds (one full rotation)</p>
                <p>• <strong>Format:</strong> MOV or MP4</p>
                <p>• <strong>Expected file size:</strong> 15-30MB (that's good!)</p>
              </div>

              <div className="border-2 border-green-500 rounded-lg p-4 bg-green-50">
                <p className="font-bold text-lg mb-2">✅ Checklist:</p>
                <p>✓ QuickTime open and ready</p>
                <p>✓ Quality set to High</p>
                <p>✓ Browser window maximized</p>
                <p>✓ Recording will start in {countdown} seconds</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">Scene will auto-rotate smoothly • Perfect for looping</p>
        </div>
      ) : (
        <div className="w-full h-full">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{
              alpha: true,
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
