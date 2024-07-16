import {useNavigate, useParams} from "react-router-dom";
import Sidebar from "./SideBar.tsx";
import {ItemNav} from "../utils/utils.ts";
import Card from "react-bootstrap/Card";

const UserItemPage = () => {
    const Patients = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            isDoctor: true,
            patients: '42',
            specialization: "brain surgery",
        },
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            isDoctor: true,
            patients: '42',
            specialization: "brain surgery",
        },
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            isDoctor: true,
            patients: '42',
            specialization: "brain surgery",
        },
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            isDoctor: true,
            patients: '42',
            specialization: "brain surgery",
        },
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            isDoctor: true,
            patients: '42',
            specialization: "brain surgery",
        },
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            isDoctor: true,
            patients: '42',
            specialization: "brain surgery",
        }
    ];

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const getBack = () => {
        navigate(`/patients`);
    }

    const item = Patients[id];

    if (!item) {
        return <p>Document not found</p>;
    }

    return (
        <div className="user-info-page">
            <Sidebar items={ItemNav.Patients}/>
            <button id='get-back' onClick={getBack}>
                Retour
            </button>
            <div className="profile-card-container">
                <Card className="profile-card">
                    <Card.Body>
                        <Card.Title className="profile-card-title">
                            <strong>Name:</strong> {item.name}
                        </Card.Title>
                        <Card.Text>
                            <strong>Email:</strong> {item.email}
                        </Card.Text>
                        <Card.Text>
                            <strong>Role:</strong> {item.isDoctor ? 'Doctor' : 'Patient'}
                        </Card.Text>
                        <Card.Text>
                            <strong>Number of patients:</strong> {item.patients}
                        </Card.Text>
                        <Card.Text>
                            <strong>specialization:</strong> {item.specialization}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default UserItemPage;