import { useNavigate } from "react-router-dom";
import { RotatingDiamonds } from "@/components/skinstric/RotatingDiamonds";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      <RotatingDiamonds
        tone="faint"
        className="absolute left-1/2 top-1/2 w-[min(90vw,560px)] -translate-x-1/2 -translate-y-1/2"
      />
      <h1 className="z-10 text-7xl font-light tracking-tighter md:text-9xl">404</h1>
      <p className="z-10 mt-3 font-mono text-xs tracking-widest text-muted-foreground">
        PAGE NOT FOUND
      </p>
      <button
        onClick={() => navigate("/")}
        className="z-10 mt-8 rounded-sm bg-foreground px-6 py-3 font-mono text-xs font-medium tracking-widest text-background transition-opacity hover:opacity-80"
      >
        BACK TO HOME
      </button>
    </div>
  );
}
