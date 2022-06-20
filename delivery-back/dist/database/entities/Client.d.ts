import User from 'database/entities/User';
export default class Client {
    constructor(id: string, user: User, userId: string);
    id: string;
    user?: User;
    userId: string;
}
