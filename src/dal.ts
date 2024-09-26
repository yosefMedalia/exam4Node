import fs from 'fs';
import path from 'path';
import {Beeper} from '../models/beeper';

const beeperFilePath = path.join(__dirname, '../data/beepers.json');

// משיכה של הכל
export const getAllBeepers = (): Beeper[] => {
    const beepersData = fs.readFileSync(beeperFilePath, 'utf-8');
    return JSON.parse(beepersData) as Beeper[];
};

// שמירה
export const saveBeepers = (beepers: Beeper[]): void => {
    fs.writeFileSync(beeperFilePath, JSON.stringify(beepers, null, 2));
};

// מציאת ביפר לפי ID
export const findBeeperById = (id: string): Beeper | undefined => {
    const beepers = getAllBeepers();
    return beepers.find(beeper => beeper.id === id);
};

// יצירת ביפר חדש
export const createBeeper = (newBeeper: Beeper): void => {
    const beepers = getAllBeepers();
    beepers.push(newBeeper);
    saveBeepers(beepers);
};

// עדכון סטטוס ביפר
// export const updateBeeperStatus = (id: string, status: string, latitude?: number, longitude?: number): void => {
//     const beepers = getAllBeepers();
//     const index = beepers.findIndex(beeper => beeper.id === id);

//     if (index !== -1) {
//         beepers[index].status = status;

//         if (status === 'deployed' && latitude && longitude) {
//             beepers[index].latitude = latitude;
//             beepers[index].longitude = longitude;

//             // טיימר לעדכון הסטטוס ל-"detonated"
//             setTimeout(() => {
//                 beepers[index].status = 'detonated';
//                 beepers[index].detonated_at = new Date();
//                 saveBeepers(beepers); // שמירת השינויים לאחר הפיצוץ
//             }, 10000);
//         } else if (status === 'detonated') {
//             beepers[index].detonated_at = new Date();
//         }

//         saveBeepers(beepers); 
//     }
// };

// מחיקת 
export const deleteBeeper = (id: string): void => {
    let beepers = getAllBeepers();
    beepers = beepers.filter(beeper => beeper.id !== id);
    saveBeepers(beepers);
};
