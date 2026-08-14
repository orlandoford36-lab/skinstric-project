import { Header } from "@/components/skinstric/Header";
import { BottomNav } from "@/components/skinstric/BottomNav";

export default function Analysis() {
  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-background">
      <Header label="ANALYSIS" />

      <main className="relative flex flex-1 flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="skinstric-section-title">Analysis</h1>
          <p className="mt-6 max-w-lg text-[13px]">Analysis results will appear here after uploading an image.</p>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
