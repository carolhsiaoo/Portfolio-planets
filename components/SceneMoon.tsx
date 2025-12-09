'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Model } from './PlanetsModel'

export default function SceneMoon() {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        {/* Darker ambient light */}
        <ambientLight intensity={0.2} />

        {/* Main directional light from the side for shadows */}
        <directionalLight
          position={[5, 3, 5]}
          intensity={0.8}
          color="#ffffff"
        />

        {/* Subtle fill light from opposite side */}
        <directionalLight
          position={[-3, -2, -3]}
          intensity={0.3}
          color="#4169e1"
        />

        {/* Center the model at origin */}
        <group position={[0, 0, 0]}>
          <Model scale={1.5} position={[0, 0, 0]} />
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}