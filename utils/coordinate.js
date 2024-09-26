import { lebanonCoordinates } from '../src/data/list.js';
export const isCoordinateInLebanon = (latitude, longitude) => {
    return lebanonCoordinates.some(coord => coord.latitude === latitude && coord.longitude === longitude);
};
