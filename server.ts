import express from 'express';
import { connectToDB } from './src/db';
import authRoutes from './src/routes/auth';

import resturantRoutes from './src/routes/resturant';


const config = require('config')



const app = express();
const PORT = process.env.port || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resturant', resturantRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToDB();
});
