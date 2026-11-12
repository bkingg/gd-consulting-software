"use client";

import { Component, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { prefersReducedMotion } from "./shared";

class WebGLErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const hasWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
};

/**
 * Mounts a Three.js scene only once it nears the viewport, and pauses its
 * render loop while off-screen, in a hidden tab, or under reduced motion.
 */
const SceneContainer = ({
  scene: Scene,
  className,
  fallback = null,
}: {
  scene: ComponentType<{ active: boolean }>;
  className?: string;
  fallback?: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [supported, setSupported] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!hasWebGL()) {
      setSupported(false);
      return;
    }
    const reduced = prefersReducedMotion();
    let inView = false;
    let tabVisible = document.visibilityState === "visible";
    const sync = () => setActive(inView && tabVisible && !reduced);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) setMounted(true);
        sync();
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);

    const onVisibility = () => {
      tabVisible = document.visibilityState === "visible";
      sync();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {!supported ? (
        fallback
      ) : mounted ? (
        <WebGLErrorBoundary fallback={fallback}>
          <Scene active={active} />
        </WebGLErrorBoundary>
      ) : null}
    </div>
  );
};

export default SceneContainer;
