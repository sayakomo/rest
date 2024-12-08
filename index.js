import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import route from "./src/routes/routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const mongoURI = process.env.DB_URL;
const port = process.env.PORT || 3000;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/', route);

app.listen(port, () => console.log(`Server Running at port: ${port}`));