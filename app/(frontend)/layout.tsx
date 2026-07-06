import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
