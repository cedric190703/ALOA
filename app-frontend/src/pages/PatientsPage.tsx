import {ItemNav} from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";

function PatientsPage() {
    return (
        <>
            <Sidebar items={ItemNav.Patients} />
            <p>Patients</p>
        </>
    )
}

export default PatientsPage;