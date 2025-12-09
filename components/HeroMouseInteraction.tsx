'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { Model } from './PlanetsModel'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'

// Interactive Model Component with mouse following and magnetic effects
function InteractiveModel({ mousePosition, scale = 1.5, onHover }: { mousePosition: { x: number, y: number }, scale?: number, onHover: (planet: number | null) => void }) {
  const groupRef = useRef<THREE.Group>(null)
  const planetRefs = useRef<THREE.Mesh[]>([])
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null)

  const handleHover = (planet: number | null) => {
    setHoveredPlanet(planet)
    onHover(planet)
  }

  useFrame((state) => {
    if (!groupRef.current) return

    // Planets follow cursor - subtle rotation toward mouse
    const targetRotationY = mousePosition.x * 0.3
    const targetRotationX = -mousePosition.y * 0.3

    // Smooth lerp to target rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotationY,
      0.05
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.05
    )

    // Magnetic effect - pull toward cursor when near
    const distance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2)
    const magneticStrength = Math.max(0, 1 - distance / 2) * 0.5

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      mousePosition.x * magneticStrength,
      0.08
    )
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mousePosition.y * magneticStrength,
      0.08
    )
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <InteractivePlanetsModel
        scale={scale}
        position={[0, 0, 0]}
        onHover={handleHover}
        hoveredPlanet={hoveredPlanet}
      />
    </group>
  )
}

