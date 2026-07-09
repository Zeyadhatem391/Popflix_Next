import Footer from "@/shared/components/organisms/Footer";
import Navbar from "@/shared/components/organisms/NavBar";
import { ReactNode, Suspense } from "react";

function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Suspense fallback="loading..">
        <Footer />
      </Suspense>
    </>
  );
}

export default PublicLayout;
