import { Box, ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { DissolveMaterial } from "./DissolveMaterial";

const boxMaterial = new THREE.MeshStandardMaterial({color:"white"})

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color='crimson' />
        <DissolveMaterial baseMaterial={boxMaterial} />
      </mesh>
      {/* <Box /> */}
      <Environment preset="sunset" />
      <ContactShadows position-y={-1} />
    </>
  );
};
