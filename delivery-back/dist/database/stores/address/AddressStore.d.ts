import IAddressStore from 'database/stores/address/IAddressStore';
import Address from 'database/entities/Address';
import { Repository } from 'typeorm';
import OrderInfo from '../../entities/OrderInfo';
export default class AddressStore extends IAddressStore {
    private readonly repository;
    private readonly orderInfoRepository;
    constructor(repository: Repository<Address>, orderInfoRepository: Repository<OrderInfo>);
    createAddress(address: {
        placeId: string | undefined;
        lat: number;
        lng: number;
        description: string;
        entrance: string | undefined;
        floor: string | undefined;
        apartment: string | undefined;
        date: Date;
    }): Promise<Address>;
    updateAddress(address: {
        id: string;
        placeId: string | undefined;
        lat: number;
        lng: number;
        description: string;
        entrance: string | undefined;
        floor: string | undefined;
        apartment: string | undefined;
        date: Date;
    }): Promise<Address>;
    getUserAddressesFromOrder(clientAddressId: string): Promise<OrderInfo[]>;
}
