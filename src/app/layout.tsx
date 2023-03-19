import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Matter",
  description: "A project tracking application",
};

const uncutSans = localFont({
  src: "./Uncut-Sans-Variable.woff2",
  variable: "--font-UncutSans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={uncutSans.variable}>
      <body>{children}</body>
    </html>
  );
}
