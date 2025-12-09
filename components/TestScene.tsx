'use client'

import { Canvas } from '@react-three/fiber'

export default function TestScene() {
  return (
    <div style={{ width: '400px', height: '400px', background: '#f0f0f0' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        {/* Simple sphere to test if Three.js is working */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Canvas>
    </div>
  )
}
