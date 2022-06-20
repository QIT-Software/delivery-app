export default class CreateAddressRequest {
    placeId: string | undefined;
    description: string;
    entrance?: string;
    floor?: string;
    apartment?: string;
    date?: Date;
    lat: number;
    lng: number;
    constructor(placeId: string | undefined, description: string, entrance: string, floor: string, apartment: string, date: Date, lat: number, lng: number);
}
