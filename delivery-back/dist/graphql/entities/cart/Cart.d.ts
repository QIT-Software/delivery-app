import { CartState } from 'entities/Cart';
export default class Cart {
    constructor(id: string, userId: string, status: CartState);
    id: string;
    userId: string;
    status: CartState;
}
