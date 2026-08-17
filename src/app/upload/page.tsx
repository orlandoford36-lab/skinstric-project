"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import PageShell from "@/components/layout/PageShell";
import RotatingDiamond from "@/components/ui/RotatingDiamond";
import { ROUTES } from "@/constants/routes";
import { submitPhaseTwoImage } from "@/lib/api";
import { getInitialActualSelections } from "@/lib/demographics";
import { fileToBase64 } from "@/lib/image";
import { saveActualSelections, saveDemographicsData } from "@/lib/storage";

type UploadStage = "permission" | "preview" | "analyzing";

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previewContentRef = useRef<HTMLDivElement | null>(null);
  const analyzingContentRef = useRef<HTMLDivElement | null>(null);

  const [stage, setStage] = useState<UploadStage>("permission");
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // If a camera capture saved a dataURL to localStorage, load it into preview
  useEffect(() => {
    try {
      const dataUrl = localStorage.getItem("upload_base64");
      const filename = localStorage.getItem("upload_filename") || "";

      if (dataUrl) {
        setPreviewUrl(dataUrl);

        // strip data: prefix to keep the same shape as fileToBase64's base64
        const base64 = dataUrl.split(",")[1] || "";
        setBase64Image(base64);
        setFileName(filename || "camera-capture.png");
        setStage("preview");

        localStorage.removeItem("upload_base64");
        localStorage.removeItem("upload_filename");
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const previewContent = previewContentRef.current;
    const analyzingContent = analyzingContentRef.current;

    const ctx = gsap.context(() => {
      if (stage === "preview" && previewContent) {
        const previewItems = previewContent.querySelectorAll(
          "[data-upload-reveal]",
        );

        gsap.set(previewItems, {
          autoAlpha: 0,
          y: 14,
        });

        gsap.to(previewItems, {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
        });
      }

      if (stage === "analyzing" && analyzingContent) {
        gsap.fromTo(
          analyzingContent,
          {
            autoAlpha: 0,
            scale: 0.96,
            y: 12,
          },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
        );
      }
    });

    return () => ctx.revert();
  }, [stage]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setErrorMessage("");

      const result = await fileToBase64(file);

      setPreviewUrl(result.dataUrl);
      setBase64Image(result.base64);
      setFileName(file.name);
      setStage("preview");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Please upload a valid image file.";

      setPreviewUrl("");
      setBase64Image("");
      setFileName("");
      setErrorMessage(message);
      setStage("permission");
    }
  }

  async function handleAnalyzeImage() {
    if (!base64Image) {
      setErrorMessage("Please upload an image before proceeding.");
      return;
    }

    try {
      setStage("analyzing");
      setErrorMessage("");

      const response = await submitPhaseTwoImage({
        image: base64Image,
      });

      saveDemographicsData(response.data);
      saveActualSelections(getInitialActualSelections(response.data));

      router.push(ROUTES.analysis);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while analyzing your image.";

      setErrorMessage(message);
      setStage("preview");
    }
  }

  function resetUpload() {
    setPreviewUrl("");
    setBase64Image("");
    setFileName("");
    setErrorMessage("");
    setStage("permission");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  if (stage === "analyzing") {
    return (
      <PageShell contentClassName="flex min-h-screen items-center justify-center px-7 pt-0 md:px-8">
        <div ref={analyzingContentRef}>
          <RotatingDiamond size="md">
            <p className="text-[13px] font-semibold uppercase tracking-[-0.02em]">
              PREPARING YOUR ANALYSIS ...
            </p>
          </RotatingDiamond>
        </div>
      </PageShell>
    );
  }

  if (stage === "preview") {
    return (
      <PageShell contentClassName="min-h-screen px-7 pt-24 md:px-8">
        <section className="relative min-h-[calc(100vh-6rem)]">
          <h1 className="skinstric-label absolute left-0 top-0">UPLOAD IMAGE</h1>

          <div ref={previewContentRef} className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
            <RotatingDiamond size="md">
              <div data-upload-reveal className="flex w-full max-w-[520px] flex-col items-center gap-6">
                {previewUrl ? (
                  <div className="w-full">
                    <img src={previewUrl} alt={fileName || "preview"} className="mx-auto max-h-[420px] w-auto" />
                  </div>
                ) : null}

                <p className="text-[12px] font-semibold uppercase tracking-[-0.02em]">{fileName || "Selected image"}</p>

                <div className="flex gap-6">
                  <button
                    type="button"
                    onClick={handleAnalyzeImage}
                    className="skinstric-action-button skinstric-action-button-dark"
                  >
                    ANALYZE IMAGE
                  </button>

                  <button
                    type="button"
                    onClick={resetUpload}
                    className="skinstric-action-button skinstric-action-button-light"
                  >
                    CHANGE IMAGE
                  </button>
                </div>

                <p className={["mt-2 text-[11px] text-center text-red-600", errorMessage ? "opacity-100" : "opacity-0"].join(" ")}>{errorMessage || ""}</p>
              </div>
            </RotatingDiamond>
          </div>
        </section>
      </PageShell>
    );
  }

  // permission stage (default)
  return (
    <PageShell contentClassName="min-h-screen px-7 pt-24 md:px-8">
      <section className="skinstric-content-enter relative min-h-[calc(100vh-6rem)]">
        <h1 className="skinstric-label absolute left-0 top-0">UPLOAD IMAGE</h1>

        <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center">
          <RotatingDiamond size="md">
            <div className="skinstric-access-grid">
              <div className="skinstric-access-option">
                <div className="skinstric-access-icon-shell">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload from gallery"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </button>
                </div>

                <p className="skinstric-access-label">Upload from gallery</p>
              </div>

              <div className="skinstric-access-option">
                <div className="skinstric-access-icon-shell">
                  <button
                    type="button"
                    onClick={() => router.push(ROUTES.camera)}
                    aria-label="Use camera"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                  </button>
                </div>

                <p className="skinstric-access-label">Use camera</p>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </RotatingDiamond>
        </div>
      </section>

      <BottomNav
        onBack={() => router.push(ROUTES.select)}
        showProceed={false}
      />
    </PageShell>
  );

    }
