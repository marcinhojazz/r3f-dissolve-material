import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Box() {
  const mesh = useRef();
  const time = useRef(0);

  // This will create a shader material with a custom fragment shader
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
      },
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          uv.y += sin(uv.x + time) * 0.1;
          float r = sin(uv.x * 3.0 + time) * 0.5 + 0.5;
          float g = sin(uv.x * 6.0 + time) * 0.5 + 0.5;
          float b = sin(uv.x * 9.0 + time) * 0.5 + 0.5;
          gl_FragColor = vec4(r, g, b, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state, delta) => {
    time.current += delta;
    shaderMaterial.uniforms.time.value = time.current;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

export default Box;
