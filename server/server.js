import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import ConnectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';

const app = express();
const PORT = process.env.PORT || 4000;
 await connectDB(); // Connect to the database
 await ConnectCloudinary(); // Connect to Cloudinary


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
app.use('/api/user', userRouter); // Use the user router for user-related routes
app.use('/api/seller', sellerRouter); // Use the seller router for seller-related routes
app.use('/api/product', productRouter); // Use the product router for product-related routes
app.use('/api/cart', cartRouter); // Use the cart router for cart-related routes
app.use('/api/address', addressRouter); // Use the address router for address-related routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});