import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {TriageType} from '../utils/utils.ts';
import {useState} from "react";
import '../styles/create.css';

function CreateAppointment() {
    const [patientName, setPatientName] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState<TriageType>(TriageType.NonUrgent);
    const [validated, setValidated] = useState(false);

    const handleCreateAppointment = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            // TODO: connect to the backend : create an appointment
        }
        setValidated(true);
    };

    return (
        <div className="create-user-container">
            <h1 className="create-user-title">Create an Appointment</h1>
            <div className="create-user-form">
                <Form noValidate validated={validated} onSubmit={handleCreateAppointment}>

                    <Form.Group controlId="formBasicText" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Name patient"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the name of the patient.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicText" className="item-create-user">
                        <Form.Label>Doctor's Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Doctor's name"
                            value={doctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the name of the doctor.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicText" className="item-create-user">
                        <Form.Control
                            type="text"
                            placeholder="Reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the reason of this appointment.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicDate" className="item-create-user">
                        <Form.Label>Appointment Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date ? date.toISOString().split('T')[0] : ''}
                            onChange={(e) => setDate(new Date(e.target.value))}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the date of the appointment.
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

                    <Button id="login-btn" type="submit">Create Appointment</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateAppointment;