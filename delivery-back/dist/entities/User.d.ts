import { ID } from './Common';
import AdditionalUserInfo from 'entities/AdditionalUserInfo';
export default class User {
    constructor(id: string, image: string, name: string, preferencesId: string, lat: number, lng: number, additionalUserInfo: AdditionalUserInfo | undefined);
    id: ID;
    image: string;
    name: string;
    lat: number;
    lng: number;
    additionalUserInfo: AdditionalUserInfo | undefined;
    preferencesId: string;
}
