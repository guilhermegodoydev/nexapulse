import { Outlet } from "react-router-dom";
import { SideBar } from "@widgets/sidebar/ui/SideBar";
import { useMediaQuery } from "@shared/lib/useMediaQuery";        
import { useSession } from "@entities/user/model/sessionContext"; 

export default function App() {
  const { session, isInitialized } = useSession();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (!isInitialized) return <p>Carregando...</p>;

  if (!session) return null;

  return (
    <div>
      <SideBar/>

      <div className={`bg-bg-main min-h-screen ${isMobile ? "" : "pl-[88px]"}`}>
        <Outlet/>
      </div>
    </div>
  );
}