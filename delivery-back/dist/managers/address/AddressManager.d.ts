import IAddressManager from 'managers/address/IAddressManager';
import AppType from 'entities/AppType';
import IRestaurantStore from 'database/stores/restaurant/IRestaurantStore';
import IRoadsService from 'services/googleRoads/IRoadsService';
import IGeoService from 'services/geolocation/IGeoService';
import IOrderStore from '../../database/stores/order/IOrderStore';
import IUserStore from 'database/stores/user/IUserStore';
import Address from 'entities/Address';
export default class AddressManager implements IAddressManager {
    private readonly restaurantStore;
    private readonly orderStore;
    private readonly roadsService;
    private readonly geoService;
    private readonly userStore;
    constructor(restaurantStore: IRestaurantStore, orderStore: IOrderStore, roadsService: IRoadsService, geoService: IGeoService, userStore: IUserStore);
    getDistanceToRestaurant(restaurantId: string, lat: number, lng: number, appType: AppType): Promise<number>;
    getClientOrdersAddresses(userId: string): Promise<Address[]>;
}
