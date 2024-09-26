
export interface Beeper {
    id: string; 
    name: string;
    status: 'manufactured' | 'assembled' | 'shipped' | 'deployed' | 'detonated';
    created_at: Date;
    detonated_at?: Date; // יתווסף כאשר הסטטוס ישתנה ל-'detonated'
    latitude?: number; //  יתווסף כשהביפר נפרס
    longitude?: number; //  יתווסף כשהביפר נפרס
}

