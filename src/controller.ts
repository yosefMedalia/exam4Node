// controllers/beeperController.ts
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { createBeeper, getAllBeepers, findBeeperById,  deleteBeeper } from './dal';
// updateBeeperStatus,
//לטפל בפונקציה של עדכון
import { Beeper } from '../models/beeper';

// יצירת ביפר חדש
export const createNewBeeper = (req: Request, res: Response) => {
    const newBeeper: Beeper = {
        id: uuidv4(),
        name: req.body.name,
        status: 'manufactured',
        created_at: new Date(),
    };
    createBeeper(newBeeper);
    res.status(201).json(newBeeper);
};

// קבלת כל הביפרים
export const getBeepers = (req: Request, res: Response) => {
    const beepers = getAllBeepers();
    res.status(200).json(beepers);
};

// קבלת ביפר לפי ID
export const getBeeperById = (req: Request, res: Response) => {
    const beeper = findBeeperById(req.params.id);
    if (beeper) {
        res.status(200).json(beeper);
    } else {
        res.status(404).json({ message: 'Beeper not found' });
    }
};

// עדכון סטטוס של ביפר
// export const updateBeeper = (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { status, latitude, longitude } = req.body;

//     if (status === 'deployed' && (!latitude || !longitude)) {
//         return res.status(400).json({ message: 'Latitude and Longitude are required for deployment.' });
//     }

//     updateBeeperStatus(id, status, latitude, longitude);
//     res.status(200).json({ message: 'Beeper status updated' });
// };

// מחיקת ביפר
export const deleteBeeperById = (req: Request, res: Response) => {
    const { id } = req.params;
    deleteBeeper(id);
    res.status(200).json({ message: 'Beeper deleted' });
};
