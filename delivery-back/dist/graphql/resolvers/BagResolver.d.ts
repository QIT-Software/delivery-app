import IBagManager from 'managers/bag/IBagManager';
import Bag from 'graphql/entities/bag/Bag';
export default class BagResolver {
    private readonly bagManager;
    constructor(bagManager: IBagManager);
    bagByCode(code: string): Promise<Bag>;
    bagByOrderId(id: string): Promise<Bag>;
}
