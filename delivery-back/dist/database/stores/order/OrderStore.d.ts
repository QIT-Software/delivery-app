import IOrderStore from 'database/stores/order/IOrderStore';
import { Repository } from 'typeorm';
import Order from 'database/entities/Order';
import Bag from 'database/entities/Bag';
import Restaurant from 'database/entities/Restaurant';
import OrderMark from 'database/entities/OrderMark';
import { OrderPlacement, OrderState } from 'entities/Order';
import { ID } from 'entities/Common';
import OrderInfo from 'database/entities/OrderInfo';
import LatLng from 'entities/LatLng';
export default class OrderStore extends IOrderStore {
    private readonly repository;
    private readonly orderInfoRepository;
    private readonly bagRepository;
    private readonly orderMarkRepository;
    private readonly restaurantRepository;
    constructor(repository: Repository<Order>, orderInfoRepository: Repository<OrderInfo>, bagRepository: Repository<Bag>, orderMarkRepository: Repository<OrderMark>, restaurantRepository: Repository<Restaurant>);
    private readonly allRelations;
    getRestaurantsByCuisines(cuisines: string[]): Promise<Restaurant[]>;
    getOrderByIdOrFail(id: string): Promise<Order>;
    getOrderInfoLocationsById(clientAddressId: string): Promise<OrderInfo>;
    createOrderInfo(clientAddress: {
        id: ID;
    }, priceCents: number | undefined, distanceMiles: number): Promise<OrderInfo>;
    createOrder(client: {
        id: ID;
    }, orderInfo: {
        id: ID;
    }, cart: {
        id: ID;
    }, set: {
        id: ID;
    }, restaurant: {
        id: ID;
    }, state: OrderState.ReadyForDelivery, placement: OrderPlacement.Restaurant, date: Date): Promise<Order>;
    setOrderRestaurant(id: string, restaurant: {
        id: ID;
    }, orderInfoId: string, priceCents: number): Promise<void>;
    getOrders(): Promise<Order[]>;
    getOrdersByRestaurantId(id: string): Promise<Order[]>;
    getOrdersByCartId(id: string): Promise<Order[]>;
    getOrdersByUserId(id: string): Promise<Order[]>;
    getOrdersByCourierId(id: string): Promise<Order[]>;
    getOrdersForDelivery(): Promise<Order[]>;
    getClientOrderHistory(clientId: ID): Promise<Order[]>;
    getCourierOrderHistory(courierId: ID): Promise<Order[]>;
    updateRating(id: string, rating: number): Promise<void>;
    assignCourier(id: ID, courier: {
        id: ID;
    }, state: OrderState.AcceptedByCourier): Promise<void>;
    markOrder(id: ID, type: 'client' | 'courier' | 'restaurant', state: OrderState): Promise<void>;
    createMark(latLng: LatLng | undefined): Promise<OrderMark>;
    deleteOrder(id: string): Promise<void>;
    currentClientOrderById(id: string): Promise<Order | undefined>;
    currentCourierOrderById(id: string): Promise<Order | undefined>;
    removeCourier(orderId: string): Promise<void>;
}
