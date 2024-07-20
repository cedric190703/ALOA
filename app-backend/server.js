import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import records from "./src/routes/record.js";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5050;
const uri = process.env.ATLAS_URI;

const app = express();

// CORS policy
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// cookieParser manages cookie-based sessions or extracts data from cookies
app.use(cookieParser());

app.use(express.json());

// Route used by the application backend
app.use("/record", records);

mongoose.connect(uri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
