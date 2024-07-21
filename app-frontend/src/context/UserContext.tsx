import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

// Define a TypeScript interface for user data
interface User {
    _id: string;
    email: string;
    username: string;
    doctor: boolean;
    createdAt: string;
}

interface Patient {
    patient_name: string;
    patient_gender: boolean;
    patient_age: number;
    diagnosis: string;
    doctor: string;
    pathology: string[];
    date_recorded: Date;
    patient_triage: string;
    notes?: string;
    uniqueId?: string; // Optional unique ID for patients
}

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    users: Patient[];
    setUsers: React.Dispatch<React.SetStateAction<Patient[]>>;
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

    // Fetch user information
    const fetchUserInfo = async () => {
        try {
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

    useEffect(() => {
        fetchUserInfo();
        fetchUsersInfo();
    }, []);

    return <UserContext.Provider value={{ user, setUser, users, setUsers }}>{children}</UserContext.Provider>;
};