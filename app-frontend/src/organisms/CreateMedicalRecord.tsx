import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {GenderType, TriageType} from "../utils/utils.ts";
import {useState} from "react";
import '../styles/create.css';

function CreateMedicalRecord() {
    const [age, setAge] = useState('42');
    const [name, setName] = useState('');
    const [gender, setGender] = useState<GenderType>(GenderType.Male);
    const [diagnostic, setDiagnostic] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [pathology, setPathology] = useState('');
    const [status, setStatus] = useState<TriageType>(TriageType.NonUrgent);
    const [notes, setNotes] = useState('');
    const [validated, setValidated] = useState(false);

    const handleCreateUser = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // TODO: connect to the backend : create a user
        }
        setValidated(true);
    };

    return (
        <div className="create-user-container">
            <h1 className="create-user-title">Create Medical Record</h1>
            <div className="create-user-form">
                <Form noValidate validated={validated} onSubmit={handleCreateUser}>

                    <Form.Group controlId="formBasicText" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the patient's name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicStatus" className="item-create-user">
                        <Form.Label>Gender type</Form.Label>
                        <Form.Select value={gender} onChange={(e) => setGender(e.target.value as GenderType)}>
                            <option value={GenderType.Male}>Male</option>
                            <option value={GenderType.Female}>Female</option>
                            <option value={GenderType.Other}>Other</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a triage type.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicText" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Dcotor name"
                            value={doctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the doctor's name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicText" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicText" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Diagnostic"
                            value={diagnostic}
                            onChange={(e) => setDiagnostic(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the patient's diagnostic.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicText" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Pathology"
                            value={pathology}
                            onChange={(e) => setPathology(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the patient's pathology.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicStatus" className="item-create-user">
                        <Form.Label>Triage Type</Form.Label>
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value as TriageType)}>
                            <option value={TriageType.Urgent}>Urgent</option>
                            <option value={TriageType.NonUrgent}>Non-Urgent</option>
                            <option value={TriageType.Emergency}>Emergency</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a triage type.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicText" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the patient's notes.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button id="login-btn" type="submit">Create user</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateMedicalRecord;