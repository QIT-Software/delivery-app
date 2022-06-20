import ICartManager from 'managers/cart/ICartManager';
import Cart from 'graphql/entities/cart/Cart';
import Session from 'entities/Session';
import CreateAddressRequest from 'graphql/entities/address/CreateAddressRequest';
import SelectedSetInfo from 'graphql/entities/selectedSetInfo/SelectedSetInfo';
export default class CartResolver {
    private readonly cartManager;
    constructor(cartManager: ICartManager);
    createCartAndDistributeOrders({ userId }: Session, clientAddress: CreateAddressRequest, selectedSetsInfo: SelectedSetInfo[]): Promise<Cart>;
    cartsByUserId({ userId }: Session): Promise<Cart[]>;
}