// Enhanced Model with hover detection and effects
function InteractivePlanetsModel({ scale, position, onHover, hoveredPlanet }: {
  scale: number,
  position: [number, number, number],
  onHover: (planet: number | null) => void,
  hoveredPlanet: number | null
}) {
  const { nodes } = useGLTF('/models/planets.glb') as any
  const meshRefs = useRef<{ [key: string]: THREE.Mesh }>({})

  // Leva controls (same as original)
  const mainPlanet = useControls('Main Planet (Red)', {
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
    thickness: { value: 1, min: 0, max: 5, step: 0.1 },
    ior: { value: 1.5, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0.5, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.2, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.5, min: 0, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    color: '#ff9999',
  })

  const bluePlanet = useControls('Blue Planet', {
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.15, min: 0, max: 1, step: 0.01 },
    thickness: { value: 1.2, min: 0, max: 5, step: 0.1 },
    ior: { value: 1.5, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0.6, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.5, min: 0, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    color: '#6699ff',
  })

  const yellowPlanes = useControls('Yellow Planes', {
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    thickness: { value: 0.8, min: 0, max: 5, step: 0.1 },
    ior: { value: 1.5, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0.4, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.15, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.4, min: 0, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    color: '#ffff66',
  })

  const ring = useControls('Ring', {
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.25, min: 0, max: 1, step: 0.01 },
    thickness: { value: 1.5, min: 0, max: 5, step: 0.1 },
    ior: { value: 1.5, min: 1, max: 2.5, step: 0.05 },
    chromaticAberration: { value: 0.3, min: 0, max: 1, step: 0.01 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
    distortionScale: { value: 0.3, min: 0, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.05, min: 0, max: 1, step: 0.01 },
    color: '#ffccff',
  })

  const global = useControls('Global', {
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 512, min: 128, max: 2048, step: 128 },
  })

  // Apply hover effects on each frame
  useFrame((state) => {
    Object.values(meshRefs.current).forEach((mesh, index) => {
      if (!mesh) return

      const isHovered = hoveredPlanet === index
      const targetScale = isHovered ? 1.15 : 1

      // Smooth scale animation
      mesh.scale.x = THREE.MathUtils.lerp(mesh.scale.x, targetScale, 0.1)
      mesh.scale.y = THREE.MathUtils.lerp(mesh.scale.y, targetScale, 0.1)
      mesh.scale.z = THREE.MathUtils.lerp(mesh.scale.z, targetScale, 0.1)
    })
  })

  return (
    <group scale={scale} position={position} dispose={null}>
      <mesh
        ref={(ref) => { if (ref) meshRefs.current.main = ref }}
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        position={[0, -0.166, 0]}
        rotation={[0.221, 0.142, 0.563]}
        scale={1.035}
        onPointerOver={() => onHover(0)}
        onPointerOut={() => onHover(null)}
      >
        <MeshTransmissionMaterial
          backside
          samples={global.samples}
          resolution={global.resolution}
          {...mainPlanet}
          // Enhanced distortion on hover
          distortion={hoveredPlanet === 0 ? mainPlanet.distortion * 2 : mainPlanet.distortion}
          chromaticAberration={hoveredPlanet === 0 ? 1 : mainPlanet.chromaticAberration}
        />
        <mesh
          ref={(ref) => { if (ref) meshRefs.current.blue = ref }}
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          position={[-0.171, 1.39, -0.372]}
          rotation={[-0.262, 0, -0.579]}
          scale={1.098}
          onPointerOver={(e) => { e.stopPropagation(); onHover(1) }}
          onPointerOut={() => onHover(null)}
        >
          <MeshTransmissionMaterial
            backside
            samples={global.samples}
            resolution={global.resolution}
            {...bluePlanet}
            distortion={hoveredPlanet === 1 ? bluePlanet.distortion * 2 : bluePlanet.distortion}
            chromaticAberration={hoveredPlanet === 1 ? 1 : bluePlanet.chromaticAberration}
          />
        </mesh>
        <mesh
          ref={(ref) => { if (ref) meshRefs.current.yellow1 = ref }}
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          position={[1.547, 0.546, -0.146]}
          rotation={[1.639, -1.126, 0.77]}
          scale={0.788}
          onPointerOver={(e) => { e.stopPropagation(); onHover(2) }}
          onPointerOut={() => onHover(null)}
        >
          <MeshTransmissionMaterial
            backside
            samples={global.samples}
            resolution={global.resolution}
            {...yellowPlanes}
            distortion={hoveredPlanet === 2 ? yellowPlanes.distortion * 2 : yellowPlanes.distortion}
            chromaticAberration={hoveredPlanet === 2 ? 1 : yellowPlanes.chromaticAberration}
          />
        </mesh>
        <mesh
          ref={(ref) => { if (ref) meshRefs.current.yellow2 = ref }}
          castShadow
          receiveShadow
          geometry={nodes.Plane001.geometry}
          position={[0.281, -1.323, 0.355]}
          rotation={[1.198, -1.347, 0.09]}
          scale={0.527}
          onPointerOver={(e) => { e.stopPropagation(); onHover(3) }}
          onPointerOut={() => onHover(null)}
        >
          <MeshTransmissionMaterial
            backside
            samples={global.samples}
            resolution={global.resolution}
            {...yellowPlanes}
            distortion={hoveredPlanet === 3 ? yellowPlanes.distortion * 2 : yellowPlanes.distortion}
            chromaticAberration={hoveredPlanet === 3 ? 1 : yellowPlanes.chromaticAberration}
          />
        </mesh>
        <mesh
          ref={(ref) => { if (ref) meshRefs.current.ring = ref }}
          castShadow
          receiveShadow
          geometry={nodes.Sphere001.geometry}
          onPointerOver={(e) => { e.stopPropagation(); onHover(4) }}
          onPointerOut={() => onHover(null)}
        >
          <MeshTransmissionMaterial
            backside
            samples={global.samples}
            resolution={global.resolution}
            {...ring}
            distortion={hoveredPlanet === 4 ? ring.distortion * 2 : ring.distortion}
            chromaticAberration={hoveredPlanet === 4 ? 1 : ring.chromaticAberration}
          />
        </mesh>
      </mesh>
    </group>
  )
}

// Main Scene Component
export default function HeroMouseInteraction({ onHoverChange }: { onHoverChange?: (planet: number | null) => void }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleHoverChange = (planet: number | null) => {
    if (onHoverChange) {
      onHoverChange(planet)
    }
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Lighting controls
  const lighting = useControls('Lighting', {
    ambientIntensity: { value: 1, min: 0, max: 5, step: 0.1, label: 'Ambient' },
    frontLightIntensity: { value: 2, min: 0, max: 5, step: 0.1, label: 'Front Light' },
    sideLightIntensity: { value: 1.5, min: 0, max: 5, step: 0.1, label: 'Side Light' },
    backLightIntensity: { value: 1, min: 0, max: 5, step: 0.1, label: 'Back Light' },
    pointLight1Intensity: { value: 1.5, min: 0, max: 5, step: 0.1, label: 'Point Light 1' },
    pointLight2Intensity: { value: 1, min: 0, max: 5, step: 0.1, label: 'Point Light 2' },
  })

  // Environment controls
  const environment = useControls('Environment', {
    preset: {
      value: 'city',
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      label: 'Preset'
    },
    environmentIntensity: { value: 1, min: 0, max: 2, step: 0.1, label: 'Intensity' },
    blur: { value: 0, min: 0, max: 1, step: 0.01, label: 'Blur' },
  })

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* Bright ambient light for glass materials */}
        <ambientLight intensity={lighting.ambientIntensity} />

        {/* Main directional light from front */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={lighting.frontLightIntensity}
          color="#ffffff"
        />

        {/* Key light from the side */}
        <directionalLight
          position={[-5, 3, 5]}
          intensity={lighting.sideLightIntensity}
          color="#ffffff"
        />

        {/* Back light for rim lighting */}
        <directionalLight
          position={[0, -5, -5]}
          intensity={lighting.backLightIntensity}
          color="#88ccff"
        />

        {/* Point lights for highlights */}
        <pointLight position={[10, 10, 10]} intensity={lighting.pointLight1Intensity} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={lighting.pointLight2Intensity} color="#ffaacc" />

        {/* Environment map for reflections and refractions */}
        <Environment
          preset={environment.preset as any}
          environmentIntensity={environment.environmentIntensity}
          blur={environment.blur}
        />

        {/* Interactive Model with mouse tracking */}
        <InteractiveModel mousePosition={mousePosition} scale={1.5} onHover={handleHoverChange} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}

// Preload the GLTF model
useGLTF.preload('/models/planets.glb')
