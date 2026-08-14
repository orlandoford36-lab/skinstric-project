import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface BottomNavProps {
  back?: NavItem;
  next?: NavItem;
}

function DiamondButton({
  item,
  dir,
}: {
  item: NavItem;
  dir: "left" | "right";
}) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={item.onClick}
      disabled={item.disabled}
      className={cn(
        "group flex items-center gap-3 disabled:opacity-30 disabled:pointer-events-none",
        dir === "right" && "flex-row-reverse"
      )}
    >
      <span className="grid h-11 w-11 place-items-center rotate-45 border border-foreground/60 transition-colors duration-200 group-hover:bg-foreground">
        <Icon
          className="h-4 w-4 -rotate-45 text-foreground transition-colors duration-200 group-hover:text-background"
          strokeWidth={1.5}
        />
      </span>
      <span className="font-mono text-xs md:text-sm font-medium tracking-widest">
        {item.label}
      </span>
    </button>
  );
}

export function BottomNav({ back, next }: BottomNavProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex items-center justify-between px-4 md:bottom-10 md:px-10">
      <div className="pointer-events-auto">
        {back && <DiamondButton item={back} dir="left" />}
      </div>
      <div className="pointer-events-auto">
        {next && <DiamondButton item={next} dir="right" />}
      </div>
    </div>
  );
}
