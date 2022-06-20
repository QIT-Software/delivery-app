import IRestaurantManager from 'managers/restaurant/IRestaurantManager';
import IRestaurantStore from 'database/stores/restaurant/IRestaurantStore';
import Restaurant from 'entities/Restaurant';
import IAuthManager from '../auth/IAuthManager';
import IAddressStore from 'database/stores/address/IAddressStore';
import ICuisineStore from 'database/stores/cuisine/ICuisineStore';
import IAccountManager from '../account/IAccountManager';
import { ID } from '../../entities/Common';
export default class RestaurantManager extends IRestaurantManager {
    private restaurantStore;
    private authManager;
    private accountManager;
    private locationStore;
    private cuisineStore;
    constructor(restaurantStore: IRestaurantStore, authManager: IAuthManager, accountManager: IAccountManager, locationStore: IAddressStore, cuisineStore: ICuisineStore);
    getRestaurantById(id: string): Promise<Restaurant>;
    getRestaurants(): Promise<Restaurant[]>;
    getCurrentRestaurant(userId: string): Promise<Restaurant | undefined>;
    createRestaurant(name: string, email: string, phoneNumber: string, password: string, placeId: string | undefined, lat: number, lng: number, addressDescription: string, imageId: string, title: string, restaurantDescription: string, cuisines: string[]): Promise<void>;
    updateRestaurant(id: string, name: string, email: string, phoneNumber: string, placeId: string | undefined, lat: number, lng: number, addressDescription: string, imageId: string, title: string, restaurantDescription: string, cuisines: string[]): Promise<Restaurant>;
    deleteRestaurant(restaurantId: ID): Promise<void>;
}
