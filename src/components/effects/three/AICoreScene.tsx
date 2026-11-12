"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createGlowPointsMaterial, pointer } from "./shared";

const GREEN = "#00ff80";
const CYAN = "#22d3ee";

/* ----------------------------- AI core sphere ----------------------------- */

const coreVertex = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  // Cheap layered trig noise, good enough for an organic "breathing" surface.
  float field(vec3 p) {
    return sin(p.x * 3.1 + uTime * 1.3) * sin(p.y * 2.7 + uTime * 1.1) * sin(p.z * 3.3 + uTime * 0.9)
         + 0.5 * sin(p.x * 6.0 - uTime * 1.7) * sin(p.z * 5.5 + uTime * 1.4);
  }

  void main() {
    float d = field(position) * 0.09;
    vDisp = d;
    vec3 displaced = position + normal * d;
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const coreFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  void main() {
    float fresnel = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.4);
    vec3 col = mix(uColorA, uColorB, smoothstep(-0.08, 0.1, vDisp));
    float alpha = 0.08 + fresnel * 0.9;
    gl_FragColor = vec4(col * (0.35 + fresnel * 1.6), alpha);
  }
`;

const Core = () => {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.LineSegments>(null);
  const outer = useRef<THREE.LineSegments>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color(GREEN) },
          uColorB: { value: new THREE.Color(CYAN) },
        },
        vertexShader: coreVertex,
        fragmentShader: coreFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const shellGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.45, 1)),
    []
  );
  const outerGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.95, 0)),
    []
  );

  useEffect(
    () => () => {
      material.dispose();
      shellGeometry.dispose();
      outerGeometry.dispose();
    },
    [material, shellGeometry, outerGeometry]
  );

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();
    material.uniforms.uTime.value = t;
    if (inner.current) inner.current.rotation.y += delta * 0.15;
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.22;
      shell.current.rotation.x += delta * 0.08;
    }
    if (outer.current) {
      outer.current.rotation.y += delta * 0.1;
      outer.current.rotation.z -= delta * 0.05;
    }
    if (group.current) {
      const pulse = 1 + Math.sin(t * 1.6) * 0.025;
      group.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={group}>
      <mesh ref={inner} material={material}>
        <icosahedronGeometry args={[1.1, 48]} />
      </mesh>
      <lineSegments ref={shell} geometry={shellGeometry}>
        <lineBasicMaterial
          color={GREEN}
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <lineSegments ref={outer} geometry={outerGeometry}>
        <lineBasicMaterial
          color={CYAN}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

/* ------------------------- Neural network + pulses ------------------------ */

const NODE_COUNT = 150;
const PULSE_COUNT = 70;
const MAX_LINKS = 3;
const LINK_DISTANCE = 1.55;

const NeuralNetwork = () => {
  const group = useRef<THREE.Group>(null);

  const { nodePositions, edgePositions, edges } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      // Points in a spherical shell surrounding the core.
      const dir = new THREE.Vector3().randomDirection();
      const r = 2.5 + Math.random() * 2.2;
      nodes.push(dir.multiplyScalar(r));
    }

    const edgeList: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < nodes.length; i++) {
      const neighbours = nodes
        .map((n, j) => ({ j, d: nodes[i].distanceTo(n) }))
        .filter(({ j, d }) => j > i && d < LINK_DISTANCE)
        .sort((a, b) => a.d - b.d)
        .slice(0, MAX_LINKS);
      for (const { j } of neighbours) edgeList.push([nodes[i], nodes[j]]);
    }

    const np = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => n.toArray(np, i * 3));
    const ep = new Float32Array(edgeList.length * 6);
    edgeList.forEach(([a, b], i) => {
      a.toArray(ep, i * 6);
      b.toArray(ep, i * 6 + 3);
    });
    return { nodePositions: np, edgePositions: ep, edges: edgeList };
  }, []);

  const pulseState = useMemo(
    () =>
      Array.from({ length: PULSE_COUNT }, () => ({
        edge: Math.floor(Math.random() * Math.max(edges.length, 1)),
        t: Math.random(),
        speed: 0.25 + Math.random() * 0.6,
      })),
    [edges.length]
  );
  const pulsePositions = useMemo(() => new Float32Array(PULSE_COUNT * 3), []);
  const pulseGeometry = useRef<THREE.BufferGeometry>(null);

  const nodeMaterial = useMemo(
    () => createGlowPointsMaterial({ color: GREEN, size: 9, opacity: 0.9 }),
    []
  );
  const pulseMaterial = useMemo(
    () => createGlowPointsMaterial({ color: "#c8fff0", size: 16, opacity: 1 }),
    []
  );

  useEffect(
    () => () => {
      nodeMaterial.dispose();
      pulseMaterial.dispose();
    },
    [nodeMaterial, pulseMaterial]
  );

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.04;
      group.current.rotation.x = Math.sin(performance.now() * 0.00005) * 0.15;
    }
    if (!edges.length) return;
    for (let i = 0; i < PULSE_COUNT; i++) {
      const p = pulseState[i];
      p.t += delta * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        p.edge = Math.floor(Math.random() * edges.length);
        p.speed = 0.25 + Math.random() * 0.6;
      }
      const [a, b] = edges[p.edge];
      tmp.lerpVectors(a, b, p.t).toArray(pulsePositions, i * 3);
    }
    const attr = pulseGeometry.current?.getAttribute("position");
    if (attr) attr.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={GREEN}
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <points material={nodeMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
      </points>
      <points material={pulseMaterial}>
        <bufferGeometry ref={pulseGeometry}>
          <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
        </bufferGeometry>
      </points>
    </group>
  );
};

/* --------------------------------- Orbits --------------------------------- */

const Orbit = ({
  radius,
  tilt,
  speed,
  color,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: string;
}) => {
  const satellite = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime() * speed;
    satellite.current?.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 6, 220]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      <mesh ref={satellite}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

/* -------------------------------- Starfield ------------------------------- */

const Starfield = ({ count = 1400 }: { count?: number }) => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = -Math.random() * 20 - 2;
    }
    return arr;
  }, [count]);
  const material = useMemo(
    () => createGlowPointsMaterial({ color: "#9fffd6", size: 2.4, opacity: 0.55 }),
    []
  );
  useEffect(() => () => material.dispose(), [material]);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.006;
  });
  return (
    <points ref={ref} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
    </points>
  );
};

/* ------------------------------- Camera rig ------------------------------- */

const CameraRig = () => {
  useFrame(({ camera }) => {
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.6 - camera.position.y) * 0.04;
    camera.position.z += (9 + scroll * 3 - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);
  });
  return null;
};

/* --------------------------------- Scene ---------------------------------- */

const AICoreScene = ({ active }: { active: boolean }) => (
  <Canvas
    camera={{ position: [0, 0, 9], fov: 50 }}
    dpr={[1, 1.75]}
    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    frameloop={active ? "always" : "demand"}
  >
    <CameraRig />
    <Starfield />
    <group position={[0, 0.2, 0]}>
      <Core />
      <NeuralNetwork />
      <Orbit radius={2.35} tilt={[1.2, 0.2, 0]} speed={0.6} color={GREEN} />
      <Orbit radius={2.8} tilt={[-0.9, 0.6, 0.3]} speed={-0.4} color={CYAN} />
      <Orbit radius={3.3} tilt={[0.3, -1.1, 0]} speed={0.28} color={GREEN} />
    </group>
  </Canvas>
);

export default AICoreScene;
