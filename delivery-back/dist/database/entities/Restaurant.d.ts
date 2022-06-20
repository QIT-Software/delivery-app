import File from 'database/entities/File';
import Cuisine from 'database/entities/Cuisine';
import User from 'database/entities/User';
import Address from 'database/entities/Address';
export default class Restaurant {
    constructor(id: string, user: User, userId: string, image: File, imageId: string, address: Address, title: string, description: string, cuisines: Cuisine[]);
    id: string;
    user?: User;
    userId: string;
    image?: File;
    imageId: string;
    address: Address;
    title: string;
    description: string;
    cuisines?: Cuisine[];
}
