"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Keeps <html lang> correct for /en/* routes without opting the whole
// site out of static generation (which a request-time header read would).
const HtmlLangSync = () => {
  const pathname = usePathname();

  useEffect(() => {
    const isEn = pathname === "/en" || pathname.startsWith("/en/");
    document.documentElement.lang = isEn ? "en" : "fr";
  }, [pathname]);

  return null;
};

export default HtmlLangSync;
