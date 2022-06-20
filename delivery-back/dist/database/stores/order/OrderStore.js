"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const IOrderStore_1 = __importDefault(require("./IOrderStore"));
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Order_1 = __importDefault(require("../../entities/Order"));
const Bag_1 = __importDefault(require("../../entities/Bag"));
const Restaurant_1 = __importDefault(require("../../entities/Restaurant"));
const OrderMark_1 = __importDefault(require("../../entities/OrderMark"));
const Order_2 = require("../../../entities/Order");
const Common_1 = require("../../../entities/Common");
const OrderInfo_1 = __importDefault(require("../../entities/OrderInfo"));
const LatLng_1 = __importDefault(require("../../../entities/LatLng"));
let OrderStore = (() => {
    let OrderStore = class OrderStore extends IOrderStore_1.default {
        constructor(repository, orderInfoRepository, bagRepository, orderMarkRepository, restaurantRepository) {
            super();
            this.repository = repository;
            this.orderInfoRepository = orderInfoRepository;
            this.bagRepository = bagRepository;
            this.orderMarkRepository = orderMarkRepository;
            this.restaurantRepository = restaurantRepository;
            this.allRelations = [
                'orderInfo',
                'orderInfo.clientAddress',
                'client',
                'client.user',
                'restaurant',
                'restaurant.address',
                'restaurant.user',
                'restaurant.cuisines',
                'bag',
                'set',
                'set.statuses',
                'set.dishes',
                'set.dishes.ingredients',
                'courier',
                'courier.user',
                'cart',
            ];
        }
        async getRestaurantsByCuisines(cuisines) {
            return this.restaurantRepository.find({
                join: {
                    alias: 'r',
                    leftJoinAndSelect: {
                        cuisines: 'r.cuisines',
                    },
                },
            });
        }
        async getOrderByIdOrFail(id) {
            return this.repository.findOneOrFail(id, {
                relations: this.allRelations,
            });
        }
        async getOrderInfoLocationsById(clientAddressId) {
            return this.orderInfoRepository.findOneOrFail(clientAddressId);
        }
        async createOrderInfo(clientAddress, priceCents, distanceMiles) {
            const newOrderInfo = this.orderInfoRepository.create({
                clientAddress,
                priceCents,
                distanceMiles,
            });
            await this.orderInfoRepository.insert(newOrderInfo);
            await this.orderInfoRepository.save(newOrderInfo);
            return this.orderInfoRepository.findOneOrFail({
                id: newOrderInfo.id,
            });
        }
        async createOrder(client, orderInfo, cart, set, restaurant, state, placement, date) {
            const newOrder = this.repository.create({
                client,
                orderInfo,
                cart,
                set,
                restaurant,
                state,
                placement,
                date,
            });
            await this.repository.insert(newOrder);
            await this.repository.save(newOrder);
            return this.getOrderByIdOrFail(newOrder.id);
        }
        async setOrderRestaurant(id, restaurant, orderInfoId, priceCents) {
            await this.repository.update(id, {
                restaurant,
            });
            await this.orderInfoRepository.update({ id: orderInfoId }, {
                priceCents,
            });
        }
        async getOrders() {
            return this.repository.find({
                relations: this.allRelations,
            });
        }
        async getOrdersByRestaurantId(id) {
            return this.repository.find({
                where: { restaurantId: id },
                relations: this.allRelations,
            });
        }
        async getOrdersByCartId(id) {
            return this.repository.find({
                where: { cartId: id },
                relations: this.allRelations,
            });
        }
        async getOrdersByUserId(id) {
            return this.repository.find({
                where: { clientId: id },
                relations: this.allRelations,
            });
        }
        async getOrdersByCourierId(id) {
            return this.repository.find({
                where: { courierId: id },
                relations: this.allRelations,
            });
        }
        async getOrdersForDelivery() {
            return this.repository.find({
                where: {
                    placement: Order_2.OrderPlacement.Restaurant,
                    state: Order_2.OrderState.ReadyForDelivery,
                    courierId: typeorm_2.IsNull(),
                },
                relations: this.allRelations,
            });
        }
        async getClientOrderHistory(clientId) {
            return this.repository.find({
                where: {
                    clientId,
                },
                relations: this.allRelations,
            });
        }
        async getCourierOrderHistory(courierId) {
            return this.repository.find({
                where: {
                    courierId,
                },
                relations: this.allRelations,
            });
        }
        async updateRating(id, rating) {
            await this.repository.update(id, { rating });
        }
        async assignCourier(id, courier, state) {
            await this.repository.update(id, {
                courier,
                state,
            });
        }
        async markOrder(id, type, state) {
            const updateData = {
                state,
            };
            await this.repository.update(id, updateData);
        }
        async createMark(latLng) {
            const newMark = this.orderMarkRepository.create({
                lat: latLng && latLng.lat,
                lng: latLng && latLng.lng,
            });
            await this.orderMarkRepository.insert(newMark);
            return newMark;
        }
        async deleteOrder(id) {
            await this.repository.delete({ id });
        }
        async currentClientOrderById(id) {
            return this.repository.findOne({
                where: [
                    {
                        clientId: id,
                        state: Order_2.OrderState.Delivering,
                    },
                    {
                        clientId: id,
                        state: Order_2.OrderState.AcceptedByCourier,
                    },
                    {
                        clientId: id,
                        state: Order_2.OrderState.Delivered,
                    },
                    {
                        clientId: id,
                        state: Order_2.OrderState.AcceptedByRestaurant,
                    },
                    {
                        clientId: id,
                        state: Order_2.OrderState.ReadyForDelivery,
                    },
                    {
                        clientId: id,
                        state: Order_2.OrderState.WaitingForPayment,
                    },
                ],
                relations: this.allRelations,
            });
        }
        async currentCourierOrderById(id) {
            return this.repository.findOne({
                where: [
                    {
                        courierId: id,
                        state: Order_2.OrderState.AcceptedByCourier,
                    },
                    {
                        courierId: id,
                        state: Order_2.OrderState.Delivering,
                    },
                ],
                relations: this.allRelations,
            });
        }
        async removeCourier(orderId) {
            await this.repository.update(orderId, {
                courierId: undefined,
                state: Order_2.OrderState.ReadyForDelivery,
            });
        }
    };
    OrderStore = __decorate([
        __param(0, typeorm_1.InjectRepository(Order_1.default)),
        __param(1, typeorm_1.InjectRepository(OrderInfo_1.default)),
        __param(2, typeorm_1.InjectRepository(Bag_1.default)),
        __param(3, typeorm_1.InjectRepository(OrderMark_1.default)),
        __param(4, typeorm_1.InjectRepository(Restaurant_1.default)),
        __metadata("design:paramtypes", [typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository,
            typeorm_2.Repository])
    ], OrderStore);
    return OrderStore;
})();
exports.default = OrderStore;
//# sourceMappingURL=OrderStore.js.map