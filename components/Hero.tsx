"use client"
import Image from "next/image";
import { Users, MapPin, Briefcase, Award, ChevronDown } from "lucide-react";

const stats = [
    { icon: Users, value: "12,000+", label: "Installations" },
    { icon: MapPin, value: "15+", label: "Cities" },
    { icon: Briefcase, value: "250+", label: "Professionals" },
    { icon: Award, value: "14+", label: "Years Experience" },
];

const Hero = () => {
    return (
        <section className="relative min-h-screen overflow-hidden bg-[#030303]">
            {/* =========================
          BACKGROUND LAYERS
      ========================== */}
            <div className="absolute inset-0 bg-[#030303]" />






            {/* Vignette */}
            <div
                className="
          absolute inset-0
          bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.85)_100%)]
        "
            />

            {/* Bottom Fade */}
            <div
                className="
          absolute bottom-0 left-0 right-0
          h-75
          bg-linear-to-t
          from-black
          via-black/60
          to-transparent
        "
            />

            {/* =========================
          BUILDING IMAGE
      ========================== */}
            <div className="absolute inset-0 pointer-events-none">
                <Image
                    src="/bg.png"
                    alt="Building"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                    className="
            object-contain
            object-right
            scale-110
            opacity-95
            -translate-x-80
          "
                />
            </div>

<div
  className="
    hidden
    md:flex
    absolute
    right-[-80px]
    xl:right-[-40px]
    top-1/2
    -translate-y-1/2
    z-20
    rotate-[12deg]
  "
>
  <div className="flex flex-col gap-[2px]">
    {[
      {
        title: "EXECUTE",
        desc: "Flawless Execution Nationwide",
        image: "/Execute.png",
      },
      {
        title: "BUILD",
        desc: "Manufactured With Precision",
        image: "/Build.png",
      },
      {
        title: "DESIGN",
        desc: "Designs That Define Brands",
        image: "/Design.png",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="
          relative
          overflow-hidden
          collage-card

          w-[140px]
          h-[130px]

          md:w-[180px]
          md:h-[170px]

          lg:w-[220px]
          lg:h-[200px]

          xl:w-[280px]
          xl:h-[240px]

          border
          border-gray-500
          bg-black
        "
      >
        <img
          src={item.image}
          alt={item.title}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            -rotate-[12deg]
            scale-125
          "
        />

        <div className="absolute inset-0 bg-black/45" />

        <div
          className="
            absolute
            bottom-5
            left-5
            z-10
            -rotate-[12deg]
          "
        >
          <h3
            className="
              text-[#ff7a1a]
              font-bold
              uppercase

              text-lg
              lg:text-xl
              xl:text-2xl
            "
          >
            {item.title}
          </h3>

          <p
            className="
              mt-2
              text-white
              max-w-[160px]

              text-xs
              lg:text-sm
            "
          >
            {item.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

            {/* =========================
          CONTENT
      ========================== */}
            <div className="relative z-20 container mx-auto px-6 lg:px-16">
                <div className="flex flex-col justify-center min-h-screen pt-15 pb-16">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[#ff7a1a] text-2xl font-bold">I</span>
                            <p className="text-sm md:text-base tracking-[8px] uppercase text-gray-300">
                                INDIA'S LEADING
                            </p>
                        </div>

                        <h1 className="font-(family-name:--font-oswald) uppercase leading-[0.9]">
                            <span className="block text-white text-5xl md:text-7xl lg:text-7xl font-bold">
                                Brand
                            </span>

                            <span className="block py-2 text-[#ff7a1a] text-5xl md:text-7xl lg:text-7xl ">
                                Infrastructure
                            </span>

                            <span className="block text-white text-5xl md:text-7xl lg:text-7xl font-bold">
                                Partner
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-gray-300 opacity-85 text-base md:text-lg leading-relaxed italic">
                            From concept to nationwide rollout, we build brand
                            experiences that inspire, engage & last.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <button
                                className="
                  bg-[#ff7a1a]
                  hover:bg-orange-600
                  transition-all
                  duration-300
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wide
                  text-white
                "
                            >
                                Explore Our Work →
                            </button>

                            <button
                                className="
                  border
                  border-gray-600
                  hover:border-white
                  transition-all
                  duration-300
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  text-white
                  flex
                  items-center
                  gap-2
                "
                            >
                                Watch Showreel
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default Hero;
