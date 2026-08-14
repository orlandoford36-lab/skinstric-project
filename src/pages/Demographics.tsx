import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/skinstric/Header";
import { BottomNav } from "@/components/skinstric/BottomNav";
import { CircularGauge } from "@/components/skinstric/CircularGauge";
import { cn } from "@/lib/utils";

type Row = { label: string; value: number };
type Category = "RACE" | "AGE" | "SEX";

const DATA: Record<Category, Row[]> = {
  RACE: [
    { label: "East Asian", value: 96 },
    { label: "Southeast Asian", value: 3 },
    { label: "South Asian", value: 1 },
    { label: "Latino Hispanic", value: 0 },
    { label: "Middle Eastern", value: 0 },
    { label: "White", value: 0 },
    { label: "Black", value: 0 },
  ],
  AGE: [
    { label: "20-29", value: 74 },
    { label: "30-39", value: 18 },
    { label: "10-19", value: 5 },
    { label: "40-49", value: 2 },
    { label: "50-59", value: 1 },
    { label: "3-9", value: 0 },
  ],
  SEX: [
    { label: "Female", value: 91 },
    { label: "Male", value: 9 },
  ],
};

export default function Demographics() {
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>("RACE");
  const rows = DATA[category];
  const [selected, setSelected] = useState<string>(rows[0].label);

  const active = useMemo(
    () => rows.find((r) => r.label === selected) ?? rows[0],
    [rows, selected]
  );

  const summary: Record<Category, string> = {
    RACE: rows[0].label,
    AGE: rows[0].label,
    SEX: rows[0].label,
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-background pb-28">
      <Header label="ANALYSIS" />

      <div className="px-4 pt-2 md:px-10">
        <p className="font-mono text-[11px] tracking-widest text-muted-foreground">
          A. I. ANALYSIS
        </p>
        <h2 className="mt-1 text-lg font-light md:text-xl">DEMOGRAPHICS</h2>
        <p className="text-xs text-muted-foreground">PREDICTED RACE &amp; AGE</p>
      </div>

      <main className="flex-1 px-4 pt-6 md:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_1fr_320px]">
          {/* Category selector */}
          <div className="flex flex-col divide-y divide-border border border-border">
            {(Object.keys(DATA) as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setSelected(DATA[cat][0].label);
                }}
                className={cn(
                  "flex items-center justify-between px-4 py-5 text-left transition-colors",
                  category === cat
                    ? "bg-foreground text-background"
                    : "hover:bg-accent"
                )}
              >
                <span className="text-lg font-light">{summary[cat]}</span>
                <span className="font-mono text-[10px] tracking-widest opacity-70">
                  {cat}
                </span>
              </button>
            ))}
          </div>

          {/* Gauge */}
          <div className="flex items-center justify-center border border-border py-10">
            <CircularGauge value={active.value} label={active.label} />
          </div>

          {/* Breakdown list */}
          <div className="flex flex-col border border-border">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {category}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
                A. I. CONFIDENCE
              </span>
            </div>
            <div className="flex-1 divide-y divide-border">
              {rows.map((row) => (
                <button
                  key={row.label}
                  onClick={() => setSelected(row.label)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-4 text-left transition-colors",
                    selected === row.label
                      ? "bg-foreground text-background"
                      : "hover:bg-accent"
                  )}
                >
                  <span className="flex items-center gap-3 text-sm">
                    <span
                      className={cn(
                        "h-2 w-2 rotate-45 border",
                        selected === row.label
                          ? "border-background bg-background"
                          : "border-foreground"
                      )}
                    />
                    {row.label}
                  </span>
                  <span className="font-mono text-sm tabular-nums">{row.value} %</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-2xl text-xs text-muted-foreground">
          If A.I. estimate is wrong, select the correct one from the list above. These estimates are
          generated from your submitted data for demonstration purposes.
        </p>
      </main>

      <BottomNav
        back={{ label: "BACK", onClick: () => navigate("/analysis") }}
        next={{ label: "HOME", onClick: () => navigate("/") }}
      />
    </div>
  );
}

