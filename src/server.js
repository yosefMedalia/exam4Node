// server.ts
import express from 'express';
import beeperRoutes from './routes/beeperRoutes';

const app = express();
app.use(express.json());

app.use('/api', beeperRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
