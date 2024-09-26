// routes/beeperRoutes.ts
import express from 'express';
import { createNewBeeperr, getBeepers, updateBeeperStatus, deleteBeeperById, getBeepers1 } from './controller.js';
const router = express.Router();
router.post('/beepers', createNewBeeperr);
router.get('/', getBeepers1);
router.get('/beepers', getBeepers);
router.put('/beepers/:id/status', updateBeeperStatus);
router.delete('/beepers/:id', deleteBeeperById);
export default router;
