import express from 'express';
import rout from './rout';

const app = express();
app.use(express.json());

app.use('/api', rout);

// הפעלת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
