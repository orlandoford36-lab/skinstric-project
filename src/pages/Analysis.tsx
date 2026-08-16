import { useEffect, useState } from "react";
import { Header } from "@/components/skinstric/Header";
import { BottomNav } from "@/components/skinstric/BottomNav";

type ResultRow = { label: string; value: number };

export default function Analysis() {
  const [image, setImage] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, ResultRow[]>>({});

  useEffect(() => {
    const img = localStorage.getItem("skinstric_image");
    setImage(img);

    if (img) {
      // Produce a deterministic-ish mock analysis from the image data length
      const seed = img.length % 100;
      const make = (labels: string[]) =>
        labels.map((label, i) => ({ label, value: Math.max(1, (seed + i * 7) % 100) }));

      setResults({
        RACE: make(["East Asian", "Southeast Asian", "South Asian", "Latino Hispanic", "Middle Eastern", "White", "Black"]),
        AGE: make(["20-29", "30-39", "10-19", "40-49", "50-59"]),
        SEX: make(["Female", "Male"]),
      });
    }
  }, []);

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-background">
      <Header label="ANALYSIS" />

      <main className="relative flex flex-1 flex-col items-center justify-center px-4">
        {!image ? (
          <div className="text-center">
            <h1 className="skinstric-section-title">Analysis</h1>
            <p className="mt-6 max-w-lg text-[13px]">No image found. Please upload or capture an image on the Select page first.</p>
          </div>
        ) : (
          <div className="max-w-3xl w-full">
            <h1 className="skinstric-section-title">Analysis</h1>
            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-start">
              <div className="w-full md:w-1/3 flex justify-center">
                <img src={image} alt="Uploaded" className="max-h-72 object-contain rounded border" />
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-sm text-muted-foreground">Results generated from uploaded image (mock/demo).</p>
                <div className="mt-4 space-y-4">
                  {Object.entries(results).map(([section, rows]) => (
                    <div key={section} className="border border-border p-4 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{section}</h3>
                        <span className="font-mono text-xs text-muted-foreground">A.I. CONFIDENCE</span>
                      </div>
                      <div className="divide-y divide-border">
                        {rows.map((r) => (
                          <div key={r.label} className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-3">
                              <span className="h-2 w-2 rotate-45 border border-foreground" />
                              <span className="text-sm">{r.label}</span>
                            </div>
                            <span className="font-mono text-sm tabular-nums">{r.value} %</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
