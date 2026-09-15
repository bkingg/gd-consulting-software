"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NavigationProgressBar = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const growIntervalRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);
  const isFirstRender = useRef(true);

  // Start the bar as soon as the user clicks an internal link, before
  // the route transition actually resolves.
  useEffect(() => {
    const clearGrowInterval = () => {
      if (growIntervalRef.current !== null) {
        window.clearInterval(growIntervalRef.current);
        growIntervalRef.current = null;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const isInternal = href && href.startsWith("/") && !href.startsWith("//");
      if (!isInternal || href === pathname || anchor.target === "_blank") return;

      if (hideTimeoutRef.current !== null) {
        window.clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = null;
      }
      clearGrowInterval();
      setVisible(true);
      setProgress(15);
      growIntervalRef.current = window.setInterval(() => {
        setProgress((p) => (p < 85 ? p + (85 - p) * 0.2 : p));
      }, 120);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      clearGrowInterval();
    };
  }, [pathname]);

  // Once the route has actually changed, snap to 100% and fade out.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (growIntervalRef.current !== null) {
      window.clearInterval(growIntervalRef.current);
      growIntervalRef.current = null;
    }
    setProgress(100);
    hideTimeoutRef.current = window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
    return () => {
      if (hideTimeoutRef.current !== null) window.clearTimeout(hideTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[60] overflow-hidden pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
        style={{
          width: `${progress}%`,
          opacity: visible ? 1 : 0,
          transition: visible
            ? "width 200ms ease-out, opacity 150ms ease-out"
            : "opacity 300ms ease-out",
        }}
      />
    </div>
  );
};

export default NavigationProgressBar;
