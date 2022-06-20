import User from './User';
export default class LocalLogin {
    id: string;
    constructor(id: string, user: User, email: string, passwordHash: string);
    user: User;
    email: string;
    passwordHash: string;
}
