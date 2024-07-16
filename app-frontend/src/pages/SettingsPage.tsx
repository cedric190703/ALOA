import {ItemNav} from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";
import SettingsModule from "../molecules/Settings.tsx";

function SettingsPage() {
    return (
        <>
            <Sidebar items={ItemNav.Settings} />
            <p>Settings</p>
            <SettingsModule />
        </>
    )
}

export default SettingsPage;