"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";

const EASE = "easeOut" as const;

const cities = [
  { name: "Noida",      label: "Head Office", highlight: true  },
  { name: "Mumbai",     label: "Production",  highlight: false },
  { name: "Ahmedabad",  label: "Production",  highlight: false },
  { name: "Jamshedpur", label: "Production",  highlight: false },
  { name: "Bangalore",  label: "Production",  highlight: false },
  { name: "Kolkata",    label: "Presence",    highlight: false },
  { name: "Chennai",    label: "Presence",    highlight: false },
  { name: "Goa",        label: "Presence",    highlight: false },
  { name: "Pune",       label: "Presence",    highlight: false },
  { name: "Jaipur",     label: "Presence",    highlight: false },
  { name: "Hubli",      label: "Presence",    highlight: false },
  { name: "Hyderabad",  label: "Presence",    highlight: false },
  { name: "Guwahati",   label: "Presence",    highlight: false },
  { name: "Vijayawada", label: "Presence",    highlight: false },
  { name: "Hong Kong",  label: "Global",      highlight: false },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const SPRING = { stiffness: 60, damping: 20, mass: 1 };

const OurPresence = () => {
  const sectionRef     = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? "show" : "hidden";

  // Track scroll progress through the section
  // offset: ["start end"] = section top hits viewport bottom
  //         ["end start"] = section bottom leaves viewport top
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // ── Scroll-driven map transforms ──────────────────────────────────
  // As section scrolls in  (0 → 0.5): map rises and un-tilts slightly
  // As section scrolls out (0.5 → 1): map continues drifting up (parallax)

  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [52, 36, 24]);
  const rawRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [14,  8,  4]);
  const rawRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-8, -5, -2]);
  const rawY       = useTransform(scrollYProgress, [0, 0.5, 1], [80,  0, -60]);
  const rawScale   = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1.3, 1.2]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 0.65, 0.65, 0.3]);

  // Spring-smooth every value so motion feels physical, not mechanical
  const rotateX = useSpring(rawRotateX, SPRING);
  const rotateY = useSpring(rawRotateY, SPRING);
  const rotateZ = useSpring(rawRotateZ, SPRING);
  const mapY    = useSpring(rawY,       SPRING);
  const scale   = useSpring(rawScale,   SPRING);

  // Reduced-motion override: freeze at resting values
  const finalRotateX = shouldReduceMotion ? 36  : rotateX;
  const finalRotateY = shouldReduceMotion ? 8   : rotateY;
  const finalRotateZ = shouldReduceMotion ? -5  : rotateZ;
  const finalY       = shouldReduceMotion ? 0   : mapY;
  const finalScale   = shouldReduceMotion ? 1.3 : scale;
  const finalOpacity = shouldReduceMotion ? 0.6 : rawOpacity;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#030303] py-24 md:py-32"
    >

      {/* ── Diagonal 3-D map ──────────────────────────────────────── */}
      {/*   perspective lives on the PARENT, transforms on the CHILD  */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "55% 45%",   // offset origin → diagonal feel
        }}
      >
        <motion.div
          className="relative w-[130%] max-w-none"
          style={{
            rotateX:        finalRotateX,
            rotateY:        finalRotateY,
            rotate:         finalRotateZ,
            y:              finalY,
            scale:          finalScale,
            opacity:        finalOpacity,
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
          }}
        >
          <Image
            src="/map.png"          // ← your map image in /public
            alt=""
            aria-hidden
            width={1320}
            height={880}
            className="w-full h-auto object-contain select-none"
            priority
          />

          {/* Fade edges so the tilted image blends into the dark bg */}
          <div className="absolute inset-x-0 top-0    h-2/5 bg-linear-to-b  from-[#030303] via-[#030303]/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t  from-[#030303] via-[#030303]/50 to-transparent" />
          <div className="absolute inset-y-0 left-0   w-1/4 bg-linear-to-r  from-[#030303] to-transparent" />
          <div className="absolute inset-y-0 right-0  w-1/4 bg-linear-to-l  from-[#030303] to-transparent" />
        </motion.div>
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          variants={containerVariants}
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >

          {/* Left — heading + description */}
          <div>
            <motion.p
              variants={fadeUp}
              className="text-[#ff7a1a] text-xs uppercase tracking-[8px] mb-4"
            >
              Our Presence
            </motion.p>

            <motion.h2
              variants={fadeUp}
              className="text-white uppercase leading-[0.92] mb-6"
              style={{
                fontFamily: "var(--font-oswald, 'Oswald', sans-serif)",
                fontSize: "clamp(2.4rem, 5vw, 3.75rem)",
              }}
            >
              PAN India <br />
              <span className="text-[#ff7a1a]">&amp; Beyond</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-lg"
            >
              Metallicz Media conducts QC checks, audits and AMC for Glow Sign
              Boards, LED Signage and concept store installations nationwide.
              With in-house electricians, welders and installers across five
              production hubs, we verify approved specifications against
              installed products — and extend our professional services
              globally through our Hong Kong office.
            </motion.p>

            {/* Callout chips */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                { val: "15+", lbl: "Cities"          },
                { val: "5",   lbl: "Production Hubs" },
                { val: "1",   lbl: "Global Office"   },
              ].map(({ val, lbl }) => (
                <div
                  key={lbl}
                  className="border border-gray-700 px-4 py-2 text-center min-w-22.5"
                >
                  <p className="text-[#ff7a1a] font-bold text-xl leading-none">{val}</p>
                  <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">{lbl}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — glassmorphism city cards */}
          <motion.div variants={fadeUp}>
            <p className="text-gray-500 text-[10px] uppercase tracking-[6px] mb-5">
              Locations
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {cities.map((city, i) => {
                const dotColor =
                  city.highlight          ? "#ef4444" :
                  city.label === "Global"      ? "#60a5fa" :
                  city.label === "Production"  ? "#ff7a1a" :
                                                 "#6b7280";

                const glowColor =
                  city.highlight          ? "rgba(239,68,68,0.15)" :
                  city.label === "Global"      ? "rgba(96,165,250,0.12)" :
                  city.label === "Production"  ? "rgba(255,122,26,0.13)" :
                                                 "rgba(255,255,255,0.05)";

                const borderColor =
                  city.highlight          ? "rgba(239,68,68,0.35)" :
                  city.label === "Global"      ? "rgba(96,165,250,0.28)" :
                  city.label === "Production"  ? "rgba(255,122,26,0.30)" :
                                                 "rgba(255,255,255,0.08)";

                return (
                  <motion.div
                    key={city.name}
                    variants={{
                      hidden: { opacity: 0, y: 10, scale: 0.96 },
                      show: {
                        opacity: 1, y: 0, scale: 1,
                        transition: { delay: 0.25 + i * 0.04, duration: 0.4, ease: EASE },
                      },
                    }}
                    whileHover={{
                      scale: 1.04,
                      y: -3,
                      transition: { duration: 0.2, ease: EASE },
                    }}
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`,
                      border: `1px solid ${borderColor}`,
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow: `0 2px 16px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.07)`,
                    }}
                    className="relative overflow-hidden rounded-lg px-3 py-2.5 cursor-default group"
                  >
                    {/* Top-left shimmer line — the iPhone glass edge */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
                      }}
                    />

                    {/* Hover inner glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${glowColor} 0%, transparent 70%)` }}
                    />

                    <div className="relative flex items-center gap-2">
                      {/* Dot with subtle ring */}
                      <span className="relative shrink-0 w-4 h-4 flex items-center justify-center">
                        <span
                          className="absolute w-4 h-4 rounded-full opacity-25 animate-ping"
                          style={{ backgroundColor: dotColor, animationDuration: "2.5s", animationDelay: `${i * 0.15}s` }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: dotColor, boxShadow: `0 0 6px ${dotColor}` }}
                        />
                      </span>

                      <div className="min-w-0">
                        <p className={`text-xs font-semibold leading-tight truncate ${
                          city.highlight ? "text-white" : "text-gray-200"
                        }`}>
                          {city.name}
                        </p>
                        <p
                          className="text-[9px] uppercase tracking-widest mt-0.5 truncate"
                          style={{ color: dotColor, opacity: 0.8 }}
                        >
                          {city.label}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-3 text-[10px] uppercase tracking-widest text-gray-500">
              {[
                { color: "#ef4444",  lbl: "Head Office" },
                { color: "#ff7a1a", lbl: "Production"  },
                { color: "#6b7280",  lbl: "Presence"    },
                { color: "#60a5fa",  lbl: "Global"      },
              ].map(({ color, lbl }) => (
                <span key={lbl} className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }}
                  />
                  {lbl}
                </span>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default OurPresence;