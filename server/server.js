import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';

const app = express();
const PORT = process.env.PORT || 4000;
 await connectDB(); // Connect to the database


// Allow multiple origin
const allowedOrigins = [
  'http://localhost:5173', // Adjust this to your frontend URL
  ]

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins, // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent
}));



app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});