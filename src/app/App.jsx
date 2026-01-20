import { Outlet } from "react-router-dom";
import { SideBar } from "@widgets/sidebar/ui/SideBar";
import { useMediaQuery } from "@shared/lib/hooks/useMediaQuery";

export default function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div>
      <SideBar/>

      <main className={`bg-bg-main min-h-screen ${isMobile ? "" : "pl-[88px]"}`}>
        <Outlet/>
      </main>
    </div>
  );
}