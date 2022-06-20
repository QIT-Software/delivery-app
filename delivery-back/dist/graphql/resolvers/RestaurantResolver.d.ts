import IRestaurantManager from 'managers/restaurant/IRestaurantManager';
import Restaurant from 'graphql/entities/restaurant/Restaurant';
import Session from 'entities/Session';
export default class RestaurantResolver {
    private readonly restaurantManager;
    constructor(restaurantManager: IRestaurantManager);
    createRestaurant(name: string, email: string, phoneNumber: string, password: string, lat: number, lng: number, addressDescription: string, imageId: string, title: string, restaurantDescription: string, cuisines: string[], placeId?: string): Promise<boolean>;
    updateRestaurant(id: string, name: string, email: string, phoneNumber: string, lat: number, lng: number, addressDescription: string, imageId: string, title: string, restaurantDescription: string, cuisines: string[], placeId?: string): Promise<Restaurant>;
    deleteRestaurant(restaurantId: string): Promise<boolean>;
    getRestaurants(): Promise<Restaurant[]>;
    getRestaurantById(restaurantId: string): Promise<Restaurant>;
    currentRestaurant({ userId }: Session): Promise<Restaurant | undefined>;
}
