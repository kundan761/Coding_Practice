import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import githubRouter from './routes/github.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use('/githubDetails', githubRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});