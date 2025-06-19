export const metadata = {
  title: "Lawverse™ - AI Legal Agent",
  description: "Your AI-powered legal assistant",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white">{children}</body>
    </html>
  );
}
