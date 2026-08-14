import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface HeaderProps {
  label?: string;
  right?: ReactNode;
}

export function Header({ label = "INTRO", right }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between px-4 md:px-8 h-16 md:h-20 shrink-0 z-30 relative">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm md:text-base font-semibold tracking-tight transition-opacity hover:opacity-70"
      >
        <span className="font-mono">SKINSTRIC</span>
        <span className="font-mono text-foreground/45">[ {label} ]</span>
      </button>
      <div className="flex items-center gap-3">{right}</div>
    </header>
  );
}