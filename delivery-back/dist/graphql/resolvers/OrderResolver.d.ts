import IOrderManager from 'managers/order/IOrderManager';
import Order from 'graphql/entities/order/Order';
import Session from 'entities/Session';
import CreateAddressRequest from 'graphql/entities/address/CreateAddressRequest';
import { OrderState } from 'entities/Order';
import { HttpRequestInfo } from 'enhancers/decorators/HttpRequest';
export default class OrderResolver {
    private readonly orderManager;
    constructor(orderManager: IOrderManager);
    createOrder({ userId }: Session, clientAddress: CreateAddressRequest, setId: string, cartId: string, restaurantId: string, numberOfDays: number): Promise<Order>;
    getOrders(): Promise<Order[]>;
    orderById(orderId: string): Promise<Order>;
    orderState(orderId: string): Promise<OrderState>;
    ordersForDelivery({ appType }: HttpRequestInfo): Promise<Order[]>;
    getOrderHistory({ userId }: Session, { appType }: HttpRequestInfo): Promise<Order[]>;
    evaluateOrder({ userId }: Session, { appType }: HttpRequestInfo, orderId: string, rating: number): Promise<boolean>;
    acceptOrder({ userId }: Session, id: string): Promise<boolean>;
    markOrder({ appType }: HttpRequestInfo, orderId: string, bagId: string): Promise<boolean>;
    deleteOrder({ userId }: Session, orderId: string, { appType }: HttpRequestInfo): Promise<boolean>;
    currentOrder({ userId }: Session, { appType }: HttpRequestInfo): Promise<Order | undefined>;
    removeTheCurrentCourier(orderId: string): Promise<boolean>;
    ordersByUserId({ userId }: Session): Promise<Order[]>;
    ordersByCartId(id: string): Promise<Order[]>;
    ordersByCourierId({ userId }: Session): Promise<Order[]>;
    ordersByRestaurantId({ userId }: Session): Promise<Order[]>;
}
