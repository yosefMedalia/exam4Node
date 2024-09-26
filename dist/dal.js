import fs from 'fs';
import path from 'path';
const beeperFilePath = path.join(__dirname, '../data/beepers.json');
// קריאה לכל הביפרים
export const getAllBeepers = () => {
    const data = fs.readFileSync(beeperFilePath, 'utf-8');
    return JSON.parse(data);
};
// שמירה
export const saveBeepers = (beepers) => {
    fs.writeFileSync(beeperFilePath, JSON.stringify(beepers, null, 2));
};
// קריאה לפי id
export const findBeeperById = (id) => {
    const beepers = getAllBeepers();
    return beepers.find(beeper => beeper.id === id);
};
// מחיקה
export const deleteBeeper = (id) => {
    let beepers = getAllBeepers();
    beepers = beepers.filter(beeper => beeper.id !== id);
    saveBeepers(beepers);
};
//בדיקה שמה שהוזן זה בלבנון
