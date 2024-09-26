import { getAllBeepers, saveBeepers, findBeeperById, deleteBeeper } from './dal';
import { v4 as uuidv4 } from 'uuid';
import { isCoordinateInLebanon } from '../utils/coordinate';
// יצירה של ביפר חדש
export const createNewBeeper = (req, res) => {
    const newBeeper = {
        id: uuidv4(),
        name: req.body.name,
        status: 'manufactured',
        createdAt: new Date(),
        detonatedAt: null,
        latitude: null,
        longitude: null,
    };
    const beepers = getAllBeepers();
    beepers.push(newBeeper);
    saveBeepers(beepers);
    res.status(201).json(newBeeper);
};
// קריאה לכל הביפרים
export const getBeepers = (req, res) => {
    const beepers = getAllBeepers();
    res.status(200).json(beepers);
};
// לעדכן את הסטטוס
export const updateBeeperStatus = (req, res) => {
    const { id } = req.params;
    const { status, latitude, longitude } = req.body;
    const beeper = findBeeperById(id);
    if (!beeper) {
        return res.status(404).json({ message: 'Beeper not found' });
    }
    // החלפת הסטטוס
    if (status === 'deployed') {
        if (!latitude || !longitude) {
            return res.status(400).json({ message: 'Coordinates required for deployment.' });
        }
        if (!isCoordinateInLebanon(latitude, longitude)) {
            return res.status(400).json({ message: 'Invalid coordinates: must be in Lebanon.' });
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
};
// מחיקה לפי id
export const deleteBeeperById = (req, res) => {
    const { id } = req.params;
    deleteBeeper(id);
    res.status(200).json({ message: 'Beeper deleted' });
};
