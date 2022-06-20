import IBagStore from './IBagStore';
import Bag from 'database/entities/Bag';
import { Repository } from 'typeorm';
import Order from 'database/entities/Order';
export default class BagStore extends IBagStore {
    private readonly repository;
    private readonly order;
    constructor(repository: Repository<Bag>, order: Repository<Order>);
    findBagByCode(code: string): Promise<Bag | undefined>;
    getBagByOrderIdOrFail(id: string): Promise<Bag>;
}
