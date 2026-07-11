import Footer from "@/shared/components/organisms/Footer";
import Navbar from "@/shared/components/organisms/NavBar";
import { ReactNode } from "react";

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
        <Footer />
    </>
  );
}

export default PublicLayout;
