// Import necessary packages
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import router from './routes/productRoutes.js' // Import product routes

dotenv.config(); // Load environment variables from .env file

const app = express(); // Create an Express app instance
const PORT = process.env.PORT || 4000 // Set port from env or default to 4000
const uri = process.env.MONGODB_URL //// MongoDB connection string from .env

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount product routes under /api/products
app.use('/api/products', router)

// Connect to MongoDB
mongoose.connect(uri)
.then(() => console.log("Connected to Zenith DB"))
.catch((e) => console.log("Unable to connect to Zenith DB"));

// Root route
app.get('/', (req,res) => {
    res.status(201).json("Zenith API")
})

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`))