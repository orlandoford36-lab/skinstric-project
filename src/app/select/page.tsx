"use client";

import PageShell from "@/components/layout/PageShell";
import BottomNav from "@/components/layout/BottomNav";
import { ROUTES } from "@/constants/routes";

export default function SelectPage() {
  return (
    <PageShell contentClassName="min-h-screen px-7 pt-24 md:px-8">
      <section className="skinstric-content-enter relative min-h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="skinstric-section-title">Select Routine</h1>
          <p className="mt-6 max-w-lg text-[13px]">This is a placeholder for the selection step. Implement selections here.</p>
        </div>
      </section>

      <BottomNav showProceed={false} />
    </PageShell>
  );
}
