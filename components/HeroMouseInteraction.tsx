'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { Model } from './PlanetsModel'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'

// Hook to detect screen size and return responsive scale
function useResponsiveScale() {
  const [scale, setScale] = useState(1.5)

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth
      if (width < 640) { // mobile
        setScale(1.2)
      } else if (width < 768) { // small tablet
        setScale(1.3)
      } else if (width < 1024) { // tablet
        setScale(1.4)
      } else { // desktop
        setScale(1.5)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return scale
}

// Responsive Camera Component
function ResponsiveCamera() {
  const { camera } = useThree()

  useEffect(() => {
    const updateCamera = () => {
      const width = window.innerWidth
      if (width < 640) { // mobile
        camera.position.set(0, 0, 10)
        ;(camera as THREE.PerspectiveCamera).fov = 50
      } else if (width < 768) { // small tablet
        camera.position.set(0, 0, 9)
        ;(camera as THREE.PerspectiveCamera).fov = 47
      } else if (width < 1024) { // tablet
        camera.position.set(0, 0, 8.5)
        ;(camera as THREE.PerspectiveCamera).fov = 45
      } else { // desktop
        camera.position.set(0, 0, 8)
        ;(camera as THREE.PerspectiveCamera).fov = 45
      }
      camera.updateProjectionMatrix()
    }

    updateCamera()
    window.addEventListener('resize', updateCamera)
    return () => window.removeEventListener('resize', updateCamera)
  }, [camera])

  return null
}

// Interactive Model Component with mouse following and magnetic effects
function InteractiveModel({ mousePosition, scale = 1.5, isTextHovered = false }: { mousePosition: { x: number, y: number }, scale?: number, isTextHovered?: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const planetRefs = useRef<THREE.Mesh[]>([])
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null)

  // Main planet should glow when any planet is hovered OR when text is hovered
  const isMainPlanetActive = hoveredPlanet !== null || isTextHovered

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Auto-rotate continuously
    groupRef.current.rotation.y += delta * 0.3 // Rotate at 0.3 radians per second

    // Planets follow cursor - subtle rotation toward mouse (additive)
    const targetRotationY = mousePosition.x * 0.3
    const targetRotationX = -mousePosition.y * 0.3

    // Smooth lerp to target rotation (this adds to the auto-rotation)
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
        onHover={setHoveredPlanet}
        isMainPlanetActive={isMainPlanetActive}
      />
    </group>
  )
}

// Enhanced Model with hover detection and effects
function InteractivePlanetsModel({ scale, position, onHover, isMainPlanetActive }: {
  scale: number,
  position: [number, number, number],
  onHover: (planet: number | null) => void,
  isMainPlanetActive: boolean
}) {
  const { nodes } = useGLTF('/models/planets.glb') as any
  const meshRefs = useRef<{ [key: string]: THREE.Mesh }>({})

  // Material properties
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

  // Inner planet properties
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
    samples: 8,
    resolution: 256,
  }

  // Apply hover effects on each frame (scale animation removed)
  useFrame((state) => {
    // Scale animation removed - planets no longer expand on hover
  })

  return (
    <group scale={scale} position={position} dispose={null}>
      {/* Small inner planet at center */}
      <mesh
        ref={(ref) => { if (ref) meshRefs.current.innerPlanet = ref }}
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        position={[0, 0, 0]}
        rotation={[0.221, 0.142, 0.563]}
        scale={innerPlanet.scale}
        onPointerOver={(e) => { e.stopPropagation(); onHover(5) }}
        onPointerOut={() => onHover(null)}
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
          // Enhanced distortion when hovering over ANY element or text
          distortion={isMainPlanetActive ? mainPlanet.distortion * 2 : mainPlanet.distortion}
          chromaticAberration={isMainPlanetActive ? 1 : mainPlanet.chromaticAberration}
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
          />
        </mesh>
      </mesh>
    </group>
  )
}

// Main Scene Component
export default function HeroMouseInteraction({ onBrightnessChange, isTextHovered = false }: { onBrightnessChange?: (brightness: number) => void, isTextHovered?: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const responsiveScale = useResponsiveScale()

  useEffect(() => {
    let rafId: number | null = null
    let lastTime = 0
    const throttleMs = 16 // ~60fps max, reduce CPU load

    const handleMouseMove = (event: MouseEvent) => {
      const currentTime = performance.now()

      if (currentTime - lastTime < throttleMs) {
        return // Skip if too soon
      }

      if (rafId !== null) {
        return // Already scheduled
      }

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) {
          rafId = null
          return
        }

        const rect = containerRef.current.getBoundingClientRect()
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1

        setMousePosition({ x, y })
        lastTime = currentTime
        rafId = null
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  // Lighting settings - optimized to 4 lights total
  const lighting = {
    ambientIntensity: 1,
    frontLightIntensity: 4, // Increased to compensate for removed lights
    sideLightIntensity: 2, // Increased to compensate for removed lights
    pointLight1Intensity: 2, // Increased to compensate for removed lights
  }

  // Environment settings
  const environment = {
    preset: 'studio' as const,
    environmentIntensity: 1.2,
    blur: 0.6,
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* Bright ambient light for glass materials */}
        <ambientLight intensity={lighting.ambientIntensity} />

        {/* Main directional light from front - increased for more reflection */}
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

        {/* Point light for highlights - combined front highlight */}
        <pointLight position={[10, 10, 10]} intensity={lighting.pointLight1Intensity} color="#ffffff" />

        {/* Environment map for reflections and refractions */}
        <Environment
          preset={environment.preset as any}
          environmentIntensity={environment.environmentIntensity}
          blur={environment.blur}
        />

        {/* Responsive Camera */}
        <ResponsiveCamera />

        {/* Interactive Model with mouse tracking - responsive scale */}
        <InteractiveModel mousePosition={mousePosition} scale={responsiveScale} isTextHovered={isTextHovered} />

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
