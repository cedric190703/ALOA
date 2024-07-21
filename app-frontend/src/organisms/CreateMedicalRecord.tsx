import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {GenderType, Patient, TriageType} from "../utils/utils.ts";
import { useUser } from '../context/UserContext.tsx';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/create.css';
import { v4 as uuidv4 } from 'uuid';

function CreateMedicalRecord() {
    const { users, setUsers } = useUser();
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState<GenderType>(GenderType.Male);
    const [diagnostic, setDiagnostic] = useState('');
    const [pathology, setPathology] = useState('');
    const [status, setStatus] = useState<TriageType>(TriageType.NonUrgent);
    const [notes, setNotes] = useState('');
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');

    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    document.body.style.backgroundColor = dark ? "#000000" : "#FFFFFF";

    const showToastSucceed = () => {
        toast.success("Successfully created a new medical record", {
            position: "top-center"
        });
    };

    const showToastFailed = () => {
        toast.error("Failed to create a new medical record", {
            position: "top-center"
        });
    };

    const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();
        } else {
            try {
                const response = await axios.post('http://localhost:5050/record/user/create', {
                    patient_name: name,
                    patient_age: parseInt(age),
                    patient_gender: gender === GenderType.Male,
                    diagnosis: diagnostic,
                    pathology: pathology.split(',').map(item => item.trim()),
                    patient_triage: status,
                    notes: notes
                }, {
                    withCredentials: true,
                });

                if (response.status === 201) {
                    setError('');
                    const elt : Patient = {
                        patient_name: name,
                        doctor: false,
                        date_recorded: Date.now(),
                        patient_age: parseInt(age),
                        patient_gender: gender === GenderType.Male,
                        diagnosis: diagnostic,
                        pathology: pathology.split(',').map(item => item.trim()),
                        patient_triage: status,
                        notes: notes,
                        uniqueId: uuidv4() // Add a unique ID to the new patient
                    };

                    setUsers([...users, elt]);
                    showToastSucceed();
                } else {
                    showToastFailed();
                    setError(response.data.message || "Failed to create a new medical record");
                }
            } catch (error) {
                console.error(error);
                showToastFailed();
                setError('Failed to create a new medical record. Please try again.');
            }
        }
        setValidated(true);
    };

    return (
        <div className="create-user-container" style={{ backgroundColor: dark ? 'black' : 'white', color: dark ? 'white' : 'black' }}>
            <h1 className="create-user-title">Create Medical Record</h1>
            <div className="create-user-form">
                <ToastContainer />
                <Form noValidate validated={validated} onSubmit={handleCreateUser}>
                    <Form.Group controlId="formBasicName" className="item-create-user">
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

                    <Form.Group controlId="formBasicGender" className="item-create-user">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select value={gender} onChange={(e) => setGender(e.target.value as GenderType)} required>
                            <option value={GenderType.Male}>Male</option>
                            <option value={GenderType.Female}>Female</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a gender.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicAge" className="item-create-user">
                        <Form.Control
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter a valid age.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicDiagnostic" className="item-create-user">
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

                    <Form.Group controlId="formBasicPathology" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Pathology (comma separated)"
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
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value as TriageType)} required>
                            <option value={TriageType.Urgent}>Urgent</option>
                            <option value={TriageType.NonUrgent}>Non-Urgent</option>
                            <option value={TriageType.Emergency}>Emergency</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a triage type.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicNotes" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter any notes.
                        </Form.Control.Feedback>
                    </Form.Group>

                    {error && <p className="error-message">{error}</p>}

                    <Button id="login-btn" type="submit">Create Record</Button>
                </Form>
            </div>
        </div>
    );
}

export default CreateMedicalRecord;
