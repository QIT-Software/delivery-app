import User from './User';
export default class Admin {
    constructor(id: string, user: User, userId: string, isEnabled: boolean);
    id: string;
    user?: User;
    userId: string;
    isEnabled: boolean;
}
