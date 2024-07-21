import { useState } from 'react';
import { ItemNav } from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";
import NavCreate from "../molecules/NavCreate.tsx";
import CreateAppointment from "../organisms/CreateAppointment.tsx";
import CreateMedicalRecord from "../organisms/CreateMedicalRecord.tsx";

function CreatePage() {
    const [activeTab, setActiveTab] = useState<string | null>('create-appointment'); // Default tab

    // Function to handle tab selection
    const handleSelect = (selectedKey: string | null) => {
        setActiveTab(selectedKey);
    };

    return (
        <div>
            <Sidebar items={ItemNav.Create} />
            <NavCreate onSelect={handleSelect} />
            <div className="content-container">
                {activeTab === 'create-appointment' && <CreateAppointment />}
                {activeTab === 'create-medical-record' && <CreateMedicalRecord />}
            </div>
        </div>
    );
}

export default CreatePage;
