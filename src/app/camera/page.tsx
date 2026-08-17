"use client";

import { useEffect, useRef, useState } from "react";
import PageShell from "@/components/layout/PageShell";
import BottomNav from "@/components/layout/BottomNav";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (mounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        setError("Unable to access camera. Please grant permission or use upload.");
      }
    }

    startCamera();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  function capture() {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");

    try {
      localStorage.setItem("upload_base64", dataUrl);
      localStorage.setItem("upload_filename", "camera-capture.png");
    } catch (e) {
      console.error("Failed to save capture to localStorage", e);
    }

    router.push(ROUTES.upload);
  }

  return (
    <PageShell contentClassName="min-h-screen px-7 pt-24 md:px-8">
      <section className="skinstric-content-enter relative min-h-[calc(100vh-6rem)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="skinstric-section-title">Camera</h1>
          <p className="mt-6 max-w-lg text-[13px]">Allow camera access and capture an image.</p>

          <div className="mt-6">
            <video ref={videoRef} className="mx-auto w-[320px] h-[240px] bg-gray-100" playsInline />
          </div>

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={capture} className="skinstric-action-button skinstric-action-button-dark">Capture</button>
          </div>
        </div>
      </section>

      <BottomNav showProceed={false} />
    </PageShell>
  );
}
