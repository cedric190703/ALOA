import Table from 'react-bootstrap/Table';
import '../styles/appointments.css';

function CalendarInfo() {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today  = new Date();

    return (
        <div className="calendar-info-container">
            <h2>Calendar Info</h2>
            <div className="calendar-info">
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Patient name</th>
                        <th>Doctor name</th>
                        <th>Reason</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{today.toLocaleDateString("en-US", options)}</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>Test</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default CalendarInfo;