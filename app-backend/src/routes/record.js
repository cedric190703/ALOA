import express from "express";
import User from '../models/user_model.js';
import MedicalRecord from '../models/medical_record.js';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createSecretToken } from '../utils/secret_token.js';

dotenv.config();

const router = express.Router();

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
      doctor });
    
    const token = createSecretToken(user._id);

    // Create a token in the cookies
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });

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
      return res.status(404).json({ message: "Incorrect password or email from the email test" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password or email from the password test" });
    }

    // Generate JWT token
    const token = createSecretToken(user._id);

    // Set the token as a cookie
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res.status(201).json({ message: "User logged in successfully", success: true });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Middleware to verify JWT token
// Check if the user has access to the route by checking the token's match
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

// Protected route - Example
router.get("/secure-route", authMiddleware, (req, res) => {
  res.send("Access granted");
});

// Routes for managing medical records
router.get("/", authMiddleware, async (req, res) => {
  try {
    const records = await MedicalRecord.find();
    res.json(records);
  } catch (err) {
    res.status(404).json({ message: 'No records found' });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
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

router.post("/", authMiddleware, async (req, res) => {
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

router.patch("/:id", authMiddleware, async (req, res) => {
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

router.delete("/:id", authMiddleware, async (req, res) => {
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
