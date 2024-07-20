import express from "express";
import User from '../models/user_model.js';
import MedicalRecord from '../models/medical_record_model.js';
import AppointmentRecord from '../models/appointment_model.js';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createSecretToken } from '../utils/secret_token.js';

dotenv.config();

const router = express.Router();

// USER AUTHENTICATION ---------------------------------------------------------------------

// Authentication endpoint - Register
router.post("/register", async (req, res) => {
  const { email, username, password, doctor } = req.body;

  try {
    // Check if the user already exists
    let existing_user = await User.findOne({ email });
    if (existing_user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      username,
      doctor
    });

    const userToken = createSecretToken(user._id);

    // Create a token in the cookies
    res.cookie("token", userToken, {
      httpOnly: true, // Prevent JavaScript access
      secure: false,   // Ensure the cookie is sent only over HTTPS
      sameSite: 'Lax' // Mitigate CSRF attacks
    });

    res.status(201).json({ message: "User signed in successfully",
      success: true,
      token: userToken
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Authentication endpoint - Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Incorrect password or email" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password or email" });
    }

    // Generate JWT token
    const userToken = createSecretToken(user._id);

    // Create a token in the cookies
    res.cookie("token", userToken, {
      httpOnly: true, // Prevent JavaScript access
      secure: false,   // Ensure the cookie is sent only over HTTPS
      sameSite: 'Lax' // Mitigate CSRF attacks
    });

    res.status(201).json({ message: "User logged in successfully",
      success: true,
      token: userToken
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      const user = await User.findById(data.id);
      if (!user) {
        return res.status(401).json({ message: "Authorization denied" });
      }
      req.user = user; // Store user data in req
      next(); // Pass control to the next middleware
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// ---------------------------------------------------------------------

// Protected route - Example
router.get("/secure-route", authMiddleware, (req, res) => {
  res.send("Access granted");
});



// MEDICAL RECORD MANAGEMENT ---------------------------------------------------------------------

// Route for managing medical records from a specific doctor
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const records = await MedicalRecord.find({ doctor: req.user._id });
    res.json(records);
  } catch (err) {
    res.status(404).json({ message: 'No records found' });
  }
});

// Route to get a medical record from a specific user
router.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id).populate('doctor', 'email username');
    if (!record) {
      return res.status(404).send("Not found");
    }
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send("Error fetching record");
  }
});

// Route to create a user
router.post("/user/create", authMiddleware, async (req, res) => {
  try {
    let newRecord = new MedicalRecord({
      patient_name: req.body.patient_name,
      patient_age: req.body.patient_age,
      diagnosis: req.body.diagnosis,
      doctor: req.user._id,
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

// Route to update a user
router.patch("/user/update/:id", authMiddleware, async (req, res) => {
  try {
    const updates = {
      patient_name: req.body.patient_name,
      patient_age: req.body.patient_age,
      diagnosis: req.body.diagnosis,
      doctor: req.user._id,
      pathology: req.body.pathology,
      notes: req.body.notes,
    };

    const record = await MedicalRecord.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('doctor', 'email username');
    if (!record) {
      return res.status(404).send("No records found");
    }
    res.status(200).send(record);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Route to delete a user
router.delete("/user/:id", authMiddleware, async (req, res) => {
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

// ---------------------------------------------------------------------


// APPOINTMENTS RECORD MANAGEMENT ---------------------------------------------------------------------

// Route for managing appointment records from a specific doctor
router.get("/appointments", authMiddleware, async (req, res) => {
  try {
    const records = await AppointmentRecord.find({ doctor: req.user._id }).populate('patient', 'email username');
    res.json(records);
  } catch (err) {
    res.status(404).json({ message: 'No records found' });
  }
});

// Route to get an appointment record by ID
router.get("/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const record = await AppointmentRecord.findById(req.params.id).populate('doctor', 'email username').populate('patient', 'email username');
    if (!record) {
      return res.status(404).send("Not found");
    }
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send("Error fetching record");
  }
});

// Route to create an appointment
router.post("/appointments/create", authMiddleware, async (req, res) => {
  try {
    let newRecord = new AppointmentRecord({
      patient: req.body.patient,
      doctor: req.user._id,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      reason: req.body.reason,
      status: req.body.status
    });
    const result = await newRecord.save();
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Route to update an appointment
router.patch("/appointments/update/:id", authMiddleware, async (req, res) => {
  try {
    const updates = {
      patient: req.body.patient,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      reason: req.body.reason,
      status: req.body.status
    };

    const record = await AppointmentRecord.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('doctor', 'email username').populate('patient', 'email username');
    if (!record) {
      return res.status(404).send("No records found");
    }
    res.status(200).send(record);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Route to delete an appointment
router.delete("/appointments/:id", authMiddleware, async (req, res) => {
  try {
    const record = await AppointmentRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).send("No records found");
    }
    res.status(200).send(record);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

// ---------------------------------------------------------------------

export default router;