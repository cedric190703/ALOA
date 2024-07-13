import {ItemNav} from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";

function SettingsPage() {
    return (
        <>
            <Sidebar items={ItemNav.Settings} />
            <p>Settings</p>
        </>
    )
}

export default SettingsPage;