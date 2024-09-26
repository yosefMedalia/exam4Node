// routes/beeperRoutes.ts
import express from 'express';
import { createNewBeeper, getBeepers, updateBeeperStatus, deleteBeeperById } from './controller';
const router = express.Router();
router.post('/beepers', createNewBeeper);
router.get('/beepers', getBeepers);
router.put('/beepers/:id/status', updateBeeperStatus);
router.delete('/beepers/:id', deleteBeeperById);
export default router;
