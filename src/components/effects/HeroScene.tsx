"use client";

import dynamic from "next/dynamic";
import SceneContainer from "./three/SceneContainer";
import NeuralNetworkBackground from "./NeuralNetworkBackground";

const AICoreScene = dynamic(() => import("./three/AICoreScene"), { ssr: false });

const HeroScene = () => (
  <>
    <SceneContainer
      scene={AICoreScene}
      className="absolute inset-0"
      fallback={<NeuralNetworkBackground />}
    />
    {/* Vignette + scanlines keep the copy legible over the scene */}
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.9)_100%)]" />
    <div className="pointer-events-none absolute inset-0 hud-scanlines opacity-40" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
  </>
);

export default HeroScene;
