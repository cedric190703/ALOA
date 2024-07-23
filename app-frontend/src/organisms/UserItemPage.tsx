import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SideBar.tsx";
import {getTriageType, ItemNav} from "../utils/utils.ts";
import { useUser } from "../context/UserContext.tsx";
import Card from "react-bootstrap/Card";

const UserItemPage = () => {
    const { users } = useUser();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    document.body.style.backgroundColor = dark ? "#000000" : "#FFFFFF";

    const getBack = () => {
        navigate(`/patients`);
    };

    // Filter users to find the one with the matching ID
    const user = users.find(p => {
        return p.uniqueId === id;
    });

    // Check if user exists
    if (!user) {
        return (
            <div>
                <button id='get-back' onClick={getBack}>
                    Back
                </button>
                <p>Document not found</p>
            </div>
        );
    }

    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className="user-info-page">
            <Sidebar items={ItemNav.Patients}/>
            <button id='get-back' style={{position: 'absolute', top: '0', marginTop: '12px'}} onClick={getBack}>
                Back
            </button>
            <div className="profile-card-container" style={{ marginTop: '12px', width: "60%", textAlign: "center" }}>
                <Card className="profile-card">
                    <Card.Body>
                        <Card.Title className="profile-card-title">
                            <strong>Name:</strong> {user.patient_name}
                        </Card.Title>
                        <Card.Text>
                            <strong>Gender:</strong> {user.patient_gender ? "Male" : "Female"}
                        </Card.Text>
                        <Card.Text>
                            <strong>Diagnosis:</strong> {user.diagnosis}
                        </Card.Text>
                        <Card.Text>
                            <strong>Triage</strong> {getTriageType(user.patient_triage)}
                        </Card.Text>
                        <Card.Text>
                            <strong>Created
                                at:</strong> {new Date(user.date_recorded).toLocaleDateString("en-US", options)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default UserItemPage;