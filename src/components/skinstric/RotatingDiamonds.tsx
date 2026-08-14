import { cn } from "@/lib/utils";

interface RotatingDiamondsProps {
  className?: string;
  /** opacity intensity of the dotted frames */
  tone?: "faint" | "normal" | "strong";
}

const toneMap = {
  faint: ["border-foreground/10", "border-foreground/[0.07]", "border-foreground/[0.05]"],
  normal: ["border-foreground/25", "border-foreground/20", "border-foreground/15"],
  strong: ["border-foreground/40", "border-foreground/30", "border-foreground/20"],
};

/**
 * Signature Skinstric visual: three concentric dotted squares (rotated 45°)
 * that slowly spin at different speeds/directions.
 */
export function RotatingDiamonds({ className, tone = "normal" }: RotatingDiamondsProps) {
  const [a, b, c] = toneMap[tone];
  return (
    <div className={cn("relative aspect-square pointer-events-none select-none", className)}>
      <div className={cn("absolute inset-0 rotate-45 border border-dashed", a, "animate-[spin_24s_linear_infinite]")} />
      <div className={cn("absolute inset-[7%] rotate-45 border border-dashed", b, "animate-[spin_30s_linear_infinite_reverse]")} />
      <div className={cn("absolute inset-[14%] rotate-45 border border-dashed", c, "animate-[spin_38s_linear_infinite]")} />
    </div>
  );
}
