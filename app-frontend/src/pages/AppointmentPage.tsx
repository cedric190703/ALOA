import React, { useState } from 'react';
import { ItemNav } from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";
import CalendarInfo from '../organisms/CalendarInfo.tsx';
import { useUser } from '../context/UserContext.tsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/appointments.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Appointment {
    patient_name: string;
    appointmentDate: Date;
    appointmentTime: String;
    reason: String;
    status: String;
    createdAt: Date;
}

function AppointmentPage() {
    const [value, setValue] = useState<Value>(new Date());
    const { appointments } = useUser();

    const handleDateChange = (selectedDate: Value) => {
        setValue(selectedDate);
    };

    const filteredAppointments = appointments.filter((appointment: Appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate);
        const selectedDate = new Date(value as Date);
        return (
            appointmentDate.getDate() === selectedDate.getDate()
        );
    });

    const appointmentDates = appointments.map((appointment: Appointment) => {
        const date = new Date(appointment.appointmentDate);
        return date.toISOString().split('T')[0];
    });

    const tileClassName = ({ date, view }) => {
        if (view !== 'month') return '';
        const dateString = date.toISOString().split('T')[0];
        if (appointmentDates.includes(dateString)) {
            return 'has-appointment';
        }
        return '';
    };

    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    document.body.style.backgroundColor = dark ? "#000000" : "#FFFFFF";

    return (
        <div style={{backgroundColor: dark ? 'black' : 'white'}}>
            <Sidebar items={ItemNav.Calendar}/>
            <div className="calendar-container" style={{padding: '20px'}}>
                <h2 style={{color: dark ? 'white' : 'black'}}>Appointment</h2>
                <Calendar
                    onChange={handleDateChange}
                    value={value}
                    tileClassName={tileClassName}/>
                <CalendarInfo appointments={filteredAppointments}/>
            </div>
        </div>
    );
}

export default AppointmentPage;