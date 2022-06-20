export default class CreateAddressRequest {
    constructor(placeId: string, lat: number, lng: number, description: string, entrance: string, floor: string, apartment: string);
    placeId: string;
    lat: number;
    lng: number;
    description: string;
    entrance: string;
    floor: string;
    apartment: string;
}
