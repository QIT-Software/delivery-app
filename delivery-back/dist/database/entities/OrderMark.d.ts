export default class OrderMark {
    constructor(id: string, date: Date, lat: number, lng: number);
    id: string;
    date: Date;
    lat?: number;
    lng?: number;
}
