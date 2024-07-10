import express from "express";
import MedicalRecord from '../models/medical_record.js';

const router = express.Router();

router.get("/test", async (req, res) => {
  res.send("Testing route");
});

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    const records = await MedicalRecord.find();
    res.json(records);
  } catch (err) {
    res.status(404).json({ message: 'No records found' });
  }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).send("Not found");
    }
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send("Error fetching record");
  }
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    let newRecord = new MedicalRecord({
      patient_name: req.body.patient_name,
      patient_age: req.body.patient_age,
      diagnosis: req.body.diagnosis,
      doctor_name: req.body.doctor_name,
      pathology: req.body.pathology,
      notes: req.body.notes,
    });
    const result = await newRecord.save();
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const updates = {
      patient_name: req.body.patient_name,
      patient_age: req.body.patient_age,
      diagnosis: req.body.diagnosis,
      doctor_name: req.body.doctor_name,
      pathology: req.body.pathology,
      notes: req.body.notes,
    };

    const record = await MedicalRecord.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!record) {
      return res.status(404).send("No records found");
    }
    res.status(200).send(record);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  try {
    const record = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).send("No records found");
    }
    res.status(200).send(record);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;