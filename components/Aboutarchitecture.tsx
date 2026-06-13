"use client";

import { useRef, useEffect, RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Store, Building2, LayoutGrid, KeyRound } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Neon cursor — canvas trail + glowing dot, scoped to container
// ─────────────────────────────────────────────────────────────────────────────
type Pt = { x: number; y: number; t: number };

function NeonCursor({ containerRef }: { containerRef: RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const trail     = useRef<Pt[]>([]);
  const raf       = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    const dot       = dotRef.current;
    const ring      = ringRef.current;
    if (!container || !canvas || !dot || !ring) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas whenever the section resizes
    const resize = () => {
      canvas.width  = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Mouse tracking — write directly to DOM refs (zero re-renders)
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      trail.current.push({ x, y, t: performance.now() });
      dot.style.transform  = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };
    const onEnter = () => { dot.style.opacity = "1"; ring.style.opacity = "1"; };
    const onLeave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };

    container.addEventListener("mousemove",  onMove);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    // Canvas draw loop
    const TRAIL_MS  = 700;
    const LINE_W    = 2.5;
    const GLOW_BLUR = 14;

    const draw = () => {
      const now = performance.now();
      trail.current = trail.current.filter(p => now - p.t < TRAIL_MS);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = trail.current;
      if (pts.length > 1) {
        for (let i = 1; i < pts.length; i++) {
          const a     = pts[i - 1];
          const b     = pts[i];
          const alpha = Math.max(0, 1 - (now - b.t) / TRAIL_MS);

          // Outer glow pass
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,122,26,${alpha * 0.85})`;
          ctx.lineWidth   = LINE_W * alpha;
          ctx.shadowColor = "#ff7a1a";
          ctx.shadowBlur  = GLOW_BLUR * alpha;
          ctx.lineCap     = "round";
          ctx.lineJoin    = "round";
          ctx.stroke();

          // White-hot core pass
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,220,160,${alpha * 0.55})`;
          ctx.lineWidth   = LINE_W * 0.35 * alpha;
          ctx.shadowBlur  = 0;
          ctx.stroke();
        }
      }

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      container.removeEventListener("mousemove",  onMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
      ro.disconnect();
    };
  }, [containerRef]);

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30"
        aria-hidden
      />

      {/* Inner glowing dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="absolute top-0 left-0 pointer-events-none z-40 opacity-0 transition-opacity duration-200"
        style={{
          width: 10, height: 10,
          borderRadius: "50%",
          background: "radial-gradient(circle, #fff 0%, #ff7a1a 55%, transparent 100%)",
          boxShadow: "0 0 6px 2px #ff7a1a, 0 0 18px 4px rgba(255,122,26,0.6), 0 0 40px 8px rgba(255,122,26,0.25)",
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="absolute top-0 left-0 pointer-events-none z-40 opacity-0 transition-opacity duration-200"
        style={{
          width: 36, height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(255,122,26,0.55)",
          boxShadow: "0 0 8px 1px rgba(255,122,26,0.35), inset 0 0 8px 1px rgba(255,122,26,0.15)",
        }}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const EASE = "easeOut" as const;

const services = [
  {
    icon: Store,
    title: "Retail Services",
    sub: "Showrooms & Exclusive Stores",
    desc: "End-to-end design and execution of premium retail environments that reflect brand identity and convert footfall into sales.",
  },
  {
    icon: Building2,
    title: "Corporate Offices",
    sub: "Commercial Office Spaces",
    desc: "Functional, inspiring workplaces that align with culture and operational efficiency — from concept to handover.",
  },
  {
    icon: LayoutGrid,
    title: "Exhibitions",
    sub: "Temporary Structures",
    desc: "High-impact exhibition setups that command attention, built with precision and dismantled without a trace.",
  },
  {
    icon: KeyRound,
    title: "Turnkey Projects",
    sub: "Ready to Operate, Day One",
    desc: "Complete site construction and fit-out delivered as a fully operational space. The client turns the key — work begins.",
    accent: true,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const cardVariants = (i: number) => ({
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: EASE },
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function AboutArchitecture() {
  const sectionRef         = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const initial            = shouldReduceMotion ? "show" : "hidden";

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#030303] py-24 md:py-32 overflow-hidden"
      style={{ cursor: "none" }}        // hide native cursor inside section
    >
      {/* Neon cursor — scoped to this section only */}
      {!shouldReduceMotion && (
        <NeonCursor containerRef={sectionRef as RefObject<HTMLElement | null>} />
      )}

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orange ambient glow */}
      <div
        className="absolute -top-40 -right-40 w-150 h-150 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,122,26,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-16">

        {/* Header row */}
        <motion.div
          variants={containerVariants}
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              className="text-[#ff7a1a] text-xs uppercase tracking-[8px] mb-4"
            >
              Architecture &amp; Interior Designing
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-white uppercase leading-[0.92] mb-6"
              style={{
                fontFamily: "var(--font-oswald, 'Oswald', sans-serif)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              }}
            >
              A True{" "}
              <span className="text-[#ff7a1a]">360°</span>
              <br />
              Solution Provider
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-400 text-sm sm:text-base leading-relaxed"
            >
              Metallicz Media doesn't just design and conceptualise — we
              execute. From retail showrooms and corporate offices to
              exhibition structures and full turnkey projects, we own every
              stage so quality never gets lost in handoffs.
            </motion.p>
          </div>

          {/* CTA — desktop */}
          <motion.div variants={fadeUp} className="hidden lg:block shrink-0">
            <CtaButton />
          </motion.div>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.div
                key={svc.title}
                variants={cardVariants(i)}
                initial={initial}
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={shouldReduceMotion ? {} : { y: -6, transition: { duration: 0.22, ease: EASE } }}
                className="group relative overflow-hidden rounded-xl p-6 flex flex-col gap-4 cursor-none"
                style={{
                  background: svc.accent
                    ? "linear-gradient(135deg, rgba(255,122,26,0.13) 0%, rgba(255,122,26,0.04) 100%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 100%)",
                  border: svc.accent
                    ? "1px solid rgba(255,122,26,0.35)"
                    : "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow: svc.accent
                    ? "0 4px 32px rgba(255,122,26,0.12), inset 0 1px 0 rgba(255,255,255,0.08)"
                    : "0 4px 24px rgba(0,0,0,0.3),   inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" style={{ background: svc.accent ? "radial-gradient(circle at 50% 0%, rgba(255,122,26,0.18) 0%, transparent 65%)" : "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 65%)" }} />

                <div
                  className="relative w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: svc.accent ? "rgba(255,122,26,0.2)" : "rgba(255,255,255,0.07)",
                    border: svc.accent ? "1px solid rgba(255,122,26,0.4)" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon size={18} className={svc.accent ? "text-[#ff7a1a]" : "text-gray-300"} />
                </div>

                <div className="relative flex-1 flex flex-col gap-1.5">
                  <p className={`font-semibold text-sm leading-snug ${svc.accent ? "text-[#ff7a1a]" : "text-white"}`}>{svc.title}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">{svc.sub}</p>
                  <p className="text-gray-400 text-xs leading-relaxed mt-1">{svc.desc}</p>
                </div>

                <div className="relative flex justify-end">
                  <ArrowRight size={14} className={`transition-all duration-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 ${svc.accent ? "text-[#ff7a1a]" : "text-gray-400"}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA — mobile */}
        <motion.div
          variants={fadeUp}
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="lg:hidden mt-10 flex justify-center"
        >
          <CtaButton />
        </motion.div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA button
// ─────────────────────────────────────────────────────────────────────────────
function CtaButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="group flex items-center gap-3 border border-[#ff7a1a] px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#ff7a1a] transition-all duration-300 hover:bg-[#ff7a1a] hover:text-white cursor-none"
    >
      Explore More Details
      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  );
}