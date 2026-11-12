"use client";

import dynamic from "next/dynamic";
import SceneContainer from "./three/SceneContainer";

const GlobeScene = dynamic(() => import("./three/GlobeScene"), { ssr: false });

const GlobeVisual = ({ className }: { className?: string }) => (
  <SceneContainer scene={GlobeScene} className={className} />
);

export default GlobeVisual;
