import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import infoRoutes from "./routes/infoRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import https from 'https'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config();



const PORT = process.env.PORT || 9000;
connectDB();

app.use(cors());
// app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is Running..");
});

// Routes
app.use("/api/auth", authRoutes);  
app.use("/api/info", infoRoutes);
app.use("/api/transaction", transactionRoutes);

const server = https.createServer(
  {
    key: fs.readFileSync(`${__dirname}/.cert/key.pem`, 'utf8'),
    cert: fs.readFileSync(`${__dirname}/.cert/cert.pem`, 'utf8'),
  },
  app
)


server.listen(PORT, () => {
  console.log(`APi is Running on https://localhost:${PORT}`);
});
