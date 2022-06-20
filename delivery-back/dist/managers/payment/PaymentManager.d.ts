import IPaymentManager from 'managers/payment/IPaymentManager';
import IUserStore from 'database/stores/user/IUserStore';
import IRestaurantStore from 'database/stores/restaurant/IRestaurantStore';
export default class PaymentManager extends IPaymentManager {
    private readonly userStore;
    private readonly restaurantStore;
    constructor(userStore: IUserStore, restaurantStore: IRestaurantStore);
}
