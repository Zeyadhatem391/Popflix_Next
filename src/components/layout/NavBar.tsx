
import MobileButtonNav from "../common/(NavBar)/MobileNav";
import DesktopNav from "../common/(NavBar)/DesktopNav";

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-black  md:px-20">
        {/* Desktop */}
        <DesktopNav />

        {/* Mobile */}
        <MobileButtonNav />
      </nav>
    </>
  );
}
