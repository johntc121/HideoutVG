"use client";

import { useEffect, useRef } from "react";

export default function ConvertKit() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Prevent duplicates during client-side navigation
    const existing = containerRef.current.querySelector(
      'script[src="https://hideoutvg.kit.com/1cbd6a3f70/index.js"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://hideoutvg.kit.com/1cbd6a3f70/index.js";
    script.setAttribute("data-uid", "1cbd6a3f70");

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current?.contains(script)) {
        containerRef.current.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="my-10 rounded-xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-xl font-semibold">Get the HideoutVG Weekly</h3>

      <p className="mt-1 text-sm text-white/70">
        A short Friday email with the biggest gaming news, hot takes, and what’s
        worth your time.
      </p>

      {/* ConvertKit injects the form here — DO NOT WRAP OR STYLE THIS */}
      <div ref={containerRef} className="mt-4" />
    </section>
  );
}
