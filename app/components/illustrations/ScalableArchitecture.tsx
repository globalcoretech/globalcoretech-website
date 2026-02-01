export default function ScalableArchitecture() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#99f6e4" />
        </linearGradient>
      </defs>

      <rect x="60" y="80" width="180" height="120" rx="20" fill="url(#g1)" />
      <rect x="280" y="60" width="200" height="140" rx="24" fill="#e5e7eb" />
      <rect x="170" y="230" width="220" height="110" rx="22" fill="#f1f5f9" />

      <line x1="240" y1="140" x2="280" y2="130" stroke="#94a3b8" strokeWidth="3"/>
      <line x1="240" y1="180" x2="280" y2="180" stroke="#94a3b8" strokeWidth="3"/>
      <line x1="300" y1="200" x2="300" y2="230" stroke="#94a3b8" strokeWidth="3"/>
      <line x1="360" y1="200" x2="360" y2="230" stroke="#94a3b8" strokeWidth="3"/>
    </svg>
  );
}
