import {ItemNav} from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";

function AppointmentPage() {
    return  (
        <>
            <Sidebar items={ItemNav.Calendar} />
            <p>Appointment</p>
        </>
    )
}

export default AppointmentPage;