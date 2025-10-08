// app/components/Homepage.tsx
"use client";

import Image from "next/image";
import {
  CpuChipIcon,
  CloudIcon,
  SparklesIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import Contact from "@/components/Contact";

const ElegantBlobs = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const blobs = [
      { x: 0.3, y: 0.4, r: 0.25, dx: 0.000002, dy: 0.0000015 },
      { x: 0.7, y: 0.5, r: 0.3, dx: -0.0000018, dy: 0.000002 },
      { x: 0.5, y: 0.7, r: 0.2, dx: 0.0000015, dy: -0.000002 },
    ];

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      blobs.forEach((b) => {
        // Move blob very slowly
        b.x += b.dx * width;
        b.y += b.dy * height;

        if (b.x < 0 || b.x > 1) b.dx *= -1;
        if (b.y < 0 || b.y > 1) b.dy *= -1;

        const gradient = ctx.createRadialGradient(
          b.x * width,
          b.y * height,
          0,
          b.x * width,
          b.y * height,
          b.r * width
        );
        gradient.addColorStop(0, `rgba(0, 200, 150, 0.15)`);
        gradient.addColorStop(1, `rgba(0, 200, 150, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

const NeuralNetworkEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0,255,128,0.25)";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        for (const q of particles) {
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
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
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
  const [activeSection, setActiveSection] = useState<string>("hero");
  const headerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Track scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      const scrollY = window.scrollY;
      // Parallax: logo and menu move at slightly different speeds
      headerRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = ["accueil", "expertise", "ai", "engineering", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, threshold: 0.5 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full overflow-x-hidden relative font-sans">
      {/* Top Gradient Line */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] overflow-hidden">
        <div className="animate-gradient-smooth h-full w-[200%] bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 opacity-40 blur-[1px]" />
      </div>

      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 px-4 md:px-8 py-8 md:py-3 flex items-center justify-center">
        {/* Logo */}
        <div className="absolute left-4 md:left-8 flex items-center space-x-3 md:space-x-4">
          <Image
            src="/gd-consulting-logo.png"
            alt="GD Consulting Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-white font-bold text-lg md:text-xl tracking-wide">
            GD Consulting
          </span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          {["accueil", "expertise", "ai", "engineering", "contact"].map(
            (id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300 hover:text-white hover:bg-green-500/30 ${
                  activeSection === id
                    ? "bg-green-500/50 text-white"
                    : "text-white/70"
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            )
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden absolute right-4 flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center py-4 space-y-3 md:hidden">
            {["accueil", "expertise", "ai", "engineering", "contact"].map(
              (id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className={`cursor-pointer px-6 py-2 rounded-full transition-all duration-300 hover:text-white hover:bg-green-500/30 ${
                    activeSection === id
                      ? "bg-green-500/50 text-white"
                      : "text-white/70"
                  }`}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              )
            )}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="accueil"
        className="relative h-screen flex items-center justify-center text-center text-white bg-black"
      >
        <NeuralNetworkEffect />
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold glass-gradient mb-6 neon-text-green">
            Logiciels d’entreprise fiables et évolutifs
          </h1>
          <p className="text-xl md:text-2xl mb-8 glass-gradient">
            <strong>GD Consulting</strong> conçoit et déploie des solutions
            logicielles complexes, sécurisées et scalables sur le cloud.
          </p>
          <a
            href="mailto:gdconsultingsn@gmail.com"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Parlez à nos experts
          </a>
        </div>
        {/* Modern Scroll Indicator */}
        <a
          href="#expertise"
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center space-y-2 cursor-pointer"
        >
          {/* Vertical neon line with moving dot */}
          <div className="w-[2px] h-16 bg-green-500/20 rounded-full relative overflow-hidden">
            <div className="w-full h-2 bg-green-500 rounded-full absolute top-0 animate-scrollDot"></div>
          </div>

          {/* Arrow */}
          <svg
            className="w-6 h-6 text-green-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </a>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="bg-white text-black py-32 px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Notre expertise
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center place-items-center">
          <div className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center">
            <CpuChipIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Solutions sur-mesure</h3>
            <p>
              Développement de logiciels d’entreprise personnalisés, sécurisés
              et optimisés pour vos besoins spécifiques.
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center">
            <CloudIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Cloud & Scalabilité</h3>
            <p>
              Architecture cloud robuste et évolutive pour garantir performance
              et fiabilité à grande échelle.
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center">
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

      {/* AI Section */}
      <section
        id="ai"
        className="relative h-screen flex items-center justify-center text-center text-white px-6 bg-black overflow-hidden"
      >
        <NeuralNetworkEffect />
        <div className="relative z-10 max-w-3xl glass-gradient p-8 rounded-3xl">
          <h2 className="text-5xl md:text-6xl font-extrabold neon-text-green mb-6">
            Technologie, sécurité et innovation
          </h2>
          <p className="text-xl md:text-2xl mb-8">
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

      {/* Engineering Section */}
      <section
        id="engineering"
        className="bg-black text-white py-32 px-8 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center neon-text-green">
            L’excellence en ingénierie logicielle
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-gradient p-8 rounded-3xl border border-emerald-500/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Architecture pensée pour durer
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Chez <strong>GD Consulting</strong>, chaque ligne de code est
                écrite avec rigueur et intention.
              </p>
            </div>
            <div className="glass-gradient p-8 rounded-3xl border border-green-400/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Une ingénierie, pas du bricolage
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Contrairement aux approches improvisées, nous appliquons une
                méthodologie d’ingénierie logicielle à chaque étape.
              </p>
            </div>
            <div className="glass-gradient p-8 rounded-3xl border border-green-500/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                La force du savoir-faire local
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Nos ingénieurs conçoivent des solutions au niveau mondial, avec
                une compréhension locale des besoins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative">
        <ElegantBlobs />
        <Contact />
      </section>

      {/* Styles */}
      <style jsx>{`
        .glass-gradient {
          background: linear-gradient(
            135deg,
            rgba(0, 255, 128, 0.1),
            rgba(0, 255, 128, 0.03)
          );
          backdrop-filter: blur(25px);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid rgba(0, 255, 128, 0.2);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
        }

        .neon-text-green {
          text-shadow: 0 0 6px rgba(0, 255, 128, 0.5),
            0 0 12px rgba(0, 255, 128, 0.3), 0 0 18px rgba(0, 255, 128, 0.2);
        }

        .animate-gradient-smooth {
          background-size: 200% 100%;
          animation: gradientSmooth 12s linear infinite;
        }

        @keyframes gradientSmooth {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        html {
          scroll-behavior: smooth;
        }
        @keyframes scrollDot {
          0% {
            top: 0%;
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          50% {
            top: 50%;
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .animate-scrollDot {
          animation: scrollDot 1.8s infinite ease-in-out;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default Homepage;
