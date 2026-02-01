import { Outlet } from "react-router-dom";
import { SideBar } from "@widgets/sidebar/ui/SideBar";
import { useMediaQuery } from "@shared/lib/useMediaQuery";

export default function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div>
      <SideBar/>

      <div className={`bg-bg-main min-h-screen ${isMobile ? "" : "pl-[88px]"}`}>
        <Outlet/>
      </div>
    </div>
  );
}