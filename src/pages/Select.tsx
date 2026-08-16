import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image as ImageIcon } from "lucide-react";
import { Header } from "@/components/skinstric/Header";
import { RotatingDiamonds } from "@/components/skinstric/RotatingDiamonds";
import { BottomNav } from "@/components/skinstric/BottomNav";

export default function Select() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const startAnalysis = () => {
    setLoading(true);
    setTimeout(() => navigate("/analysis"), 1800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const dataUrl = String(reader.result || "");
        // Save image to localStorage and keep it in component state
        localStorage.setItem("skinstric_image", dataUrl);
        setSelectedImage(dataUrl);
      } catch (err) {
        console.error("Failed to save image:", err);
      }
      // do not auto-navigate here — wait for user to confirm via Proceed
    };
    reader.readAsDataURL(file);
  };

  // keep currently-selected image so user can confirm before proceeding
  const [selectedImage, setSelectedImage] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("skinstric_image") : null
  );

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
                onClick={() => cameraRef.current?.click()}
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
              <input
                ref={cameraRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handleFileChange}
              />

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
                  onChange={handleFileChange}
                />
              </button>
            </div>
                {selectedImage && (
                  <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="w-[min(80vw,420px)] border rounded overflow-hidden">
                      <img src={selectedImage} alt="Selected" className="w-full object-contain" />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          // allow re-taking/choose another
                          localStorage.removeItem("skinstric_image");
                          setSelectedImage(null);
                          // open camera again
                          cameraRef.current?.click();
                        }}
                        className="rounded-sm border px-4 py-2 font-mono text-xs"
                      >
                        RETAKE
                      </button>
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="rounded-sm bg-foreground px-4 py-2 font-mono text-xs text-background"
                      >
                        CHOOSE ANOTHER
                      </button>
                    </div>
                  </div>
                )}
          </>
        )}
      </main>

      {!loading && (
        <BottomNav
          back={{ label: "BACK", onClick: () => navigate("/testing") }}
              next={{
                label: "PROCEED",
                onClick: () => {
                  // require a selected image (in state) before proceeding
                  if (selectedImage) {
                    startAnalysis();
                  } else {
                    // open gallery picker by default
                    fileRef.current?.click();
                  }
                },
              }}
        />
      )}
    </div>
  );
}
