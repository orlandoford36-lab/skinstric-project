import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Header } from "@/components/skinstric/Header";
import { RotatingDiamonds } from "@/components/skinstric/RotatingDiamonds";
import { BottomNav } from "@/components/skinstric/BottomNav";

const steps = [
  { key: "name", prompt: "Introduce Yourself", placeholder: "Enter your name" },
  { key: "city", prompt: "Where are you from?", placeholder: "Enter your city name" },
] as const;

export default function Testing() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({ name: "", city: "" });
  const [processing, setProcessing] = useState(false);

  const current = steps[step];
  const value = values[current.key];

  const setValue = (v: string) =>
    setValues((prev) => ({ ...prev, [current.key]: v }));

  const advance = () => {
    if (!value.trim()) {
      toast("Please type an answer to continue.");
      return;
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    // final submit
    localStorage.setItem("skinstric_intro", JSON.stringify(values));
    setProcessing(true);
    setTimeout(() => navigate("/select"), 1600);
  };

  const goBack = () => {
    if (processing) return;
    if (step > 0) setStep(step - 1);
    else navigate("/");
  };

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-background">
      <Header label="INTRO" />

      <main className="relative flex flex-1 flex-col items-center justify-center px-4">
        <RotatingDiamonds
          tone="normal"
          className="absolute left-1/2 top-1/2 w-[min(90vw,620px)] -translate-x-1/2 -translate-y-1/2"
        />

        {processing ? (
          <div className="z-10 flex flex-col items-center gap-4 text-center animate-fade-in">
            <RotatingDiamonds tone="strong" className="w-24" />
            <p className="font-mono text-xs tracking-widest text-muted-foreground">
              PROCESSING SUBMISSION
            </p>
          </div>
        ) : (
          <div className="z-10 flex flex-col items-center text-center animate-fade-in">
            <p className="mb-4 font-mono text-[11px] tracking-widest text-muted-foreground">
              CLICK TO TYPE
            </p>
            <input
              autoFocus
              aria-label={current.prompt}
              value={value}
              placeholder={current.placeholder}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && advance()}
              className="w-[min(88vw,560px)] border-b border-foreground/40 bg-transparent pb-2 text-center text-3xl font-light tracking-tight outline-none placeholder:text-foreground/25 focus:border-foreground md:text-5xl"
            />
            <p className="mt-6 text-sm text-muted-foreground">{current.prompt}</p>
          </div>
        )}
      </main>

      {!processing && (
        <BottomNav
          back={{ label: "BACK", onClick: goBack }}
          next={{ label: "PROCEED", onClick: advance, disabled: !value.trim() }}
        />
      )}
    </div>
  );
}
