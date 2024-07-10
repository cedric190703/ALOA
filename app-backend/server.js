import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import records from "./src/routes/record.js";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5050;
const uri = process.env.ATLAS_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
