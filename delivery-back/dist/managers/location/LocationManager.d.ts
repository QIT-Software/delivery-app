import ILocationManager from 'managers/location/ILocationManager';
import CreateAddressRequest from 'entities/CreateAddressRequest';
import IAddressStore from 'database/stores/address/IAddressStore';
import IUserStore from '../../database/stores/user/IUserStore';
import LatLng from 'entities/LatLng';
export default class LocationManager implements ILocationManager {
    private addressStore;
    private userStore;
    constructor(addressStore: IAddressStore, userStore: IUserStore);
    createAddress(userId: string, address: CreateAddressRequest): Promise<void>;
    createAddressForRestaurant(userId: string, address: CreateAddressRequest): Promise<import("../../database/entities/Address").default>;
    updateLocation(userId: string, latLng: LatLng): Promise<void>;
    getUserLocation(id: string): Promise<LatLng | undefined>;
}
