import { ID } from 'entities/Common';
import User from 'graphql/entities/user/User';
export default class Client {
    constructor(id: string, user: User);
    id: ID;
    user: User;
}
