"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createGlowPointsMaterial, pointer } from "./shared";

const GREEN = "#00ff80";
const CYAN = "#22d3ee";
const RADIUS = 2;

const latLonToVector = (lat: number, lon: number, r = RADIUS) => {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
};

// Decorative network hubs (major internet exchange regions), not office locations.
const HUBS: [number, number][] = [
  [48.85, 2.35],
  [51.5, -0.12],
  [50.11, 8.68],
  [40.71, -74.0],
  [37.77, -122.42],
  [45.5, -73.57],
  [14.69, -17.44],
  [-23.55, -46.63],
  [25.2, 55.27],
  [1.35, 103.82],
  [35.68, 139.69],
  [-33.87, 151.21],
  [-26.2, 28.04],
];

const LINKS: [number, number][] = [
  [0, 3], [0, 6], [0, 8], [1, 4], [2, 9], [3, 7], [4, 10],
  [5, 1], [6, 7], [8, 9], [9, 11], [10, 11], [12, 8], [2, 5], [0, 12],
];

const Globe = () => {
  const group = useRef<THREE.Group>(null);

  // Evenly distributed dots on the sphere surface (Fibonacci lattice).
  const dotPositions = useMemo(() => {
    const count = 2200;
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = golden * i;
      arr[i * 3] = Math.cos(a) * r * RADIUS;
      arr[i * 3 + 1] = y * RADIUS;
      arr[i * 3 + 2] = Math.sin(a) * r * RADIUS;
    }
    return arr;
  }, []);

  const hubPositions = useMemo(() => {
    const arr = new Float32Array(HUBS.length * 3);
    HUBS.forEach(([lat, lon], i) => latLonToVector(lat, lon, RADIUS * 1.01).toArray(arr, i * 3));
    return arr;
  }, []);

  const arcs = useMemo(
    () =>
      LINKS.map(([a, b], i) => {
        const start = latLonToVector(...HUBS[a]);
        const end = latLonToVector(...HUBS[b]);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const lift = RADIUS + start.distanceTo(end) * 0.45;
        mid.setLength(lift);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
        const line = new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({
            color: i % 2 ? CYAN : GREEN,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        return { curve, line, offset: Math.random(), speed: 0.18 + Math.random() * 0.2 };
      }),
    []
  );

  const pulsePositions = useMemo(() => new Float32Array(arcs.length * 3), [arcs.length]);
  const pulseGeometry = useRef<THREE.BufferGeometry>(null);

  const dotMaterial = useMemo(
    () => createGlowPointsMaterial({ color: GREEN, size: 3.2, opacity: 0.55 }),
    []
  );
  const hubMaterial = useMemo(
    () => createGlowPointsMaterial({ color: "#ffffff", size: 14, opacity: 0.95 }),
    []
  );
  const pulseMaterial = useMemo(
    () => createGlowPointsMaterial({ color: CYAN, size: 18, opacity: 1 }),
    []
  );

  useEffect(
    () => () => {
      dotMaterial.dispose();
      hubMaterial.dispose();
      pulseMaterial.dispose();
      arcs.forEach(({ line }) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
    },
    [dotMaterial, hubMaterial, pulseMaterial, arcs]
  );

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x += (pointer.y * 0.25 + 0.25 - group.current.rotation.x) * 0.03;
    }
    const t = clock.getElapsedTime();
    arcs.forEach(({ curve, offset, speed }, i) => {
      curve.getPoint((t * speed + offset) % 1, tmp).toArray(pulsePositions, i * 3);
    });
    const attr = pulseGeometry.current?.getAttribute("position");
    if (attr) attr.needsUpdate = true;
  });

  return (
    <group ref={group} rotation={[0.25, 0, 0.12]}>
      {/* Dark occluder so the far hemisphere fades behind the near one */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.985, 64, 64]} />
        <meshBasicMaterial color="#020a06" transparent opacity={0.92} />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 1.12, 64, 64]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          vertexShader={/* glsl */ `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={/* glsl */ `
            varying vec3 vNormal;
            void main() {
              float i = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
              gl_FragColor = vec4(0.0, 1.0, 0.5, 1.0) * i;
            }
          `}
        />
      </mesh>
      <points material={dotMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dotPositions, 3]} />
        </bufferGeometry>
      </points>
      <points material={hubMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[hubPositions, 3]} />
        </bufferGeometry>
      </points>
      {arcs.map(({ line }, i) => (
        <primitive key={i} object={line} />
      ))}
      <points material={pulseMaterial}>
        <bufferGeometry ref={pulseGeometry}>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
      </points>
    </group>
  );
};

const GlobeScene = ({ active }: { active: boolean }) => (
  <Canvas
    camera={{ position: [0, 0, 6.2], fov: 45 }}
    dpr={[1, 1.75]}
    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    frameloop={active ? "always" : "demand"}
  >
    <Globe />
  </Canvas>
);

export default GlobeScene;
