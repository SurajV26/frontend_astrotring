import { useMemo } from "react";

const ZODIAC_SIGNS = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

/* orbit radius = fraction of --wheel-size (full box width) */
const ORBIT_GEMS = [
  { frac: 0.22, duration: 16, reverse: false, size: 14, from: "#FEF3C7", to: "#F59E0B", glow: "18px" },
  { frac: 0.3, duration: 24, reverse: true, size: 17, from: "#FFEDD5", to: "#EA580C", glow: "22px" },
  { frac: 0.38, duration: 34, reverse: false, size: 12, from: "#FFF7ED", to: "#FB923C", glow: "16px" },
  { frac: 0.46, duration: 48, reverse: true, size: 15, from: "#FDE68A", to: "#D97706", glow: "20px" },
];

const RING_FRACS = [0.44, 0.6, 0.76, 0.9];

const SUN_RAYS = Array.from({ length: 10 }, (_, i) => i * 36);

function seededStar(index) {
  const seed = (index * 6271 + 31415) % 233280;
  const rnd = (n) => ((seed * (n + 2) * 11) % 10000) / 100;
  return {
    left: rnd(1),
    top: rnd(2),
    size: 2 + (seed % 18) / 8,
    duration: 2.2 + (seed % 28) / 10,
    delay: (seed % 35) / 10,
  };
}

const ZodiacWheel = () => {
  const radius = 210;

  return (
    <svg viewBox="-240 -240 480 480" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="gold-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(251,191,36,0.8)" />
          <stop offset="50%" stopColor="rgba(245,158,11,0.55)" />
          <stop offset="100%" stopColor="rgba(234,88,12,0.65)" />
        </linearGradient>
      </defs>

      <circle cx="0" cy="0" r="228" fill="none" stroke="url(#gold-ring-grad)" strokeWidth="2" />
      <circle cx="0" cy="0" r="205" fill="none" stroke="rgba(180,120,40,0.2)" strokeWidth="1" strokeDasharray="3 7" />

      {ZODIAC_SIGNS.map((sign, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <g key={i} transform={`translate(${x},${y})`}>
            <circle r="20" fill="white" stroke="rgba(245,158,11,0.45)" strokeWidth="1.5" />
            <text
              x="0"
              y="6"
              textAnchor="middle"
              fontFamily="'Segoe UI Symbol', Poppins, sans-serif"
              fontSize="18"
              fontWeight="600"
              fill="#B45309"
            >
              {sign}
            </text>
          </g>
        );
      })}

      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 15 - 90) * (Math.PI / 180);
        const x1 = 218 * Math.cos(angle);
        const y1 = 218 * Math.sin(angle);
        const x2 = (218 - 12) * Math.cos(angle);
        const y2 = (218 - 12) * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(120,72,20,0.35)"
            strokeWidth="1.4"
          />
        );
      })}
    </svg>
  );
};

const ConstellationLayer = () => (
  <svg viewBox="-180 -180 360 360" className="h-full w-full">
    <polyline
      points="-110,-80 -70,-50 -30,-70 10,-40 50,-60 80,-30"
      fill="none"
      stroke="rgba(245,158,11,0.5)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <polyline
      points="60,80 100,50 130,90 90,120 50,100"
      fill="none"
      stroke="rgba(234,88,12,0.42)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <polyline
      points="-130,70 -90,40 -70,80 -30,55"
      fill="none"
      stroke="rgba(180,100,30,0.38)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    {[
      [-110, -80, "2.4s"],
      [-70, -50, "3s"],
      [-30, -70, "3.6s"],
      [10, -40, "2.8s"],
      [50, -60, "3.2s"],
      [80, -30, "2.5s"],
      [60, 80, "3.4s"],
      [100, 50, "2.7s"],
      [130, 90, "3.8s"],
      [90, 120, "2.2s"],
      [50, 100, "3.1s"],
      [-130, 70, "2.9s"],
      [-90, 40, "3.5s"],
      [-70, 80, "2.6s"],
      [-30, 55, "3.3s"],
    ].map(([cx, cy, dur], i) => (
      <circle key={i} cx={cx} cy={cy} r="3" fill="#F59E0B">
        <animate attributeName="r" values="2;3.8;2" dur={dur} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;1;0.4" dur={dur} repeatCount="indefinite" />
      </circle>
    ))}
  </svg>
);

