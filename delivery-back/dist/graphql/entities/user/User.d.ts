import AdditionalUserInfo from './AdditionalUserInfo';
export default class User {
    constructor(id: string, image: string, name: string, preferencesId: string, lat: number, lng: number, additionalUserInfo?: AdditionalUserInfo);
    id: string;
    image: string;
    name: string;
    preferencesId: string;
    lat: number;
    lng: number;
    additionalUserInfo: AdditionalUserInfo | undefined;
}
