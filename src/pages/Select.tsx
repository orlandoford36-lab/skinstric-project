import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image as ImageIcon } from "lucide-react";
import { Header } from "@/components/skinstric/Header";
import { RotatingDiamonds } from "@/components/skinstric/RotatingDiamonds";
import { BottomNav } from "@/components/skinstric/BottomNav";

export default function Select() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => navigate("/analysis"), 1800);
  };

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-background">
      <Header label="ANALYSIS" />

      <main className="relative flex flex-1 flex-col items-center justify-center px-4">
        {loading ? (
          <div className="z-10 flex flex-col items-center gap-5 text-center animate-fade-in">
            <RotatingDiamonds tone="strong" className="w-28" />
            <p className="font-mono text-xs tracking-widest text-muted-foreground">
              PREPARING YOUR ANALYSIS
            </p>
          </div>
        ) : (
          <>
            <p className="mb-10 font-mono text-[11px] tracking-widest text-muted-foreground md:mb-16">
              TO START ANALYSIS
            </p>

            <div className="flex flex-col items-center gap-14 md:flex-row md:gap-28">
              {/* Camera */}
              <button
                onClick={startAnalysis}
                className="group relative grid h-64 w-64 place-items-center md:h-72 md:w-72"
              >
                <RotatingDiamonds
                  tone="normal"
                  className="absolute inset-0 transition-opacity group-hover:opacity-60"
                />
                <span className="z-10 flex flex-col items-center gap-3">
                  <Camera className="h-9 w-9" strokeWidth={1.2} />
                  <span className="font-mono text-xs font-medium tracking-widest">
                    ALLOW A.I.
                    <br />
                    TO SCAN YOUR FACE
                  </span>
                </span>
              </button>

              {/* Gallery */}
              <button
                onClick={() => fileRef.current?.click()}
                className="group relative grid h-64 w-64 place-items-center md:h-72 md:w-72"
              >
                <RotatingDiamonds
                  tone="normal"
                  className="absolute inset-0 transition-opacity group-hover:opacity-60"
                />
                <span className="z-10 flex flex-col items-center gap-3">
                  <ImageIcon className="h-9 w-9" strokeWidth={1.2} />
                  <span className="font-mono text-xs font-medium tracking-widest">
                    ALLOW A.I.
                    <br />
                    ACCESS TO GALLERY
                  </span>
                </span>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => startAnalysis()}
                />
              </button>
            </div>
          </>
        )}
      </main>

      {!loading && (
        <BottomNav
          back={{ label: "BACK", onClick: () => navigate("/testing") }}
          next={{ label: "PROCEED", onClick: startAnalysis }}
        />
      )}
    </div>
  );
}
