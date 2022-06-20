import IRestaurantStore from './IRestaurantStore';
import Restaurant from 'database/entities/Restaurant';
import { Repository } from 'typeorm';
import { ID } from '../../../entities/Common';
import Cuisine from 'database/entities/Cuisine';
import Address from 'database/entities/Address';
import User from 'database/entities/User';
import LocalLogin from 'database/entities/LocalLogin';
import ILoginStore from '../login/ILoginStore';
export default class RestaurantStore extends IRestaurantStore {
    private readonly repository;
    private readonly userRepository;
    private readonly localLoginRepository;
    private localLoginStore;
    constructor(repository: Repository<Restaurant>, userRepository: Repository<User>, localLoginRepository: Repository<LocalLogin>, localLoginStore: ILoginStore);
    private readonly allRelations;
    getRestaurantById(id: string): Promise<Restaurant>;
    getRestaurantByUserId(userId: ID): Promise<Restaurant>;
    getRestaurants(): Promise<Restaurant[]>;
    createRestaurant(userId: string, imageId: string, title: string, description: string, address: Address, cuisines: Cuisine[]): Promise<void>;
    updateRestaurant(id: string, imageId: string, title: string, description: string, address: Address, cuisines: Cuisine[]): Promise<Restaurant>;
    deleteRestaurant(id: string): Promise<void>;
}
