import "./globals.css";

export const metadata = {
  title: "GD Consulting | Ingénierie Logicielle & Conseil",
  description:
    "Solutions logicielles sur mesure — Conseil, Ingénierie et Développement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
