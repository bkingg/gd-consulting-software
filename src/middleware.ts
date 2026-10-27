import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES, Locale } from "@/lib/i18n";

// Pick the visitor's preferred supported language from Accept-Language
function detectLocale(req: NextRequest): Locale {
  const header = req.headers.get("accept-language") ?? "";
  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  const match = preferred.find((p) => (LOCALES as readonly string[]).includes(p.lang));
  return (match?.lang as Locale) ?? DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  // Former French-only URLs keep working
  const target = pathname === "/questionnaire" ? "/questionnaire/site-web" : pathname;
  const lang = target === pathname ? detectLocale(req) : "fr";

  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${target === "/" ? "" : target}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and files with an extension (images, robots.txt…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
