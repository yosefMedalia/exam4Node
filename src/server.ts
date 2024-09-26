import express from 'express';
import routes from './rout.js';

const app = express();
app.use(express.json());

app.use('/api', routes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
