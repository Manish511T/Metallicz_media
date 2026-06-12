"use client";

import { useEffect, useRef, useState } from "react";
import { Users, MapPin, Briefcase, Award } from "lucide-react";

const stats = [
  { icon: Users,    value: 12000, suffix: "+", label: "Installations"    },
  { icon: MapPin,   value: 15,    suffix: "+", label: "Cities"           },
  { icon: Briefcase,value: 250,   suffix: "+", label: "Professionals"    },
  { icon: Award,    value: 14,    suffix: "+", label: "Years Experience" },
];

// ── Single animated counter ──────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

// ── Individual stat card ─────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
  animate,
  index,
}: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  animate: boolean;
  index: number;
}) {
  // stagger each card by 150 ms
  const [delayedStart, setDelayedStart] = useState(false);

  useEffect(() => {
    if (!animate) return;
    const timer = setTimeout(() => setDelayedStart(true), index * 150);
    return () => clearTimeout(timer);
  }, [animate, index]);

  const count = useCountUp(value, 1800, delayedStart);

  const display =
    value >= 1000
      ? `${(count / 1000).toFixed(count >= 1000 ? 0 : 1)}k`
      : count.toString();

  return (
    <div
      className="
        flex flex-col gap-1
        transition-all duration-700 ease-out
      "
      style={{
        opacity: delayedStart ? 1 : 0,
        transform: delayedStart ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <Icon className="text-[#ff7a1a] w-5 h-5 mb-1" />

      <span className="text-white font-bold text-xl sm:text-2xl tabular-nums">
        {display}
        <span className="text-[#ff7a1a]">{suffix}</span>
      </span>

      <span className="text-gray-400 text-xs uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect(); // fire once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={ref}
      className="
        mt-12 sm:mt-16
        grid grid-cols-2 sm:grid-cols-4
        gap-6 sm:gap-4
        max-w-xl md:max-w-2xl
      "
    >
      {stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} animate={hasAnimated} index={i} />
      ))}
    </div>
  );
}