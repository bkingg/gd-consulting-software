// app/components/Homepage.tsx
"use client";

import Image from "next/image";
import {
  CpuChipIcon,
  CloudIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";

const NeuralNetworkEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles: { x: number; y: number; vx: number; vy: number }[] = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0,255,128,0.25)";
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (let q of particles) {
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(0,255,128,${1 - dist / 120})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ background: "black" }}
    />
  );
};

const Homepage = () => {
  return (
    <div className="w-full overflow-x-hidden relative font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50 bg-black/30 backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <Image
            src={"/gd-consulting-logo.png"}
            alt="GD Consulting Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <span className="text-white font-bold text-xl">GD Consulting</span>
        </div>
        <a
          href="mailto:gdconsultingsn@gmail.com"
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition-opacity duration-300 shadow-lg"
        >
          Contact
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white bg-black">
        <NeuralNetworkEffect />
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold glass-effect mb-6 neon-text-green">
            Logiciels d’entreprise fiables et évolutifs
          </h1>
          <p className="text-xl md:text-2xl mb-8 glass-effect">
            <strong>GD Consulting</strong> conçoit et déploie des solutions
            logicielles complexes, sécurisées et scalables sur le cloud. Nous
            combinons expertise locale et innovation pour transformer vos idées
            en logiciels robustes et performants.
          </p>
          <a
            href="mailto:gdconsultingsn@gmail.com"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Parlez à nos experts
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white text-black py-32 px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Notre expertise
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center place-items-center">
          <div className="glass-card p-8 rounded-2xl shadow-xl text-center flex flex-col items-center">
            <CpuChipIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Solutions sur-mesure</h3>
            <p>
              Développement de logiciels d’entreprise personnalisés, sécurisés
              et optimisés pour vos besoins spécifiques.
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl shadow-xl text-center flex flex-col items-center">
            <CloudIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Cloud & Scalabilité</h3>
            <p>
              Architecture cloud robuste et évolutive pour garantir performance
              et fiabilité à grande échelle.
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl shadow-xl text-center flex flex-col items-center">
            <SparklesIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">
              Intelligence Artificielle
            </h3>
            <p>
              Exploitation de l’IA pour automatiser, optimiser et enrichir vos
              processus logiciels.
            </p>
          </div>
        </div>
      </section>

      {/* AI & Infrastructure Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white px-6 bg-gray-900">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold glass-effect neon-text-green mb-6">
            Technologie, sécurité et innovation
          </h2>
          <p className="text-xl md:text-2xl mb-8 glass-effect">
            Nos solutions sont conçues pour les entreprises qui exigent
            fiabilité, haute performance et sécurité. Nous maîtrisons le cloud,
            les architectures scalables et l’IA pour fournir des logiciels à la
            hauteur des projets les plus ambitieux.
          </p>
          <a
            href="mailto:gdconsultingsn@gmail.com"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Discutons de votre projet
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="bg-gray-50 text-gray-900 py-32 px-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Votre vision, notre expertise
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto">
          Confiez votre projet à des professionnels de confiance. Nous concevons
          des solutions logicielles robustes, sécurisées et évolutives, adaptées
          aux besoins de votre entreprise.
        </p>
        <a
          href="mailto:gdconsultingsn@gmail.com"
          className="bg-green-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Contactez-nous maintenant
        </a>
      </section>

      {/* Styling */}
      <style jsx>{`
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          display: inline-block;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
        }
        .neon-text-green {
          text-shadow: 0 0 10px rgba(0, 255, 128, 0.7),
            0 0 20px rgba(0, 255, 128, 0.5), 0 0 30px rgba(0, 255, 128, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Homepage;
