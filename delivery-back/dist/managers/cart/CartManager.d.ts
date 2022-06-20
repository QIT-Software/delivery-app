import ICartStore from 'database/stores/cart/ICartStore';
import IUserStore from 'database/stores/user/IUserStore';
import { ID } from 'entities/Common';
import IAddressStore from 'database/stores/address/IAddressStore';
import IBagStore from 'database/stores/bag/IBagStore';
import IRestaurantStore from 'database/stores/restaurant/IRestaurantStore';
import IAddressManager from 'managers/address/IAddressManager';
import IOrderManager from 'managers/order/IOrderManager';
import SelectedSetInfo from 'entities/SelectedSetInfo';
import ICartManager from './ICartManager';
import Cart from 'entities/Cart';
import IOrderStore from 'database/stores/order/IOrderStore';
export default class CartManager extends ICartManager {
    private readonly cartStore;
    private readonly userStore;
    private readonly locationStore;
    private readonly bagsStore;
    private readonly orderStore;
    private readonly restaurantStore;
    private readonly addressManager;
    private readonly orderManager;
    constructor(cartStore: ICartStore, userStore: IUserStore, locationStore: IAddressStore, bagsStore: IBagStore, orderStore: IOrderStore, restaurantStore: IRestaurantStore, addressManager: IAddressManager, orderManager: IOrderManager);
    createCartAndDistributeOrders(userId: ID, clientAddress: {
        lng: number;
        lat: number;
        description: string;
    }, selectedSetsInfo: SelectedSetInfo[]): Promise<import("../../graphql/entities/cart/Cart").default>;
    private createOrdersBySetsIds;
    private createCart;
    getCartById(id: string): Promise<Cart>;
    getCartByUserId(userId: string): Promise<Cart>;
    getCartsByUserId(userId: string): Promise<Cart[]>;
    deleteCart(userId: ID, cartId: ID): Promise<void>;
}
