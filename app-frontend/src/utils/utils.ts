export enum ItemNav {
    Home = 'home',
    User = 'user',
    Patients = 'patients',
    Calendar = 'calendar',
    Create = 'create',
    Settings = 'settings'
}

export enum TriageType {
    Urgent = 'urgent',
    NonUrgent = 'nonUrgent',
    Emergency = 'emergency'
}

export enum SettingsType {
    Light = "light",
    Logout = "logout",
    Security = "security",
    AboutUs = "aboutus",
}

export enum GenderType {
    Male = "male",
    Female = "female",
    Other = "other"
}

// Basic sanitization function to remove any HTML tags from input
export const sanitizeInput = (input: string) => {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export interface User {
    _id: string;
    email: string;
    username: string;
    doctor: boolean;
    createdAt: string;
}

export interface Patient {
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

export interface Appointments {
    patient_name: string;
    appointmentDate: Date;
    appointmentTime: String;
    reason: String;
    status: String;
    createdAt: Date;
}

// Get triage type string
export const getTriageType = (triage: string) => {
    switch (triage) {
        case 'urgent':
            return "Urgent";
        case 'nonUrgent':
            return "Non urgent";
        default:
            return "Emergency";
    }
}