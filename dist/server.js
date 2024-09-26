import express from 'express';
import beeperRoutes from './rout';
const app = express();
app.use(express.json());
app.use('/api', beeperRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
