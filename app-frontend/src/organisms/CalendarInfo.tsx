import React from "react";
import Table from 'react-bootstrap/Table';
import { Appointments } from '../utils/utils';
import '../styles/appointments.css';

interface CalendarInfoProps {
    appointments: Appointments[];
}

const CalendarInfo : React.FC<CalendarInfoProps> = ({ appointments }) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    const getReason = (reason : string) => {
        switch (reason) {
            case 'urgent':
                return 'Urgent';
            case 'nonUrgent':
                return 'Non Urgent';
            default:
                return 'emergency';
        }
    }

    return (
        <div className="calendar-info-container">
            <h2 style={{ color : dark ? 'white' : 'black' }}>Calendar Info</h2>
            <div className="calendar-info">
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Patient name</th>
                        <th>Status</th>
                        <th>Reason</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((app, index) => (
                        <tr key={index}>
                            <td>{new Date(app.appointmentDate).toLocaleDateString("en-US", options)}</td>
                            <td>{app.patient_name}</td>
                            <td>{getReason(app.status)}</td>
                            <td>{app.reason}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CalendarInfo;