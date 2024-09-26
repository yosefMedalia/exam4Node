var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllBeepers, saveBeepers, findBeeperById, deleteBeeper } from './dal.js';
import { v4 as uuidv4 } from 'uuid';
import { isCoordinateInLebanon } from '../utils/coordinate.js';
const beeperFilePath = './beepers.json';
// יצירה חדשה
export const createNewBeeperr = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newBeeper = yield createBeeper(name);
        res.status(201).json(newBeeper);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating beeper', error });
    }
});
// פונקציה ליצירת ביפר חדש
export const createBeeper = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getAllBeepers();
        const newBeeper = {
            id: uuidv4(),
            name,
            status: 'manufactured',
            createdAt: new Date(),
            detonatedAt: null,
            latitude: null,
            longitude: null,
        };
        beepers.push(newBeeper);
        yield saveBeepers(beepers);
        return newBeeper;
    }
    catch (error) {
        throw new Error('Error saving new beeper');
    }
});
// קריאה לכל הביפרים
export const getBeepers1 = (req, res) => {
    let data = "בדיקה";
    res.status(200).json(data);
};
// קריאה לכל הביפרים - גרסה ראשית
export const getBeepers = (req, res) => {
    try {
        const beepers = getAllBeepers();
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving beepers', error });
    }
};
// לעדכן את הסטטוס
export const updateBeeperStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating beeper', error });
    }
});
// מחיקה לפי id
export const deleteBeeperById = (req, res) => {
    const { id } = req.params;
    try {
        deleteBeeper(id);
        res.status(200).json({ message: 'Beeper deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting beeper', error });
    }
};
