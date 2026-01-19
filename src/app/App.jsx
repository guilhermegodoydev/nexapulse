import { Outlet } from "react-router-dom";
import { SideBar } from "@widgets/sidebar/ui/SideBar";
import { useMediaQuery } from "@shared/lib/hooks/useMediaQuery";

export default function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div className={isMobile ? "" : "ml-[87px]"}>
      <SideBar/>

      <main>
        <Outlet/>
      </main>
    </div>
  );
}