import { lebanonCoordinates } from '../src/data/list.js';

export const isCoordinateInLebanon = (latitude: number, longitude: number): boolean => {
    return lebanonCoordinates.some(
        coord => coord.latitude === latitude && coord.longitude === longitude
    );
};
