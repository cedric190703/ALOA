import mongoose from 'mongoose';

const MedicalSchema = new mongoose.Schema({
    patient_name: {
        type: String,
        required: true,
    },
    patient_gender: {
        type: Boolean,
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
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pathology: {
        type: [String],
    },
    date_recorded: {
        type: Date,
        default: Date.now,
    },
    patient_triage: {
        type: String,
        enum: ['urgent', 'nonUrgent', 'emergency'],
        default: 'urgent',
    },
    notes: {
        type: String,
    },
});

const MedicalRecord = mongoose.model('MedicalRecord', MedicalSchema);

export default MedicalRecord;