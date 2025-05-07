import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import urlRouter from './routes/url.routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/url', urlRouter);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.listen(PORT, async() => {
    try {
        await connectDB;
        console.log('Connected to Database');
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
});