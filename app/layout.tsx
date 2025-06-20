export const metadata = {
  title: "Lawverse™ AI",
  description: "Your personal legal assistant.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
