import {ItemNav} from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";
import SettingsModule from "../molecules/Settings.tsx";

function SettingsPage() {
    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    document.body.style.backgroundColor = dark ? "#000000" : "#FFFFFF";

    return (
        <div style={{ backgroundColor: dark ? "black" : "white" }}>
            <Sidebar items={ItemNav.Settings} />
            <p>Settings</p>
            <SettingsModule />
        </div>
    )
}

export default SettingsPage;