export default function ProcessFlow() {
  return (
    <svg viewBox="0 0 700 200" className="w-full h-full">
      {[80, 260, 440, 620].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="100" r="34" fill="#5eead4" />
          {i < 3 && (
            <line
              x1={x + 34}
              y1="100"
              x2={x + 146}
              y2="100"
              stroke="#cbd5f5"
              strokeWidth="4"
              strokeDasharray="6 6"
            />
          )}
        </g>
      ))}
    </svg>
  );
}
