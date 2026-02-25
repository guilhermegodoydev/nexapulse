import { NavLink } from "react-router-dom";

export function SideBarItem({label, icon, navigateTo, onClick}) {

    const itemStyle = "flex gap-4 p-4 rounded-md hover:bg-blue-500/10 lg:gap-0 lg:overflow-hidden hover:bg-[#f6f4f] rounded-md transition-all duration-500 ease-in-out group-hover:gap-4 w-full cursor-pointer";
    const labelStyle = "text-content-base font-semibold sideBarItemAnimation";

    if (!navigateTo) {
        return (
            <button className={itemStyle} onClick={onClick}>
                {icon}
                <p className={labelStyle}>{label}</p>
            </button>
        );
    }

    return (
        <NavLink 
            to={navigateTo} 
            end
            className={({ isActive }) => itemStyle + (isActive ? " bg-blue-500/10" : "")} 
        >
            {icon}
            <p className={labelStyle}>{label}</p>
        </NavLink>
    );
};