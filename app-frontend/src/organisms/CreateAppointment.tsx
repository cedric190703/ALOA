import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Appointments, TriageType} from '../utils/utils.ts';
import React, {useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from "../context/UserContext.tsx";
import 'react-toastify/dist/ReactToastify.css';
import '../styles/create.css';

function CreateAppointment() {
    const { appointments, setAppointments } = useUser();
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [reason, setReason] = useState('');
    const [status, setStatus] = useState<TriageType>(TriageType.NonUrgent);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState('');

    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    document.body.style.backgroundColor = dark ? "#000000" : "#FFFFFF";

    const showToastSucceed = () => {
        toast.success("Succeed to create a new appointment", {
            position: "top-center"
        });
    };

    const showToastFailed = () => {
        toast.success("Fail to create a new appointment", {
            position: "top-center"
        });
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const timeString = e.target.value;
        const [hour, minute] = timeString.split(':');
        const newTime = new Date();
        newTime.setHours(parseInt(hour, 10));
        newTime.setMinutes(parseInt(minute, 10));
        setTime(newTime);
    };

    const handleCreateAppointment = async (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            try {
                const response = await axios.post('http://localhost:5050/record/appointments/create', {
                    patient: patientName,
                    appointmentDate: date,
                    appointmentTime: time,
                    reason: reason,
                    status: status.toString()
                }, {
                    withCredentials: true,
                });

                if (response.status === 201) {
                    const app : Appointments = {
                        patient_name: patientName,
                        appointmentDate: date,
                        appointmentTime: time,
                        reason: reason,
                        status: status.toString(),
                        createdAt: Date.now(),
                    };
                    setAppointments([...appointments, app]);
                    setError('');
                    showToastSucceed();
                } else {
                    setError(response.data.message);
                    console.log(error);
                    showToastFailed();
                }
            } catch (error) {
                showToastFailed();
                console.error(error);
                setError('Signup failed. Please try again.');
            }
        }
        setValidated(true);
    };

    return (
        <div className="create-user-container" style={{ color : dark ? 'white' : 'black' }}>
            <h1 className="create-user-title">Create an Appointment</h1>
            <div className="create-user-form">
                <Form noValidate validated={validated} onSubmit={handleCreateAppointment}>
                    <ToastContainer />
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

                    <Form.Group controlId="formBasicTime" className="item-create-user">
                        <Form.Label>Appointment Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={time ? time.toTimeString().split(' ')[0] : ''}
                            onChange={handleTimeChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter the time of the appointment.
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
                    {error && <p className="error-message">{error}</p>}
                    <Button id="login-btn" type="submit">Create Appointment</Button>
                </Form>
            </div>
        </div>
    )
}

export default CreateAppointment;