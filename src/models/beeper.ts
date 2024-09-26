export default interface Beeper {
    id: string;
    name: string;
    status: string;
    createdAt: Date;
    detonatedAt: Date | null;
    latitude: number | null;
    longitude: number | null;
}
