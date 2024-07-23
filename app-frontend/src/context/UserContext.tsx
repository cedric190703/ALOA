import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {Appointments, Patient, User} from "../utils/utils.ts";

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    users: Patient[];
    setUsers: React.Dispatch<React.SetStateAction<Patient[]>>;
    appointments: Appointments[];
    setAppointments: React.Dispatch<React.SetStateAction<Appointments[]>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<Patient[]>([]);
    const [appointments, setAppointments] = useState<Appointments[]>([]);

    // Fetch user information
    const fetchUserInfo = async () => {
        try {
            console.log('Call the context');

            const userId = localStorage.getItem("userId");
            if (userId) {
                const response = await axios.get(`http://localhost:5050/record/user/${userId}`, { withCredentials: true });
                setUser(response.data);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    // Fetch list of patients and assign unique IDs
    const fetchUsersInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5050/record/users`, { withCredentials: true });
            const patientsWithIds = response.data.map((patient: Patient) => ({
                ...patient,
                uniqueId: uuidv4() // Add a unique ID to each patient
            }));
            setUsers(patientsWithIds);
        } catch (error) {
            console.error("Error fetching users info:", error);
        }
    };

    // Fetch list of appointments and assign unique IDs
    const fetchAppointmentsInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5050/record/appointments`, { withCredentials: true });
            const appointments = response.data.map((app: Patient) => ({
                ...app,
                uniqueId: uuidv4() // Add a unique ID to each patient
            }));
            setAppointments(appointments);
        } catch (error) {
            console.error("Error fetching users info:", error);
        }
    };

    useEffect(() => {
        if (user === null) {
            fetchUserInfo();
            fetchUsersInfo();
            fetchAppointmentsInfo();
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, users, setUsers, appointments, setAppointments }}>
            {children}
        </UserContext.Provider>
    );
};