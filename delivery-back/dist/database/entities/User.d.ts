import Preferences from './Preferences';
import File from 'database/entities/File';
export default class User {
    constructor(id: string, image: File, imageId: string, name: string, email: string, phoneNumber: string, preferences: Preferences, preferencesId: string, lat: number, lng: number);
    id: string;
    image?: File;
    imageId: string;
    name: string;
    email: string;
    phoneNumber: string;
    preferences: Preferences;
    preferencesId: string;
    lat: number;
    lng: number;
}
