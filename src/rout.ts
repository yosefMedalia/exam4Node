import express from 'express';
import { createNewBeeper, getBeepers, getBeeperById, updateBeeper, deleteBeeperById } from './controller';

const router = express.Router();

router.post('/beepers', createNewBeeper);
router.get('/beepers', getBeepers);
router.get('/beepers/:id', getBeeperById);
router.put('/beepers/:id/status', updateBeeper);
router.delete('/beepers/:id', deleteBeeperById);

export default router;
