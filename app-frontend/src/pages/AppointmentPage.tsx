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
        const currentDate = new Date(appointment.appointmentDate);
        currentDate.setHours(0,0,0,0);

        const appointmentTime = new Date(appointment.appointmentTime);
        const hours = appointmentTime.getHours();
        const minutes = appointmentTime.getMinutes();
        const seconds = appointmentTime.getSeconds();

        // Combine the date and time
        const startDate = new Date(currentDate);
        startDate.setHours(hours, minutes, seconds, 0);

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

    // Function to customize event styles based on the theme or any other criteria
    const eventStyleGetter = () => {
        const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
        const backgroundColor = dark ? '#555' : '#007bff'; // Dark and light theme colors
        const color = dark ? 'white' : 'black'; // Text color based on theme

        return {
            style: {
                backgroundColor: backgroundColor,
                color: color,
                borderRadius: '0px',
                opacity: 0.8,
                border: 'none',
                display: 'block'
            }
        };
    };

    const handleEventClick = (event: any) => {
        console.log(event);
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
                    eventPropGetter={eventStyleGetter}
                    style={{ height: 500, color: dark ? 'white' : 'black' }}
                />
                <CalendarInfo appointments={selectedEvent ? [selectedEvent] : []}/>
            </div>
        </div>
    );
}

export default AppointmentPage;