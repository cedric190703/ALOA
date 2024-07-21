import React from 'react';
import Sidebar from '../organisms/SideBar';
import { ItemNav } from '../utils/utils.ts';
import '../styles/home.css';

const HomePage: React.FC = () => {
    const dark: boolean = JSON.parse(localStorage.getItem('dark') || 'false');
    document.body.style.backgroundColor = dark ? "#000000" : "#FFFFFF";

    return (
        <div className="home-page-container" style={{ backgroundColor: dark ? 'black' : 'white', color: dark ? 'white' : 'black' }}>
            <Sidebar items={ItemNav.Home} />
            <div className="main-content">
                <h1  style={{ color: dark ? 'white' : 'black' }}>Welcome to Aloa</h1>
                <p>
                    This Electronic Health Record (EHR) system is designed to streamline the management of patient records, appointments, and other crucial information for healthcare providers. Here’s a brief overview of what you’ll find in this application:
                </p>

                <h2>Home Page</h2>
                <p>The Home Page serves as the main dashboard, giving you a quick overview of your activities and navigation to other sections.</p>

                <h2>User Info Page</h2>
                <p>Here you can view and manage your personal and professional information.</p>

                <h2>Patients Page</h2>
                <p>Access and manage patient records and information if your are a doctor.</p>

                <h2>Calendar Page</h2>
                <p>Manage and view your appointments as a doctor.</p>

                <h2>Settings Page</h2>
                <p>Customize various settings for the EHR system according to your preferences.</p>

                <h2>Create Patients and Appointments</h2>
                <p>Add new patient records and schedule appointments efficiently.</p>
            </div>
        </div>
    );
}

export default HomePage;
