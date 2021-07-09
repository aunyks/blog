

// TODO: Use spherical coordinates for realistic positioning of this
// https://threejs.org/docs/?q=vector#api/en/math/Vector3.setFromSphericalCoords
export default function Sun(props) {
  return (
    <group {...props}>
      <mesh position={[0, 0, 0]} scale={[100, 100, 100]}>
        <sphereBufferGeometry args={[1, 20, 10]} />
        <meshLambertMaterial emissive="white" emissiveIntensity={100} fog={false} />
      </mesh>
      <directionalLight
        position={[0, 0, 0]}
        intensity={0.4} />
    </group>
  )
}