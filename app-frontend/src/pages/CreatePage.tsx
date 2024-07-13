import {ItemNav} from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";

function CreatePage() {
    return (
        <>
            <Sidebar items={ItemNav.Create} />
            <p>Create Page</p>
        </>
    )
}

export default CreatePage;