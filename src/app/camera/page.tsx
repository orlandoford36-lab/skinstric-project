"use client";

import { useRef } from "react";
import PageShell from "@/components/layout/PageShell";
import BottomNav from "@/components/layout/BottomNav";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <PageShell contentClassName="min-h-screen px-7 pt-24 md:px-8">
      <section className="skinstric-content-enter relative min-h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="skinstric-section-title">Camera</h1>
          <p className="mt-6 max-w-lg text-[13px]">Camera capture UI placeholder.</p>
          <div className="mt-6">
            <video ref={videoRef} className="mx-auto w-[320px] h-[240px] bg-gray-100" />
          </div>
        </div>
      </section>

      <BottomNav showProceed={false} />
    </PageShell>
  );
}
