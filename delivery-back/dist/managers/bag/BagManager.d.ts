import IBagManager from 'managers/bag/IBagManager';
import IBagStore from 'database/stores/bag/IBagStore';
import Bag from 'entities/Bag';
export default class BagManager extends IBagManager {
    private bagStore;
    constructor(bagStore: IBagStore);
    findBagByCodeOrThrow(code: string): Promise<Bag>;
    getBagByOrderId(id: string): Promise<Bag>;
}
