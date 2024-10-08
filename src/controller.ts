import { Request, Response } from 'express';
import { getAllBeepers, saveBeepers, findBeeperById, deleteBeeper } from './dal.js';
import { v4 as uuidv4 } from 'uuid';
import { isCoordinateInLebanon } from '../utils/coordinate.js';
import Beeper from './models/beeper.js';
import fs from 'fs';
import path from 'path';

const beeperFilePath =  './beepers.json';

// יצירה חדשה
export const createNewBeeperr = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newBeeper = await createBeeper(name);
        res.status(201).json(newBeeper);
    } catch (error) {
        res.status(500).json({ message: 'Error creating beeper', error });
    }
};

// פונקציה ליצירת ביפר חדש
export const createBeeper = async (name: string): Promise<Beeper> => {
    try {
        const beepers = await getAllBeepers();
        const newBeeper: Beeper = {
            id: uuidv4(),
            name,
            status: 'manufactured',
            createdAt: new Date(),
            detonatedAt: null,
            latitude: null,
            longitude: null,
        };
        beepers.push(newBeeper);
        await saveBeepers(beepers);
        return newBeeper;
    } catch (error) {
        throw new Error('Error saving new beeper');
    }
};

// קריאה לכל הביפרים
export const getBeepers1 = (req: Request, res: Response) => {
    let data = "בדיקה";
    res.status(200).json(data);
};

// קריאה לכל הביפרים - גרסה ראשית
export const getBeepers = (req: Request, res: Response) => {
    try {
        const beepers = getAllBeepers();
        res.status(200).json(beepers);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving beepers', error });
    }
};

// לעדכן את הסטטוס
export const updateBeeperStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status, latitude, longitude } = req.body;

    try {
        const beeper = findBeeperById(id);
        if (!beeper) {
            res.status(404).json({ message: 'Beeper not found' });
            return;
        }

        // החלפת הסטטוס
        if (status === 'deployed') {
            if (!latitude || !longitude) {
                res.status(400).json({ message: 'Coordinates required for deployment.' });
                return;
            }
            if (!isCoordinateInLebanon(latitude, longitude)) {
                res.status(400).json({ message: 'Invalid coordinates: must be in Lebanon.' });
                return;
            }

            beeper.latitude = latitude;
            beeper.longitude = longitude;

            // תחילת הטיימר
            setTimeout(() => {
                beeper.status = 'detonated';
                beeper.detonatedAt = new Date();
                saveBeepers(getAllBeepers());
            }, 10000);
        }

        beeper.status = status;
        saveBeepers(getAllBeepers());
        res.status(200).json(beeper);
    } catch (error) {
        res.status(500).json({ message: 'Error updating beeper', error });
    }
};

// מחיקה לפי id
export const deleteBeeperById = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        deleteBeeper(id);
        res.status(200).json({ message: 'Beeper deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting beeper', error });
    }
};
