import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/skinstric/Header";
import { BottomNav } from "@/components/skinstric/BottomNav";

export default function CameraPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
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
      localStorage.setItem("skinstric_image", dataUrl);
    } catch (e) {
      console.error("Failed to save capture to localStorage", e);
    }

    navigate("/select");
  }

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-background">
      <Header label="CAMERA" />

      <main className="relative flex flex-1 flex-col items-center justify-center px-4">
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
      </main>

      <BottomNav />
    </div>
  );
}
