import { ID } from './Common';
export default interface Cart {
    id: ID;
    userId: string;
    status: CartState;
}
export declare enum CartState {
    Active = "Active",
    Delivered = "Delivered"
}
