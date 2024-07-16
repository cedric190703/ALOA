import { ItemNav, TriageType } from "../utils/utils";
import Sidebar from "../organisms/SideBar";
import ButtonInfo from '../atoms/ButtonInfo.tsx';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import '../styles/patients.css';

function PatientsPage() {
    const navigate = useNavigate();
    const Patients = [
        {
            id: 1,
            name: "name1",
            Gender: "Male",
            age: 19,
            diagnostic: "Test",
            Triage: TriageType.Emergency
        },
        {
            id: 2,
            name: "name2",
            Gender: "Male",
            age: 20,
            diagnostic: "Test",
            Triage: TriageType.Emergency
        },
        {
            id: 3,
            name: "name2",
            Gender: "Male",
            age: 20,
            diagnostic: "Test",
            Triage: TriageType.Emergency
        },
        {
            id: 4,
            name: "name2",
            Gender: "Male",
            age: 20,
            diagnostic: "Test",
            Triage: TriageType.Emergency
        },
        {
            id: 5,
            name: "name2",
            Gender: "Male",
            age: 20,
            diagnostic: "Test",
            Triage: TriageType.Emergency
        },
        {
            id: 6,
            name: "name2",
            Gender: "Male",
            age: 20,
            diagnostic: "Test",
            Triage: TriageType.Emergency
        }
    ];

    const handleGoToPatient = (id: number) => {
        navigate(`/patients/${id}`);
    }

    return (
        <div>
            <Sidebar items={ItemNav.Patients} />
            <div className="patients-container">
                <div className="main-content">
                    <h1>Patients</h1>
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
                            {Patients.map(p => (
                                <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.Gender}</td>
                                    <td>{p.age}</td>
                                    <td>{p.diagnostic}</td>
                                    <td>{p.Triage}</td>
                                    <td>
                                        <ButtonInfo onClick={() => handleGoToPatient(p.id)} />
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
