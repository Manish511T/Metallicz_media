"use client";
import Image from "next/image";
import Stats from "./Stats";

const collageCards = [
  { title: "EXECUTE", desc: "Flawless Execution Nationwide", image: "/Execute.png" },
  { title: "BUILD",   desc: "Manufactured With Precision",  image: "/Build.png"   },
  { title: "DESIGN",  desc: "Designs That Define Brands",   image: "/Design.png"  },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303]">

      {/* ── Background base ── */}
      <div className="absolute inset-0 bg-[#030303]" />

      {/* ── Vignette ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

      {/* ── Bottom fade  (FIX: bg-gradient-to-t, not bg-linear-to-t) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* ── Building image – visible on all screen sizes ── */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/bg.png"
          alt="Building"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
          className="
            object-contain
            object-bottom
            opacity-30
            scale-105
            translate-y-10

            sm:object-right
            sm:opacity-50
            sm:scale-110
            sm:translate-y-0
            sm:translate-x-0

            md:opacity-95
            md:-translate-x-40

            lg:-translate-x-60

            xl:-translate-x-80
          "
        />
      </div>

      {/* ── Collage cards
            · hidden on mobile (sm) — avoid overlap with hero text
            · shown from md up, anchored bottom-right
            · rotate-[12deg] on the wrapper, counter-rotate images
      ── */}
      <div
        className="
          hidden md:flex
          absolute
          right-10 xl:right-20
          top-1/2 -translate-y-1/2
          z-20
          rotate-12
        "
      >
        <div className="flex flex-col gap-2 mt-25">
          {collageCards.map((item) => (
            <div
              key={item.title}
              className="
                relative overflow-hidden
                w-[160px] h-[145px]
                lg:w-[210px] lg:h-[190px]
                xl:w-[270px] xl:h-[235px]
                border border-gray-500 bg-black
              "
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover -rotate-[12deg] scale-125"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute bottom-4 left-4 z-10 -rotate-[12deg]">
                <h3 className="text-[#ff7a1a] font-bold uppercase text-lg lg:text-xl xl:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-white max-w-[150px] text-xs lg:text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-20 container mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col justify-center min-h-screen pt-20 pb-16">

          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[#ff7a1a] text-2xl font-bold">I</span>
            <p className="text-xs sm:text-sm tracking-[6px] sm:tracking-[8px] uppercase text-gray-300">
              INDIA'S LEADING
            </p>
          </div>

          {/* Headline
              FIX: font-(family-name:--font-oswald) is Tailwind v4 syntax — use style prop for CSS var */}
          <h1
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
          </h1>

          {/* Sub-copy */}
          <p className="mt-5 max-w-xs sm:max-w-md md:max-w-xl text-gray-300 opacity-85 text-sm sm:text-base md:text-lg leading-relaxed italic">
            From concept to nationwide rollout, we build brand experiences that
            inspire, engage &amp; last.
          </p>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
            <button className="bg-[#ff7a1a] hover:bg-orange-600 transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-white">
              Explore Our Work →
            </button>
            <button className="border border-gray-600 hover:border-white transition-all duration-300 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold uppercase text-white flex items-center gap-2">
              Watch Showreel
            </button>
          </div>

          <Stats />

        </div>
      </div>
    </section>
  );
};

export default Hero;