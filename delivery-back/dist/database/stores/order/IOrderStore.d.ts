import Order from 'database/entities/Order';
import { OrderPlacement, OrderState } from 'entities/Order';
import OrderMark from 'database/entities/OrderMark';
import { ID } from 'entities/Common';
import LatLng from 'entities/LatLng';
import OrderInfo from 'database/entities/OrderInfo';
import Restaurant from 'database/entities/Restaurant';
export default abstract class IOrderStore {
    abstract createOrder(client: {
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
    abstract setOrderRestaurant(id: ID, restaurant: {
        id: ID;
    }, orderInfoId: string, priceCents: number): Promise<void>;
    abstract createOrderInfo(clientAddress: {
        id: ID;
    }, priceCents: number | undefined, distanceMiles: number): Promise<OrderInfo>;
    abstract getOrders(): Promise<Order[]>;
    abstract getOrderByIdOrFail(id: ID): Promise<Order>;
    abstract getOrderInfoLocationsById(clientAddressId: ID): Promise<OrderInfo>;
    abstract getOrdersByRestaurantId(id: ID): Promise<Order[]>;
    abstract getOrdersByCartId(id: ID): Promise<Order[]>;
    abstract getOrdersByUserId(id: ID): Promise<Order[]>;
    abstract getOrdersByCourierId(id: ID): Promise<Order[]>;
    abstract getOrdersForDelivery(): Promise<Order[]>;
    abstract getRestaurantsByCuisines(cuisines: string[]): Promise<Restaurant[]>;
    abstract getClientOrderHistory(clientId: ID): Promise<Order[]>;
    abstract getCourierOrderHistory(courierId: ID): Promise<Order[]>;
    abstract updateRating(id: ID, rating: number): Promise<void>;
    abstract assignCourier(id: ID, courier: {
        id: ID;
    }, state: OrderState.AcceptedByCourier): Promise<void>;
    abstract markOrder(id: ID, type: 'client' | 'courier' | 'restaurant', state: OrderState): Promise<void>;
    abstract createMark(latLng: LatLng | undefined): Promise<OrderMark>;
    abstract deleteOrder(id: string): Promise<void>;
    abstract currentClientOrderById(id: string): Promise<Order | undefined>;
    abstract currentCourierOrderById(id: string): Promise<Order | undefined>;
    abstract removeCourier(orderId: string): Promise<void>;
}
