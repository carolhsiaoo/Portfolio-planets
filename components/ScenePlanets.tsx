'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Model } from './PlanetsModel'

export default function ScenePlanets() {
  // Lighting settings
  const lighting = {
    ambientIntensity: 1,
    frontLightIntensity: 2,
    sideLightIntensity: 1.5,
    backLightIntensity: 1,
    pointLight1Intensity: 1.5,
    pointLight2Intensity: 1,
  }

  // Environment settings
  const environment = {
    preset: 'city' as const,
    environmentIntensity: 1,
    blur: 0,
  }

  // Animation settings
  const animation = {
    autoRotate: true,
    autoRotateSpeed: 0.5,
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
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

        {/* Center the model at origin */}
        <group position={[0, 0, 0]}>
          <Model scale={1.5} position={[0, 0, 0]} />
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={animation.autoRotate}
          autoRotateSpeed={animation.autoRotateSpeed}
        />
      </Canvas>
    </div>
  )
}