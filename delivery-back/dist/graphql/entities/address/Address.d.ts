export default class Address {
    constructor(id: string, placeId: string, lat: number, lng: number, description: string, entrance: string, floor: string, apartment: string, date: Date);
    id: string;
    placeId?: string;
    lat: number;
    lng: number;
    description: string;
    entrance?: string;
    floor?: string;
    apartment?: string;
    date?: Date;
}