const HeroTaramandal = ({ compact = false }) => {
  const wheelSize = compact ? 130 : 520;
  const stars = useMemo(
    () => Array.from({ length: compact ? 20 : 36 }, (_, i) => seededStar(i)),
    [compact],
  );

  return (
    <div
      className="astro-wheel-stage relative shrink-0"
      style={{
        width: wheelSize,
        height: wheelSize,
        maxWidth: "100%",
        ["--wheel-size"]: `${wheelSize}px`,
      }}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute -inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.28)_0%,rgba(249,115,22,0.08)_45%,transparent_70%)]" />

      <div className="absolute inset-[4%] rounded-full bg-white/30 " />

      {stars.map((star, i) => (
        <span
          key={i}
          className="hero-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      <div className="absolute inset-0 animate-taramandal-spin">
        <ZodiacWheel />
      </div>

      <div className="absolute inset-[8%] animate-taramandal-counter">
        <ConstellationLayer />
      </div>

      <div className="absolute inset-0 grid place-items-center">
        {RING_FRACS.map((frac) => (
          <div
            key={frac}
            className="absolute rounded-full border border-dashed border-amber-500/25"
            style={{
              width: `calc(var(--wheel-size) * ${frac})`,
              height: `calc(var(--wheel-size) * ${frac})`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 grid place-items-center">
        {ORBIT_GEMS.map((gem, i) => (
          <div
            key={i}
            className={`absolute h-0 w-0 ${gem.reverse ? "animate-orbit-rev" : "animate-orbit"}`}
            style={{
              ["--orbit-r"]: `calc(var(--wheel-size) * ${gem.frac})`,
              animationDuration: `${gem.duration}s`,
            }}
          >
            <div
              className="rounded-full"
              style={{
                width: gem.size,
                height: gem.size,
                background: `radial-gradient(circle at 30% 28%, ${gem.from}, ${gem.to})`,
                boxShadow: `0 0 ${gem.glow} rgba(245,158,11,0.7)`,
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <div className="relative flex items-center justify-center" style={{ width: "22%", height: "22%" }}>
          <div
            className="absolute -inset-[35%] animate-taramandal-spin rounded-full border-2 border-amber-300/35"
            style={{ animationDuration: "40s" }}
          />
          <div
            className="absolute -inset-[55%] animate-taramandal-counter rounded-full border border-dashed border-amber-400/25"
            style={{ animationDuration: "55s" }}
          />

          <div
            className="relative flex h-full w-full animate-glow-pulse items-center justify-center rounded-full"
            style={{
              background: "radial-gradient(circle at 32% 28%, #FFFBEB 0%, #FDE68A 35%, #F59E0B 70%, #EA580C 100%)",
            }}
          >
            {SUN_RAYS.map((deg) => (
              <span
                key={deg}
                className="absolute left-1/2 top-0 w-1 origin-bottom rounded-full bg-gradient-to-t from-amber-400 to-transparent"
                style={{
                  height: "calc(var(--wheel-size) * 0.065)",
                  transform: `translate(-50%, 50%) rotate(${deg}deg) translateY(calc(var(--wheel-size) * -0.075))`,
                }}
              />
            ))}
            <div
              className="relative z-10 rounded-full bg-[radial-gradient(circle_at_40%_35%,#FFFFFF,#FEF3C7_55%,transparent)]"
              style={{ width: "42%", height: "42%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTaramandal;
