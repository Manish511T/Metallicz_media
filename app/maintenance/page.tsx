// app/maintenance/page.tsx

export default function MaintenancePage() {
  return (
    <main
      className="relative min-h-screen bg-[#030303] flex items-center justify-center overflow-hidden px-6"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,122,26,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 text-center max-w-lg w-full rounded-2xl px-8 py-14"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 100%)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow:
            "0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
        }}
      >
        {/* Top shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
          }}
        />

        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "rgba(255,122,26,0.12)",
              border: "1px solid rgba(255,122,26,0.3)",
              boxShadow: "0 0 24px rgba(255,122,26,0.15)",
            }}
          >
            {/* Wrench + gear SVG */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ff7a1a"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
        </div>

        {/* Eyebrow */}
        <p className="text-[#ff7a1a] text-[10px] uppercase tracking-[8px] mb-4">
          We'll be right back
        </p>

        {/* Heading */}
        <h1
          className="text-white uppercase leading-[0.92] mb-5"
          style={{
            fontFamily: "var(--font-oswald, 'Oswald', sans-serif)",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          }}
        >
          Under <span className="text-[#ff7a1a]">Maintenance</span>
        </h1>

        {/* Body */}
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          We're currently upgrading our website to serve you better.
          The site will be back shortly. Thank you for your patience.
        </p>

        {/* Divider */}
        <div
          className="w-12 h-px mx-auto mb-8"
          style={{ background: "rgba(255,122,26,0.4)" }}
        />

        {/* Contact fallback */}
        <p className="text-gray-500 text-xs">
          Need to reach us right now?{" "}
          <a
            href="mailto:info@metalliczmedia.com"
            className="text-[#ff7a1a] hover:underline transition-colors"
          >
            info@metalliczmedia.com
          </a>
        </p>

        {/* Logo placeholder */}
        <p
          className="mt-8 text-gray-700 text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-oswald, 'Oswald', sans-serif)" }}
        >
          Metallicz Media
        </p>
      </div>
    </main>
  );
}