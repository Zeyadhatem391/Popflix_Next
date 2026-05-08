import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/NavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
