export default class Preferences {
    constructor(id: string, allowPushNotifications: boolean, allowEmailNotifications: boolean, allowSmsNotifications: boolean);
    id: string;
    allowPushNotifications: boolean;
    allowEmailNotifications: boolean;
    allowSmsNotifications: boolean;
}
