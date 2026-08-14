interface CircularGaugeProps {
  value: number; // 0 - 100
  label: string;
}

export function CircularGauge({ value, label }: CircularGaugeProps) {
  const size = 300;
  const stroke = 2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(Math.max(value, 0), 100) / 100);

  return (
    <div className="relative aspect-square w-full max-w-[340px]">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth={stroke * 1.5}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-light md:text-4xl">{label}</span>
        <span className="mt-1 text-5xl font-light tabular-nums md:text-6xl">
          {value}
          <span className="align-top text-2xl md:text-3xl">%</span>
        </span>
      </div>
    </div>
  );
}
