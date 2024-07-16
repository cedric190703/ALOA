import { useState } from 'react';
import { ItemNav } from "../utils/utils.ts";
import Sidebar from "../organisms/SideBar.tsx";
import CalendarInfo from '../organisms/CalendarInfo.tsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/appointments.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function AppointmentPage() {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <>
            <Sidebar items={ItemNav.Calendar} />
            <div className="calendar-container" style={{ padding: '20px' }}>
                <h2>Appointment</h2>
                <Calendar onChange={onChange} value={value} />
                <CalendarInfo />
            </div>
        </>
    );
}

export default AppointmentPage;