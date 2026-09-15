import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/expertise", label: "Expertise" },
  { href: "/ingenierie", label: "Ingénierie" },
  { href: "/contact", label: "Contact" },
  { href: "/questionnaire", label: "Questionnaire" },
];

const SiteFooter = () => {
  return (
    <footer className="bg-black text-white/70 px-6 py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-bold text-white tracking-wide">
          GD Consulting
        </span>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="hover:text-white transition-colors">
              {label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:contact@gdco.tech"
          className="text-sm hover:text-white transition-colors"
        >
          contact@gdco.tech
        </a>
      </div>

      <p className="text-center text-xs text-white/40 mt-8">
        © {new Date().getFullYear()} GD Consulting. Tous droits réservés.
      </p>
    </footer>
  );
};

export default SiteFooter;
