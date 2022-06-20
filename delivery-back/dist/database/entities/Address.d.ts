export default class Address {
    id: string;
    placeId: string;
    description: string;
    entrance?: string;
    floor?: string;
    apartment?: string;
    lat: number;
    lng: number;
    date: Date;
    constructor(id: string, placeId: string, description: string, entrance: string, floor: string, apartment: string, date: Date, lat: number, lng: number);
}
