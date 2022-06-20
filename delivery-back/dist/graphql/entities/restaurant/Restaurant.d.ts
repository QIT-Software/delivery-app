import Address from 'graphql/entities/address/Address';
import Cuisine from 'graphql/entities/cuisine/Cuisine';
import User from 'graphql/entities/user/User';
export default class Restaurant {
    constructor(id: string, user: User, imageId: string, address: Address, title: string, description: string, cuisines: Cuisine[]);
    id: string;
    user: User;
    imageId: string;
    address: Address;
    title: string;
    description: string;
    cuisines?: Cuisine[];
}
