import Bag from 'graphql/entities/bag/Bag';
import Set from 'graphql/entities/set/Set';
import User from 'graphql/entities/user/User';
import Restaurant from 'graphql/entities/restaurant/Restaurant';
import OrderInfo from 'graphql/entities/order/OrderInfo';
import { OrderPlacement, OrderState } from 'entities/Order';
import Courier from '../user/Courier';
import Cart from 'graphql/entities/cart/Cart';
export default class Order {
    constructor(id: string, client: User, restaurant: Restaurant, cart: Cart, bag: Bag, set: Set, number: number, orderInfo: OrderInfo, created: Date, placement: OrderPlacement, state: OrderState, courierId: string | undefined, courier: Courier | undefined, date: Date);
    id: string;
    client: User;
    restaurant?: Restaurant;
    cart: Cart;
    bag?: Bag;
    set: Set;
    number: number;
    orderInfo: OrderInfo;
    created: Date;
    placement: OrderPlacement;
    state: OrderState;
    courierId: string | undefined;
    courier: Courier | undefined;
    rating: number | undefined;
    date: Date;
}
