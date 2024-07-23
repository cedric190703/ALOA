import React, { useState } from 'react';
import { ItemNav } from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";
import CalendarInfo from '../organisms/CalendarInfo.tsx';
import { useUser } from '../context/UserContext.tsx';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import '../styles/appointments.css';

const localizer = momentLocalizer(moment);

interface Appointment {
    patient_name: string;
    appointmentDate: Date;
    appointmentTime: string;
    reason: string;
    status: string;
    createdAt: Date;
}

// Helper function to add minutes to a date
const addMinutes = (date: Date, minutes: number) => {
    return new Date(date.getTime() + minutes * 60000);
};

function AppointmentPage() {
    const [selectedEvent, setSelectedEvent] = useState<Appointment | null>(null);
    const { appointments } = useUser();

    const events = appointments.map((appointment: Appointment) => {
        // Combine appointmentDate and appointmentTime to create the start date
        const startDate = new Date(appointment.appointmentTime);

        // Calculate the end date by adding 30 minutes
        const endDate = addMinutes(startDate, 45);

        return {
            title: appointment.reason,
            start: startDate,
            end: endDate,
            allDay: false,
            ...appointment
        };
    });

    const handleEventClick = (event: any) => {
        setSelectedEvent(event);
    };

    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    document.body.style.backgroundColor = dark ? "#000000" : "#FFFFFF";

    return (
        <div style={{backgroundColor: dark ? 'black' : 'white'}}>
            <Sidebar items={ItemNav.Calendar}/>
            <div className="calendar-container" style={{padding: '20px'}}>
                <h2 style={{color: dark ? 'white' : 'black'}}>Appointments</h2>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleEventClick}
                    style={{ height: 500 }}
                />
                <CalendarInfo appointments={selectedEvent ? [selectedEvent] : []}/>
            </div>
        </div>
    );
}

export default AppointmentPage;