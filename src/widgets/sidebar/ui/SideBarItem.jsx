import { NavLink } from "react-router-dom";

export function SideBarItem({label, icon, navigateTo = "#"}) {
    return (
        <NavLink to={navigateTo} className={`flex gap-4 py-4 lg:p-4 rounded-md hover:bg-blue-500/10 lg:gap-0 lg:overflow-hidden hover:bg-[#f6f4f] rounded-md transition-all duration-500 ease-in-out group-hover:gap-4`}>
            {icon}
            <p className={`text-gray-500 font-semibold sideBarItemAnimation`}>{label}</p>
        </NavLink>
    );
};