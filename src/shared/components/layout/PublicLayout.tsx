import NextAuthProvider from "@/providers/NextAuthProvider";
import Footer from "@/shared/components/organisms/Footer";
import Navbar from "@/shared/components/organisms/NavBar";
import { ReactNode } from "react";

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
     <NextAuthProvider>
        <Navbar/>
          {children}
        <Footer />
    </NextAuthProvider>
    </>
  );
}

export default PublicLayout;
