"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const IOrderManager_1 = __importDefault(require("./IOrderManager"));
const IOrderStore_1 = __importDefault(require("../../database/stores/order/IOrderStore"));
const Order_1 = __importStar(require("../../entities/Order"));
const Mappers_1 = require("../../database/entities/Mappers");
const SpoonError_1 = __importDefault(require("../../SpoonError"));
const IUserStore_1 = __importDefault(require("../../database/stores/user/IUserStore"));
const Common_1 = require("../../entities/Common");
const IAddressStore_1 = __importDefault(require("../../database/stores/address/IAddressStore"));
const AppType_1 = __importDefault(require("../../entities/AppType"));
const IPaymentStore_1 = __importDefault(require("../../database/stores/payment/IPaymentStore"));
const IBagStore_1 = __importDefault(require("../../database/stores/bag/IBagStore"));
const R = __importStar(require("ramda"));
const ICartStore_1 = __importDefault(require("../../database/stores/cart/ICartStore"));
const ISetStore_1 = __importDefault(require("../../database/stores/set/ISetStore"));
const IRestaurantStore_1 = __importDefault(require("../../database/stores/restaurant/IRestaurantStore"));
const INotificationService_1 = __importDefault(require("../../services/notification/INotificationService"));
const IAddressManager_1 = __importDefault(require("../address/IAddressManager"));
let OrderManager = (() => {
    let OrderManager = class OrderManager extends IOrderManager_1.default {
        constructor(orderStore, cartStore, restaurantStore, userStore, locationStore, setStore, paymentStore, notificationService, bagsStore, addressManager) {
            super();
            this.orderStore = orderStore;
            this.cartStore = cartStore;
            this.restaurantStore = restaurantStore;
            this.userStore = userStore;
            this.locationStore = locationStore;
            this.setStore = setStore;
            this.paymentStore = paymentStore;
            this.notificationService = notificationService;
            this.bagsStore = bagsStore;
            this.addressManager = addressManager;
        }
        getDeliveryPriceInCents(distanceMiles) {
            const deliveryPrice = 399;
            const basicPricePerAdditionalMile = 50;
            const basicDeliveryRadius = 2;
            let price;
            if (distanceMiles <= basicDeliveryRadius) {
                price = deliveryPrice;
            }
            else {
                const additionalPrice = (distanceMiles - basicDeliveryRadius) * basicPricePerAdditionalMile;
                price = deliveryPrice + additionalPrice;
            }
            return +price.toFixed(0);
        }
        async createOrder(cartId, userId, setId, clientAddress, restaurantId, numberOfDays) {
            if (!setId) {
                throw new SpoonError_1.default('Cannot add order without set');
            }
            const client = await this.userStore.getClientOrThrow(userId);
            const date = new Date();
            const newLocation = await this.locationStore.createAddress({
                placeId: clientAddress.placeId,
                lat: clientAddress.lat,
                lng: clientAddress.lng,
                description: clientAddress.description,
                entrance: clientAddress.entrance,
                floor: clientAddress.floor,
                apartment: clientAddress.apartment,
                date,
            });
            const set = await this.setStore.findSetById(setId);
            if (!set)
                throw new Error('Set not exist');
            const price = set === null || set === void 0 ? void 0 : set.priceCents;
            const distanceMiles = await this.addressManager.getDistanceToRestaurant(restaurantId, newLocation.lat, newLocation.lng, AppType_1.default.Client);
            if (distanceMiles === 0)
                throw new SpoonError_1.default('you entered two identical addresses');
            const orderInfo = await this.orderStore.createOrderInfo(newLocation, price, +distanceMiles.toFixed(1));
            const cart = await this.cartStore.getCartByIdOrFail(cartId);
            const restaurant = await this.restaurantStore.getRestaurantById(restaurantId);
            date.setDate(date.getDate() + numberOfDays);
            return Mappers_1.mapOrderFromDb(await this.orderStore.createOrder(client, orderInfo, cart, set, restaurant, Order_1.OrderState.ReadyForDelivery, Order_1.OrderPlacement.Restaurant, date));
        }
        async setOrderRestaurant(id, restaurantId, orderInfoId, priceCents) {
            await this.orderStore.setOrderRestaurant(id, { id: restaurantId }, orderInfoId, priceCents);
        }
        async getOrders() {
            const orders = await this.orderStore.getOrders();
            if (orders.length < 0)
                throw new SpoonError_1.default('no orders at the moment');
            return Mappers_1.mapOrderListFromDb(orders);
        }
        async getOrderById(id) {
            const order = await this.orderStore.getOrderByIdOrFail(id);
            return Mappers_1.mapOrderFromDb(order);
        }
        async acceptOrder(userId, orderId) {
            const courier = await this.userStore.getCourierByUserIdOrThrow(userId);
            const dbOrder = await this.orderStore.getOrderByIdOrFail(orderId);
            if (!dbOrder)
                throw new SpoonError_1.default('Order is not found');
            const order = Mappers_1.mapOrderFromDb(dbOrder);
            if (order.state !== Order_1.OrderState.ReadyForDelivery)
                throw new SpoonError_1.default('this order does not ready for delivery or already shipped to order');
            await this.orderStore.assignCourier(orderId, courier, Order_1.OrderState.AcceptedByCourier);
            await this.notificationService.sendOrderAccepted(order, 'courier', courier);
        }
        async getOrdersByRestaurantId(userId) {
            const restaurant = await this.restaurantStore.getRestaurantByUserId(userId);
            const orders = await this.orderStore.getOrdersByRestaurantId(restaurant.id);
            return Mappers_1.mapOrderListFromDb(orders);
        }
        async getOrdersByCartId(id) {
            const cart = await this.cartStore.getCartByIdOrFail(id);
            const orders = await this.orderStore.getOrdersByCartId(cart.id);
            return Mappers_1.mapOrderListFromDb(orders);
        }
        async getOrdersByCourierId(userId) {
            const cart = await this.userStore.getCourierByUserIdOrThrow(userId);
            const orders = await this.orderStore.getOrdersByCourierId(cart.id);
            return Mappers_1.mapOrderListFromDb(orders);
        }
        async getOrdersByUserId(userId) {
            const client = await this.userStore.getClientOrThrow(userId);
            const orders = await this.orderStore.getOrdersByUserId(client.id);
            return Mappers_1.mapOrderListFromDb(orders);
        }
        async getOrdersForDelivery(appType) {
            if (appType !== AppType_1.default.Courier)
                throw new SpoonError_1.default('You do not have sufficient rights to take a delivery order');
            return Mappers_1.mapOrderListFromDb(await this.orderStore.getOrdersForDelivery());
        }
        async getOrderHistory(userId, appType) {
            switch (appType) {
                case AppType_1.default.Client: {
                    const client = await this.userStore.getClientOrThrow(userId);
                    return Mappers_1.mapOrderListFromDb(await this.orderStore.getClientOrderHistory(client.id));
                }
                case AppType_1.default.Courier: {
                    const courier = await this.userStore.getCourierByUserIdOrThrow(userId);
                    return Mappers_1.mapOrderListFromDb(await this.orderStore.getCourierOrderHistory(courier.id));
                }
                default:
                    throw new SpoonError_1.default(`appType not supported: ${appType}`);
            }
        }
        async evaluateOrder(role, userId, orderId, rating) {
            const dbOrder = await this.orderStore.getOrderByIdOrFail(orderId);
            if (!dbOrder)
                throw new SpoonError_1.default('Order not found');
            const order = Mappers_1.mapOrderFromDb(dbOrder);
            if (order.state !== Order_1.OrderState.Completed)
                throw new SpoonError_1.default('Order is not finished yet');
            if (order.client && order.client.id !== userId)
                throw new SpoonError_1.default('You do not own this order');
            if (role !== AppType_1.default.Client)
                throw new SpoonError_1.default('You must be a client to evaluate an order');
            if (order.rating)
                throw new SpoonError_1.default('You have already rated the order');
            await this.orderStore.updateRating(orderId, rating);
        }
        async markOrder(appType, orderId, bagId) {
            const dbOrder = await this.orderStore.getOrderByIdOrFail(orderId);
            if (!dbOrder)
                throw new SpoonError_1.default('Order not found');
            const order = Mappers_1.mapOrderFromDb(dbOrder);
            await this.checkOrderBag(orderId, bagId);
            let type;
            let newState;
            if (appType === AppType_1.default.Restaurant) {
                if (order.state !== Order_1.OrderState.AcceptedByCourier)
                    throw new SpoonError_1.default('Cannot mark this order (bad state)');
                newState = Order_1.OrderState.Delivering;
                type = 'restaurant';
            }
            if (!newState)
                throw new SpoonError_1.default('New state is not defined');
            if (!type)
                throw new SpoonError_1.default('Type is not defined');
            await this.orderStore.markOrder(orderId, type, newState);
            await this.notificationService.sendMarkOrder(order, type);
        }
        async checkOrderBag(orderId, bagId) {
            const bag = await this.bagsStore.getBagByOrderIdOrFail(orderId);
            const verifyId = bag.id;
            if (!R.equals(bagId, verifyId)) {
                throw new SpoonError_1.default('Bags id are not equal');
            }
        }
        async deleteOrder(userId, orderId, appType) {
            const order = await this.getOrderById(orderId);
            if (!order)
                throw new SpoonError_1.default('Order not exists');
            if (!order.client)
                throw new SpoonError_1.default('No customer data');
            if (appType === AppType_1.default.Client) {
                if (order.state !== Order_1.OrderState.WaitingForPayment ||
                    order.placement !== Order_1.OrderPlacement.Client ||
                    order.client.id !== userId) {
                    throw new SpoonError_1.default('You could not delete this order');
                }
            }
            await this.orderStore.deleteOrder(orderId);
        }
        async getCurrentOrder(userId, appType) {
            if (appType === AppType_1.default.Client) {
                const client = await this.userStore.getClientOrThrow(userId);
                const order = await this.orderStore.currentClientOrderById(client.id);
                return !order ? undefined : Mappers_1.mapOrderFromDb(order);
            }
            if (appType === AppType_1.default.Courier) {
                const courier = await this.userStore.getCourierByUserIdOrThrow(userId);
                const order = await this.orderStore.currentCourierOrderById(courier.id);
                if (order && order.placement === 'Restaurant') {
                    return undefined;
                }
                return !order ? undefined : Mappers_1.mapOrderFromDb(order);
            }
        }
        async removeTheCurrentCourier(orderId) {
            const order = await this.orderStore.getOrderByIdOrFail(orderId);
            if (order.state === Order_1.OrderState.AcceptedByRestaurant ||
                order.state === Order_1.OrderState.WaitingForPayment ||
                order.state === Order_1.OrderState.ReadyForDelivery ||
                order.state === Order_1.OrderState.Delivered)
                throw new SpoonError_1.default('currently there is no active courier');
            await this.orderStore.removeCourier(orderId);
        }
    };
    OrderManager = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [IOrderStore_1.default,
            ICartStore_1.default,
            IRestaurantStore_1.default,
            IUserStore_1.default,
            IAddressStore_1.default,
            ISetStore_1.default,
            IPaymentStore_1.default,
            INotificationService_1.default,
            IBagStore_1.default,
            IAddressManager_1.default])
    ], OrderManager);
    return OrderManager;
})();
exports.default = OrderManager;
//# sourceMappingURL=OrderManager.js.map