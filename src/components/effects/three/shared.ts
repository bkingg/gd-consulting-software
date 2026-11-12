import * as THREE from "three";

// Soft, round, additive point sprites with perspective size attenuation.
export const createGlowPointsMaterial = ({
  color,
  size,
  opacity = 1,
}: {
  color: THREE.ColorRepresentation;
  size: number;
  opacity?: number;
}) =>
  new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uSize: { value: size },
      uOpacity: { value: opacity },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    },
    vertexShader: /* glsl */ `
      uniform float uSize;
      uniform float uPixelRatio;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * uPixelRatio * (10.0 / -mv.z);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = pow(smoothstep(0.5, 0.0, d), 2.0);
        gl_FragColor = vec4(uColor, a * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

// Normalised pointer position (-1..1) shared by scenes whose canvas sits
// behind interactive content and therefore never receives pointer events.
export const pointer = { x: 0, y: 0 };

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    },
    { passive: true }
  );
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
