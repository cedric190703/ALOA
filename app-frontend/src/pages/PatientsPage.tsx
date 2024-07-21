import React, { useState } from 'react';
import { ItemNav, TriageType } from "../utils/utils";
import Sidebar from "../organisms/SideBar";
import ButtonInfo from '../atoms/ButtonInfo.tsx';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/UserContext.tsx";
import '../styles/patients.css';

function PatientsPage() {
    const { users } = useUser(); // Use the users from context
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // Navigate to patient details page
    const handleGoToPatient = (id: string) => {
        navigate(`/patients/${id}`);
    }

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    // Filter patients based on search term
    const filteredPatients = users.filter(p =>
        p.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get triage type string
    const getTriageType = (triage: string) => {
        switch (triage) {
            case 'urgent':
                return TriageType.Urgent;
            case 'nonUrgent':
                return TriageType.NonUrgent;
            default:
                return TriageType.Emergency;
        }
    }

    return (
        <div>
            <Sidebar items={ItemNav.Patients} />
            <div className="patients-container">
                <div className="main-content">
                    <h1>Patients</h1>
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar"
                    />
                    <h2>Patient List</h2>
                    <div className="table-patients">
                        <Table striped>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Age</th>
                                <th>Diagnostic</th>
                                <th>Triage</th>
                                <th>More infos</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredPatients.map(p => (
                                <tr key={p.uniqueId}>
                                    <td>{p.patient_name}</td>
                                    <td>{p.patient_gender ? "Male" : "Female"}</td>
                                    <td>{p.patient_age}</td>
                                    <td>{p.diagnosis}</td>
                                    <td>{getTriageType(p.patient_triage)}</td>
                                    <td>
                                        <ButtonInfo onClick={() => handleGoToPatient(p.uniqueId!)} />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientsPage;