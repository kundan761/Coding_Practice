import expreess from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

const server = expreess();
const PORT = process.env.PORT || 5000;
server.use(cors());
server.use(expreess.json());

server.get('/', (req, res) => {
  res.send('Server is listening...');
});

server.listen(PORT, async() => {
    try {
        await connectDB;
        console.log('MongoDB connected...');
        console.log(`Server is running on http://localhost:${PORT}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
});