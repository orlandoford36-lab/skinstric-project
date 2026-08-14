import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/skinstric/Header";
import { RotatingDiamonds } from "@/components/skinstric/RotatingDiamonds";
import { cn } from "@/lib/utils";

export default function Home() {
  const navigate = useNavigate();
  const [hover, setHover] = useState<"left" | "right" | null>(null);

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-background">
      <Header
        label="INTRO"
        right={
          <button
            onClick={() => toast("Access code experience coming soon.")}
            className="rounded-sm bg-foreground px-3 py-2 font-mono text-[10px] font-medium tracking-widest text-background transition-opacity hover:opacity-80 md:text-xs"
          >
            ENTER CODE
          </button>
        }
      />

      {/* Ambient side diamonds */}
      <RotatingDiamonds
        tone="faint"
        className="absolute -left-[28%] top-1/2 hidden w-[70vh] -translate-y-1/2 md:block"
      />
      <RotatingDiamonds
        tone="faint"
        className="absolute -right-[28%] top-1/2 hidden w-[70vh] -translate-y-1/2 md:block"
      />

      <main className="relative flex flex-1 flex-col items-center justify-center px-4">
        {/* Center headline */}
        <div
          className={cn(
            "z-10 text-center transition-transform duration-500 ease-out",
            hover === "left" && "md:translate-x-24",
            hover === "right" && "md:-translate-x-24"
          )}
        >
          <h1 className="text-[15vw] font-light leading-[0.85] tracking-tighter md:text-[9vw] lg:text-[8rem]">
            Sophisticated
          </h1>
          <h1 className="text-[15vw] font-light leading-[0.85] tracking-tighter md:text-[9vw] lg:text-[8rem] md:pl-24">
            skincare
          </h1>
        </div>

        {/* Left CTA */}
        <button
          onMouseEnter={() => setHover("right")}
          onMouseLeave={() => setHover(null)}
          onClick={() => navigate("/testing")}
          className="group absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-3 md:flex"
        >
          <span className="grid h-12 w-12 place-items-center rotate-45 border border-foreground/60 transition-colors duration-200 group-hover:bg-foreground">
            <ChevronLeft className="h-4 w-4 -rotate-45 transition-colors group-hover:text-background" strokeWidth={1.5} />
          </span>
          <span className="font-mono text-xs font-medium tracking-widest">DISCOVER A.I.</span>
        </button>

        {/* Right CTA */}
        <button
          onMouseEnter={() => setHover("left")}
          onMouseLeave={() => setHover(null)}
          onClick={() => navigate("/testing")}
          className="group absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-row-reverse items-center gap-3 md:flex"
        >
          <span className="grid h-12 w-12 place-items-center rotate-45 border border-foreground/60 transition-colors duration-200 group-hover:bg-foreground">
            <ChevronRight className="h-4 w-4 -rotate-45 transition-colors group-hover:text-background" strokeWidth={1.5} />
          </span>
          <span className="font-mono text-xs font-medium tracking-widest">TAKE TEST</span>
        </button>

        {/* Mobile CTAs */}
        <div className="z-10 mt-10 flex gap-4 md:hidden">
          <button
            onClick={() => navigate("/testing")}
            className="rounded-sm border border-foreground/60 px-5 py-3 font-mono text-xs font-medium tracking-widest"
          >
            DISCOVER A.I.
          </button>
          <button
            onClick={() => navigate("/testing")}
            className="rounded-sm bg-foreground px-5 py-3 font-mono text-xs font-medium tracking-widest text-background"
          >
            TAKE TEST
          </button>
        </div>
      </main>

      {/* Bottom-left copy */}
      <div className="pointer-events-none absolute bottom-8 left-4 z-10 max-w-xs md:bottom-12 md:left-10">
        <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
          Skinstric developed an A.I. that creates a highly-personalised routine tailored to what your
          skin needs.
        </p>
      </div>

      {/* Bottom-right enter experience */}
      <div className="absolute bottom-8 right-4 z-10 md:bottom-12 md:right-10">
        <button
          onClick={() => navigate("/testing")}
          className="group flex flex-row-reverse items-center gap-3"
        >
          <span className="grid h-11 w-11 place-items-center rotate-45 border border-foreground/60 transition-colors duration-200 group-hover:bg-foreground">
            <ChevronRight className="h-4 w-4 -rotate-45 transition-colors group-hover:text-background" strokeWidth={1.5} />
          </span>
          <span className="font-mono text-xs font-medium tracking-widest">ENTER EXPERIENCE</span>
        </button>
      </div>
    </div>
  );
}
