import ILocationManager from 'managers/location/ILocationManager';
import Session from 'entities/Session';
import CreateAddressRequest from 'graphql/entities/address/CreateAddressRequest';
import IAddressManager from '../../managers/address/IAddressManager';
import LatLngInput from 'graphql/entities/address/LatLngInput';
export declare class LocationResolver {
    private readonly locationManager;
    private readonly addressManager;
    constructor(locationManager: ILocationManager, addressManager: IAddressManager);
    createAddress({ userId }: Session, location: CreateAddressRequest): Promise<boolean>;
    clientOrdersAddresses({ userId }: Session): Promise<import("../../entities/Address").default[]>;
    updateLocation({ userId }: Session, latLng: LatLngInput): Promise<boolean>;
    userLocation(id: string): Promise<import("../../entities/LatLng").default | undefined>;
}
