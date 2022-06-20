import Order from './Order';
import { CartState } from 'entities/Cart';
import User from './User';
export default class Cart {
    constructor(id: string, userId: string, status: CartState, orders: Order[]);
    id: string;
    userId: string;
    user?: User;
    status: CartState;
    orders: Order[];
}
