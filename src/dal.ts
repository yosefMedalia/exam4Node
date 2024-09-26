import fs from 'fs';
import path from 'path';
import Beeper  from "./models/beeper.js";
//טעינת קובץ הגייסון
const beeperFilePath =  './data/beepers.json';

// קריאה לכל הביפרים
export const getAllBeepers = (): Beeper[] => {
    const data = fs.readFileSync(beeperFilePath, 'utf-8');
    console.log(data);
    
    return JSON.parse(data);
};

// שמירה
export const saveBeepers = (beepers: Beeper[]): void => {
    fs.writeFileSync(beeperFilePath, JSON.stringify(beepers, null, 2));
};

// קריאה לפי id
export const findBeeperById = (id: string): Beeper | undefined => {
    const beepers = getAllBeepers();
    return beepers.find(beeper => beeper.id === id);
};

// מחיקה
export const deleteBeeper = (id: string) => {
    let beepers = getAllBeepers();
    beepers = beepers.filter(beeper => beeper.id !== id);
    saveBeepers(beepers);
};


//בדיקה שמה שהוזן זה בלבנון

