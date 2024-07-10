import mongoose from 'mongoose';

const MedicalSchema = new mongoose.Schema({
    patient_name: {
        type: String,
        required: true,
    },
    patient_age: {
        type: Number,
        required: true,
    },
    diagnosis: {
        type: String,
        required: true,
    },
    doctor_name: {
        type: String,
        required: true,
    },
    pathology: {
        type: [String],
    },
    date_recorded: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
    },
});

// Create a model from the schema
const MedicalRecord = mongoose.model('MedicalRecord', MedicalSchema);

export default MedicalRecord;