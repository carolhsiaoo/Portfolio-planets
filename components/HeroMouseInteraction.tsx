'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, MeshTransmissionMaterial, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
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

  // Leva controls (same as original)
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

  // Inner planet controls
  const innerPlanet = useControls('Inner Planet', {
    scale: { value: 0.6, min: 0.1, max: 1.5, step: 0.05, label: 'Scale' },
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
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 512, min: 128, max: 2048, step: 128 },
  })

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
    frontLightIntensity: { value: 3.5, min: 0, max: 5, step: 0.1, label: 'Front Light' },
    sideLightIntensity: { value: 1.5, min: 0, max: 5, step: 0.1, label: 'Side Light' },
    backLightIntensity: { value: 1, min: 0, max: 5, step: 0.1, label: 'Back Light' },
    pointLight1Intensity: { value: 1.5, min: 0, max: 5, step: 0.1, label: 'Point Light 1' },
    pointLight2Intensity: { value: 1, min: 0, max: 5, step: 0.1, label: 'Point Light 2' },
  })

  // Environment controls
  const environment = useControls('Environment', {
    preset: {
      value: 'studio',
      options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'],
      label: 'Preset'
    },
    environmentIntensity: { value: 1.2, min: 0, max: 2, step: 0.1, label: 'Intensity' },
    blur: { value: 0.6, min: 0, max: 1, step: 0.01, label: 'Blur' },
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

        {/* Back light for rim lighting */}
        <directionalLight
          position={[0, -5, -5]}
          intensity={lighting.backLightIntensity}
          color="#88ccff"
        />

        {/* Additional spotlight for main planet reflection */}
        <spotLight
          position={[0, 10, 10]}
          intensity={3}
          angle={0.6}
          penumbra={0.5}
          color="#ffffff"
        />

        {/* Point lights for highlights */}
        <pointLight position={[10, 10, 10]} intensity={lighting.pointLight1Intensity} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={lighting.pointLight2Intensity} color="#ffaacc" />
        <pointLight position={[0, 5, 8]} intensity={2} color="#ffffff" />

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
