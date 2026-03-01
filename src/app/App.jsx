import { Outlet } from "react-router-dom";
import { SideBar } from "@widgets/sidebar/ui/SideBar";
import { useMediaQuery } from "@shared/lib/useMediaQuery";        
import { useSession } from "@entities/user/model/sessionContext"; 
import { RootFallback } from "./ui/RootFallback";

export default function App() {
  const { session, isInitialized } = useSession();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (!session || !isInitialized) return <RootFallback/>;

  return (
    <div>
      <SideBar/>

      <div className={`bg-bg-main min-h-screen ${isMobile ? "" : "pl-[88px]"}`}>
        <Outlet/>
      </div>
    </div>
  );
}