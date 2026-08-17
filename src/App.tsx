import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import Testing from "@/pages/Testing";
import Select from "@/pages/Select";
import Camera from "@/pages/Camera";
import Analysis from "@/pages/Analysis";
import Demographics from "@/pages/Demographics";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{ className: "font-mono text-xs" }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/select" element={<Select />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/demographics" element={<Demographics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}