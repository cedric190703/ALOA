import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Patient reference is required"]
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Doctor reference is required"],
    },
    appointmentDate: {
        type: Date,
        required: [true, "Appointment date is required"],
    },
    appointmentTime: {
        type: String,
        required: [true, "Appointment time is required"],
    },
    reason: {
        type: String,
        required: [true, "Reason for appointment is required"],
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create a model from the schema
const AppointmentRecord = mongoose.model("Appointment", appointmentSchema);

export default AppointmentRecord;