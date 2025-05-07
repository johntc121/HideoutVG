"use client";
import { useEffect, useRef } from "react";

export default function EmbeddedVideo({ url, title }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener("scroll", handleScroll, { passive: true }); // ✅ Fix: Passive listener

    return () => window.removeEventListener("scroll", handleScroll); // ✅ Cleanup
  }, []);

  return (
    <iframe
      ref={iframeRef}
      className="embedded-video"
      src={url}
      title={title}
      allowFullScreen
      loading="lazy"
    />
  );
}
