import ICartStore from 'database/stores/cart/ICartStore';
import { Repository } from 'typeorm';
import Cart from 'database/entities/Cart';
import { CartState } from 'entities/Cart';
export default class CartStore extends ICartStore {
    private readonly repository;
    constructor(repository: Repository<Cart>);
    getCartByIdOrFail(id: string): Promise<Cart>;
    createCart(userId: string, status: CartState.Active): Promise<Cart>;
    getCartByUserId(userId: string): Promise<Cart>;
    getCartsByUserId(userId: string): Promise<Cart[]>;
    deleteCart(id: string): Promise<void>;
}
