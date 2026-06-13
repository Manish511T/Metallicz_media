"use client";

import { motion, useReducedMotion } from "framer-motion"; // single import
import { useEffect, useState } from "react";
import Image from "next/image";
import Stats from "./Stats";


const EASE = "easeOut" as const;
// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const collageCards = [
    { title: "DESIGN",  desc: "Designs That Define Brands",   image: "/Design.png"  },
  { title: "EXECUTE", desc: "Flawless Execution Nationwide", image: "/Execute.png" },
  { title: "BUILD",   desc: "Manufactured With Precision",  image: "/Build.png"   },
];

// ─────────────────────────────────────────────
// Variants — called with isMobile so logic runs
// ─────────────────────────────────────────────
const containerVariants = (mobile: boolean) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: mobile ? 0.07 : 0.13 },
  },
});

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};


const imageVariants = (mobile: boolean) => ({
  hidden: { opacity: 0, y: mobile ? 24 : 0, x: mobile ? 0 : 80 },
  show:   {
    opacity: mobile ? 0.25 : 0.95,
    y: 0,
    x: 0,
    transition: { duration: mobile ? 0.7 : 1.1, ease: EASE },
  },
});

const collageContainerVariants = (mobile: boolean) => ({
  hidden: { opacity: 0, y: mobile ? 20 : 0, x: mobile ? 0 : 100 },
  show:   {
    opacity: 1, y: 0, x: 0,
    transition: { duration: mobile ? 0.45 : 1.1, delay: mobile ? 0.25 : 0.5, ease: EASE },
  },
});

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.35 + i * 0.11, duration: 0.55, ease: EASE },
  }),
};

const mobileCardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.6 + i * 0.1, duration: 0.45, ease: EASE },
  }),
};

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion(); // FIX: now actually used below

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // When user prefers reduced motion, skip all entrance animations
  const initial  = shouldReduceMotion ? "show" : "hidden";
  const animate  = "show";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303]">

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black via-black/60 to-transparent" />

      {/* ── Building image ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          variants={imageVariants(isMobile)}   // FIX: called with isMobile
          initial={initial}
          animate={animate}
          className="absolute inset-0"
        >
          <Image
            src="/bg.png"
            alt="Building"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
            className="
              object-contain
              object-bottom
              scale-105
              sm:object-right
              sm:scale-110
              md:-translate-x-40
              lg:-translate-x-60
              xl:-translate-x-80
              opacity-90
            "
          />
        </motion.div>
      </div>

      {/* ── Collage cards — desktop/tablet only ── */}
      <motion.div
        variants={collageContainerVariants(isMobile)}   // FIX: called with isMobile
        initial={initial}
        animate={animate}
        className="
          hidden md:flex
          absolute
          right-6 lg:right-10 xl:right-16
          top-1/2 -translate-y-1/2
          z-20
          rotate-12
        "
      >
        <div className="flex flex-col gap-0.75 mt-24 ">
          {collageCards.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -8 }}
              transition={{ duration: 0.28 }}
              className="
                relative overflow-hidden cursor-pointer
                border border-gray-500 bg-black
                w-38.75 h-35
                lg:w-51.25 lg:h-46.25
                xl:w-66.25 xl:h-57.5
              "
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover -rotate-12 scale-125 transition-transform duration-700 hover:scale-[1.42]"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute bottom-4 left-4 z-10 -rotate-12">
                <h3 className="text-[#ff7a1a] font-bold uppercase text-lg lg:text-xl xl:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-white max-w-37.5 text-xs lg:text-sm">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-20 container mx-auto px-6 sm:px-8 lg:px-16">
        <motion.div
          variants={containerVariants(isMobile)}   // FIX: called with isMobile
          initial={initial}
          animate={animate}
          className="flex flex-col justify-center min-h-screen pt-20 pb-16"
        >

          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
            <span className="text-[#ff7a1a] text-2xl font-bold">I</span>
            <p className="text-xs sm:text-sm tracking-[6px] sm:tracking-[8px] uppercase text-gray-300">
              INDIA'S LEADING
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="uppercase leading-[0.9] max-w-[90vw] sm:max-w-xl lg:max-w-2xl"
            style={{ fontFamily: "var(--font-oswald, 'Oswald', sans-serif)" }}
          >
            <span className="block text-white text-5xl sm:text-6xl md:text-7xl font-bold">
              Brand
            </span>
            <span className="block py-2 text-[#ff7a1a] text-5xl sm:text-6xl md:text-7xl">
              Infrastructure
            </span>
            <span className="block text-white text-5xl sm:text-6xl md:text-7xl font-bold">
              Partner
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xs sm:max-w-md md:max-w-xl text-gray-300 opacity-85 text-sm sm:text-base md:text-lg leading-relaxed italic"
          >
            From concept to nationwide rollout, we build brand experiences that
            inspire, engage &amp; last.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <button className="bg-[#ff7a1a] hover:bg-orange-600 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white">
              Explore Our Work →
            </button>
            <button className="border border-gray-600 hover:border-white transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase text-white flex items-center gap-2">
              Watch Showreel
            </button>
          </motion.div>

          {/* ── Mobile collage cards — horizontal strip below CTAs ── */}
          <div className="md:hidden mt-8 -mx-6 px-6 overflow-x-auto">
            <div className="flex gap-3 pb-2 w-max">
              {collageCards.map((item, index) => (
                <motion.div
                  key={item.title}
                  custom={index}
                  variants={mobileCardVariants}
                  initial={initial}
                  animate={animate}
                  className="
                    relative overflow-hidden shrink-0 cursor-pointer
                    border border-gray-600 bg-black
                    w-35 h-27.5
                  "
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute bottom-3 left-3 z-10">
                    <h3 className="text-[#ff7a1a] font-bold uppercase text-sm leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white text-[10px] mt-0.5 max-w-27.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <Stats />
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;