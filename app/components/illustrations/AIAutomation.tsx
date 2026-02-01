export default function AIAutomation() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <circle cx="200" cy="200" r="140" fill="#ecfeff" />
      {[...Array(8)].map((_, i) => (
        <circle
          key={i}
          cx={200 + Math.cos(i) * 120}
          cy={200 + Math.sin(i) * 120}
          r="10"
          fill="#5eead4"
        />
      ))}
      <circle cx="200" cy="200" r="40" fill="#14b8a6" />
    </svg>
  );
}
